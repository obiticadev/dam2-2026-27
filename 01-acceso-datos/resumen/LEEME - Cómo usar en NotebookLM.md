# Primer examen de Acceso a Datos — Material para NotebookLM

## Alcance confirmado

- **UT02-A:** capítulos 1 y 2, `java.io`, incluidos acceso secuencial y `RandomAccessFile`.
- **NIO excluido expresamente:** ni `Path`, `Files`, canales, selectores ni su capítulo de opciones de apertura.
- **UT02-B completo:** XML, DOM, SAX, StAX y JAXB.
- Tipo de preparación: test con hasta seis opciones y una correcta, según lo comunicado por el estudiante. No se presupone fecha, penalización, duración ni distribución oficial.

## Qué archivos usar

| Archivo/carpeta | Función |
|---|---|
| `UT02-A - Manejo de ficheros - Resumen completo.md` | Fuente de estudio de ficheros, sin NIO |
| `UT02-B - Librerías XML en Java - Resumen completo.md` | Fuente de estudio de XML |
| `prompts para podcast/` | Dos archivos, ocho prompts de audio por unidad |
| `prompts para cuestionarios/` | Dos archivos de práctica por unidad y uno de simulacros mixtos/adaptativos |
| `Cobertura y verificación.md` | Correspondencia de apartados originales, omisiones deliberadas y pruebas realizadas |
| `verificacion.json` | Registro técnico de hashes, conservación y laboratorios |

Los dos resúmenes contienen **explicación elaborada y anexo docente**. El anexo conserva los ejemplos originales para no perder detalles, pero **no hay que volver a narrarlo entero**. Los prompts priorizan la explicación estructurada y sus correcciones.

## Preparación del cuaderno

1. Crea un cuaderno para el primer examen.
2. Añade los dos resúmenes como fuentes. Si tu versión admite Markdown, carga los `.md`; si no, pega su contenido como texto. No dependas de que NotebookLM siga enlaces locales ni abra sus imágenes automáticamente.
3. No necesitas cargar los prompts, el informe de cobertura o el JSON como teoría. Pega las instrucciones directamente al crear cada actividad.
4. Para estudiar una unidad, selecciona solo su resumen. Para un simulacro mixto, selecciona los dos.
5. **No cargues el temario 2A original completo sin filtrar:** contiene NIO, que no entra, y duplicaría la información ya conservada en el anexo filtrado.

No se ha accedido a tu cuenta de NotebookLM ni subido archivos: la carga y las generaciones se realizan en tu cuaderno. Los archivos están preparados para ello.

## Recorrido recomendado

### Comprender antes de examinarse

- 2A: escucha P-A1 a P-A5 por separado; P-A0 es mapa general y P-A6, repaso de trampas.
- 2B: escucha P-B1 a P-B6; P-B0 orienta la elección de API y P-B7 sirve de repaso.
- Después de cada episodio, abre el apartado Axx/Bxx y verifica parámetros, retorno y una traza. Un audio no garantiza mencionar todos los casos límite.

### Evaluar con dificultad creciente

1. Cuestionarios por bloque: Q-A1 a Q-A5 y Q-B1 a Q-B5.
2. Cuestionario completo de cada unidad: Q-A0 y Q-B0.
3. Simulacros en chat con seis opciones: Q-A6, Q-B6 y Q-M2.
4. Repaso de fallos: Q-M3/Q-M4; auditoría de preguntas: Q-A7, Q-B7 y Q-M5.

## Seis opciones: límite importante

Los prompts solicitan seis alternativas A–F y una única respuesta correcta. **El cuestionario nativo de Studio puede fijar otro número de opciones o preguntas**, por lo que no es una función garantizada. Si ocurre, usa el prompt de simulacro en el chat: pide explícitamente el formato textual, comprueba que se respeta y responde antes de pedir la corrección.

Las preguntas incluidas en los resúmenes son **práctica añadida**, con descarte de cada distractor. No se han presentado como preguntas oficiales ni como prueba de qué preguntará el profesor. Las proporciones de los prompts son decisiones de entrenamiento.

## Cómo están estructurados los resúmenes

- Identificadores Axx/Bxx para enfocar cada generación.
- Conceptos y criterios de elección antes de las firmas.
- Tablas de parámetros, retornos, efectos y errores.
- Código en bloques con lenguaje y fragmentos identificados como tales.
- Trazas de datos, arrays, punteros, árboles y eventos.
- Ejemplos docentes distinguidos de aclaraciones y práctica añadida.
- Advertencias para que NotebookLM no convierta simplificaciones del original en afirmaciones absolutas.

En 2A se conservaron los identificadores ya asignados al excluir NIO: **A11–A13 no existen deliberadamente**. No es contenido pendiente. El recorrido salta de A10 a A14; los prompts ya están adaptados.

## Qué se ha comprobado y qué no

- Lectura de ambos temarios Markdown; el PDF equivalente no se ha vuelto a procesar.
- Cobertura de los apartados incluidos y declaración de las omisiones de NIO.
- Anexos con bloques de código originales conservados sin alterar instrucciones ni indentación; se normalizan finales de línea y se adaptan encabezados/rutas de imagen de forma declarada.
- Compilación `--release 17` y ejecución aislada de `PruebaFicheros` y `PruebaXml`, con salida comparada y comprobaciones del archivo de registros.
- JAXB revisado documentalmente, **no ejecutado**. Los programas docentes originales no se declaran probados por haber pasado los laboratorios añadidos.
- No se ha comprobado el audio ni el cuestionario dentro de tu cuenta. Revisa las explicaciones de la IA, especialmente si contradicen las aclaraciones técnicas de los resúmenes.
- No se han modificado los originales, los repositorios de laboratorios ni la bóveda de Obsidian. Solo se han creado estos entregables en `resumen`.

## Petición corta para comprobar una respuesta sospechosa

```text
Contrasta tu respuesta con el apartado Axx/Bxx del resumen seleccionado. Separa tipo de retorno, efectos, precondiciones y casos límite. Si contradice una aclaración técnica, corrígela explícitamente y explica por qué el distractor parecía plausible. No resuelvas la discrepancia inventando un comportamiento ni ampliando el examen a NIO.
```
