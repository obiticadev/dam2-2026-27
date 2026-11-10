# Cuestionarios · Sistemas de Gestión Empresarial

Sitio estático para **UT1 y UT2**, adaptado del proyecto de cuestionarios de
Acceso a Datos. URL prevista: **https://cuestionarios-sge.pages.dev**.

## Aprender resolviendo

- **180 preguntas originales**: nueve bloques de veinte.
- **Repaso mixto**: veinte preguntas seleccionadas del banco, cinco de UT1 y
  quince de UT2. No son veinte preguntas originales adicionales ni una
  ponderación oficial de examen.
- Cuatro opciones, una correcta y **cuatro explicaciones** tras corregir.
- Nivel introductorio: definiciones, significado de siglas, usos y diferencias.
- Las explicaciones enseñan el concepto sin exigir abrir la teoría. Las fuentes
  son una consulta opcional.
- Preguntas y opciones barajadas; paginación, marcas, cronómetro y progreso
  local conservados del plugin original. No hay tiempo límite ni penalización.
- Un mapa enlaza cada término con las preguntas que lo trabajan.

Las siglas centrales se practican de forma directa; algunas siglas técnicas
complementarias se desarrollan en las explicaciones. No se intenta memorizar
años históricos, cuotas de mercado ni catálogos de marcas. Las precisiones
editoriales de UT1 sobre objetivos medibles y presupuestos se respetan.

## Bloques

| Bloque | Unidad | Contenido |
|---|---|---|
| 1 | UT1 | Empresa, sistemas, recursos, departamentos, misión y visión |
| 2 | UT1 | Objetivos, DAFO, estrategia, táctica y decisiones |
| 3 | UT2 | Procesos, KPI, ERP, EOQ, MRP y modularidad |
| 4 | UT2 | Nube, IA, IoT, CAD/CAM/CNC y despliegue |
| 5 | UT2 | SCM, SRM, e-commerce, PIM, stock y precios |
| 6 | UT2 | BI, DW, ETL, data marts y modelado dimensional |
| 7 | UT2 | OLAP, DSS, minería, aprendizaje y CMI |
| 8 | UT2 | CRM, perfiles, omnicanalidad y componentes |
| 9 | UT2 | Integración, formatos, conectores e indicadores |

## Desarrollo

Se recomienda **Node 22.18 o superior** (la auditoría usa carga nativa de
TypeScript sin opciones experimentales). Se fija `22.18.0` en `.node-version`
para Cloudflare Pages.

```sh
npm ci
npm run dev
npm test
```

| Comando | Uso |
|---|---|
| `npm run dev` | Genera MDX e inicia Astro |
| `npm run build` | Genera MDX y compila el sitio en `dist/` |
| `npm run preview` | Sirve el sitio compilado |
| `npm run test:cuestionarios` | Audita el banco y el HTML; requiere compilar antes |
| `npm test` | Compila y ejecuta la auditoría completa |

Para el servidor de desarrollo desde un agente, seguir `AGENTS.md` y usar
modo de ejecución en segundo plano.

## Estructura y edición

```text
data/                         # Banco editorial: fuente de verdad
  modelo.mjs                  # Valida opciones con explicación individual
  banco.mjs                   # Bloques, IDs y selección del mixto
  ut1-*.mjs / ut2-*.mjs        # Preguntas escritas y revisadas
scripts/
  generar-cuestionarios.mjs    # Genera páginas y mapa de conceptos
  verificar-cuestionarios.mjs  # Valida banco, HTML, referencias y enlaces
src/content/docs/
  index.mdx                   # Portada editable
  mapa-conceptos.mdx           # Generado
  ut1/ y ut2/                 # Test generados
  repaso-mixto.mdx             # Generado
public/temario/                # Copias de los dos Markdown utilizados
public/cobertura.json          # Índice generado de términos y preguntas
packages/starlight-quiz/       # Copia del fork local original, con su licencia
```

Editar las preguntas en `data/`, **no en las páginas generadas**. Cada opción
incluye texto y explicación separados por ` :: `. En los datos la primera
opción es la correcta; el generador reparte su posición 5/5/5/5 y el navegador
vuelve a barajar todo. Esto no expone al alumno un patrón de posición fijo.

Los IDs `sge-v1-…` separan este progreso del proyecto de origen. No reordenar
las filas del banco para una corrección menor. Si se cambia el significado de
una pregunta, versionar su ID o el prefijo para no recuperar respuestas viejas.
Los datos se guardan en `localStorage`, solo en el navegador y origen actuales.

## Fuentes y control de calidad

Se han utilizado los Markdown de `../temario/`, conservados también en
`public/temario/` para que el proyecto pueda compilar de forma independiente.
Son copias de referencia; no se editan los originales de la asignatura. Si
cambia el temario, actualizar las copias y revisar preguntas y referencias.

La auditoría comprueba:

- 180 enunciados originales y 200 IDs publicados, contando el repaso.
- Veinte preguntas por test, cuatro opciones distintas y una sola correcta.
- Presencia e integridad de las cuatro explicaciones en el HTML real.
- Apartados de las fuentes y enlaces internos, incluidas anclas del mapa.
- Cobertura explícita de siglas clave y reparto de posiciones de las soluciones.
- Frecuencia de respuestas correctas estrictamente más largas: máximo 35 %
  global y 50 % por bloque. Es una alerta editorial, no una prueba semántica.

La revisión pedagógica no se sustituye por contar caracteres. Se explican las
confusiones, se evitan dobles soluciones y se conserva el alcance contextual
de datos estadísticos y cuestiones legales. Las expansiones técnicas de
siglas citadas son aclaraciones, no nuevos requisitos de programación.

## Cloudflare Pages

Configuración del proyecto **`cuestionarios-sge`**:

| Campo | Valor |
|---|---|
| Framework | Astro |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node | `22.18.0` o superior; respetar `.node-version` |
| Root directory | Esta carpeta dentro del repositorio |
| URL canónica | `https://cuestionarios-sge.pages.dev` |

Para el repositorio general, la raíz de compilación es
`05-sistemas-gestion-empresarial/cuestionarios`; si se sube solo este proyecto,
es la raíz del repositorio. No requiere adaptador de servidor, funciones ni
secretos de ejecución: es una publicación estática.

Despliegue manual, una vez creado el proyecto y autenticado en Cloudflare:

```sh
npm test
npx wrangler pages deploy dist --project-name cuestionarios-sge
```

Preparar el proyecto no lo publica automáticamente. El subdominio depende de
que Cloudflare permita y tenga creado el nombre de proyecto indicado.
