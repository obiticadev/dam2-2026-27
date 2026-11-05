"""Ejecuta los bloques literales de MDX, incluidos los errores intencionados.

Los procesos aislados evitan compartir variables e imports; no son una sandbox
para código no confiable. Solo ejecutar sobre las preguntas revisadas del proyecto.
"""

import json
from pathlib import Path
import re
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
EXPECTED = json.loads((ROOT / "scripts/resultados-esperados.json").read_text(encoding="utf-8"))
CONCEPTUAL = {"py2-s3-17", "py2-s3-18", "py2-s3-20"}

# Compilar el archivo entero antes de ejecutarlo es esencial para las preguntas
# de SyntaxError/IndentationError: ningún print anterior debe llegar a ejecutarse.
RUNNER = r'''
import contextlib, io, json, pathlib, sys
data = json.load(sys.stdin)
sys.path.insert(0, str(pathlib.Path.cwd()))
out = io.StringIO()
error = None
try:
    with contextlib.redirect_stdout(out):
        code = compile(data["source"], "principal.py", "exec")
        exec(code, {"__name__": "__main__", "__file__": "principal.py"})
except Exception as exc:
    error = type(exc).__name__
print(json.dumps({"stdout": out.getvalue(), "error": error}))
'''


def require(condition, message):
    if not condition:
        raise RuntimeError(message)


def run():
    seen = set()
    executed = set()
    for page in sorted((ROOT / "src/content/docs/py-examen-2").glob("*.mdx")):
        text = page.read_text(encoding="utf-8")
        for qid, body in re.findall(r'<Quiz id="([^"]+)" title="[^"]+">(.*?)</Quiz>', text, re.S):
            require(qid not in seen, f"ID repetido: {qid}")
            seen.add(qid)
            blocks = re.findall(r"```python\n(.*?)```", body, re.S)
            if not blocks:
                require(qid in CONCEPTUAL, f"{qid}: falta código o revisión conceptual")
                continue
            require(qid in EXPECTED, f"{qid}: falta resultado esperado independiente")
            stdout, error, correct_index = EXPECTED[qid]
            options = re.findall(r"^- \[([ x])\] (.+)$", body, re.M)
            require([i for i, opt in enumerate(options) if opt[0] == "x"] == [correct_index],
                    f"{qid}: se ha cambiado la respuesta marcada")
            correct = options[correct_index][1]
            if error is None:
                # Las preguntas sin error usan como opción la salida exacta.
                require(correct == "`" + stdout.rstrip("\n").replace("\n", " / ") + "`",
                        f"{qid}: la opción correcta no coincide con la salida esperada")
            else:
                require(f"`{error}`" in correct, f"{qid}: clase de error incorrecta en la opción")
                if stdout:
                    require(f"`{stdout.rstrip(chr(10))}`" in correct,
                            f"{qid}: falta la salida anterior al error en la opción")
                else:
                    require(correct.startswith("No imprime nada:"), f"{qid}: salida anterior inesperada")

            # Cada pregunta obtiene carpeta y proceso nuevos, incluso si usa
            # módulos con el mismo nombre que otra pregunta.
            temp_root = Path.home() / "AppData/Local/Temp/opencode"
            temp_args = {"dir": temp_root} if temp_root.is_dir() else {}
            with tempfile.TemporaryDirectory(prefix="py-quiz-", **temp_args) as folder:
                source = None
                for block in blocks:
                    file_match = re.match(r"# archivo: ([a-z_]+\.py)\n", block)
                    if file_match:
                        name = file_match[1]
                        Path(folder, name).write_text(block, encoding="utf-8")
                        if name == "principal.py":
                            source = block
                    else:
                        require(len(blocks) == 1, f"{qid}: bloque sin nombre en pregunta multiarchivo")
                        source = block
                require(source is not None, f"{qid}: falta principal.py")
                proc = subprocess.run(
                    [sys.executable, "-I", "-X", "utf8", "-c", RUNNER],
                    input=json.dumps({"source": source}), text=True, encoding="utf-8",
                    capture_output=True, cwd=folder, timeout=5, check=True,
                )
                require(not proc.stderr, f"{qid}: stderr inesperado: {proc.stderr}")
                actual = json.loads(proc.stdout)
                require(actual == {"stdout": stdout, "error": error},
                        f"{qid}: esperado {(stdout, error)!r}, obtenido {actual!r}")
            executed.add(qid)
            print(f"{qid}: salida y excepción correctas")
    require(executed == set(EXPECTED), "Hay fixtures sin ejecutar o preguntas sin fixture")
    require(seen - executed == CONCEPTUAL, "No coincide la selección conceptual")
    require(len(seen) == 60 and len(executed) == 57, "Deben ser 60 preguntas y 57 trazas")
    print(f"Python {sys.version.split()[0]}: 57 fragmentos verificados; 3 preguntas conceptuales no ejecutables.")


if __name__ == "__main__":
    run()
