# Primer examen de PMDM — Material para NotebookLM

## Alcance confirmado

- **Tema 1 completo:** análisis de tecnologías para aplicaciones móviles, apartados 1.A–1.E, incluidas las doce diapositivas de 1.D.
- **Tema 2 completo:** entorno de trabajo y desarrollo con Android Studio, apartados 2.A–2.D.
- **Fecha prevista:** viernes 30 de octubre de 2026, según indicó el estudiante; sin hora comunicada.
- **Referencias que no amplían el examen:** los PDF de Sensores y Multimedia enlazados desde el Tema 1. Se resumen en M14 solo para entender las palabras enlazadas.
- **Formato:** no comunicado. Para practicar se usan preguntas de **cuatro opciones y una sola correcta**, el formato elegido por el estudiante. No se presupone penalización, duración ni distribución oficial.

## Qué archivos usar

| Archivo/carpeta | Función |
|---|---|
| `Tema 1 - Tecnologías para aplicaciones móviles - Resumen completo.md` | Fuente de estudio del Tema 1 (bloques M00–M16 y anexo docente) |
| `Tema 2 - Entorno de trabajo y Android Studio - Resumen completo.md` | Fuente de estudio del Tema 2 (bloques S00–S18 y anexo docente) |
| `prompts para podcast/` | Dos archivos, ocho prompts de audio por tema (P-M0–P-M7, P-S0–P-S7) |
| `prompts para cuestionarios/` | Un archivo de práctica por tema (Q-M0–Q-M7, Q-S0–Q-S7) y uno de simulacros mixtos/adaptativos (Q-X1–Q-X5) |
| `Cobertura y verificación.md` | Correspondencia de apartados originales, transformaciones y pruebas realizadas |
| `verificacion.json` | Registro técnico de hashes, conservación y comprobaciones |

Prefijos: **M** = Tema 1 (móviles y tecnologías), **S** = Tema 2 (Android Studio), **X** = mixto. Los dos resúmenes contienen **desarrollo elaborado y anexo docente**. El anexo conserva íntegro el texto original para no perder detalles, pero **no hay que volver a narrarlo entero**. Los prompts priorizan el desarrollo y sus aclaraciones.

## Preparación del cuaderno

1. Crea un cuaderno para el primer examen de PMDM.
2. Añade los dos resúmenes como fuentes. Si tu versión admite Markdown, carga los `.md`; si no, pega su contenido como texto. No dependas de que NotebookLM siga enlaces locales ni abra imágenes, PDF o vídeo: los diagramas necesarios están descritos en texto.
3. No necesitas cargar los prompts, el informe de cobertura ni el JSON como teoría. Pega las instrucciones directamente al crear cada actividad.
4. Para estudiar un tema, selecciona solo su resumen. Para un simulacro mixto, selecciona los dos.
5. **No cargues los temarios originales ni los PDF de Sensores y Multimedia:** duplicarían el anexo y podrían convertir referencias en materia de examen.

No se ha accedido a tu cuenta de NotebookLM ni subido archivos: la carga y las generaciones se realizan en tu cuaderno.

## Recorrido recomendado

### Comprender antes de examinarse

- Tema 1: escucha P-M1 a P-M5 por separado; P-M0 es mapa general y P-M6, repaso de trampas.
- Tema 2: escucha P-S1 a P-S5; P-S0 orienta y P-S6 sirve de repaso. P-S4 y P-S5 cubren el ciclo de vida, el bloque más denso.
- Después de cada episodio, abre el apartado Mxx/Sxx y comprueba las tablas y trazas. Un audio no garantiza mencionar todos los matices.

### Evaluar con dificultad creciente

1. Cuestionarios por bloque: Q-M1 a Q-M5 y Q-S1 a Q-S5.
2. Cuestionario completo de cada tema: Q-M0 y Q-S0.
3. Simulacros en chat con cuatro opciones: Q-M6, Q-S6 y Q-X2.
4. Repaso de fallos: Q-X3/Q-X4; auditoría de preguntas: Q-M7, Q-S7 y Q-X5.

Para practicar sin conexión, el sitio de cuestionarios de la asignatura (`../cuestionarios/`) contiene preguntas de cuatro opciones de ambos temas con su corrección.

## Cuatro opciones: límite importante

Los prompts piden cuatro alternativas A–D y una única respuesta correcta. **El cuestionario nativo de Studio puede fijar otro número de opciones o preguntas**, así que no es una función garantizada. Si ocurre, usa el prompt de simulacro en el chat: pide el formato textual, comprueba que se respeta y responde antes de pedir la corrección.

Las preguntas incluidas en los resúmenes (M16, S18) son **práctica añadida**, con el descarte de cada distractor. No son preguntas oficiales ni indican qué preguntará el profesor.

## Cómo están estructurados los resúmenes

- Identificadores Mxx/Sxx para enfocar cada generación.
- Tablas de comparación: sistemas, plataformas, capas, tipos de aplicación, estados y *callbacks*.
- Código Java y XML en bloques, explicado línea a línea, con su equivalente actual.
- Figuras importantes descritas en texto: pila de Android, tabla de versiones, distribución de API y los tres diagramas del ciclo de vida.
- Trazas de escenarios del ciclo de vida.
- «Temario», «Aclaración técnica» y «Práctica añadida» distinguidos.
- Datos caducados del temario (versiones, requisitos de 2017, cuotas) señalados como históricos, sin borrarlos.

## Qué se ha comprobado y qué no

- Lectura completa de ambos temarios, revisión de las figuras con información y extracción del texto de los tres PDF enlazados.
- Anexos íntegros: cada anexo se convierte de vuelta exactamente en su temario aplicando las transformaciones declaradas.
- Código del Tema 2: XML bien formado y Java compilado con sustitutos mínimos de las clases de Android, tras normalizar los espacios no separables que trae el temario. **No se ha ejecutado ninguna app Android**: no hay SDK de Android en el equipo de preparación.
- Las aclaraciones técnicas proceden de la documentación oficial de Android y Apple conocida a la fecha indicada; revisa las que contradigan lo que diga tu profesor y, en ese caso, prioriza su criterio para el examen.
- No se ha comprobado el audio ni el cuestionario dentro de tu cuenta.
- No se han modificado el temario, los repositorios de laboratorios ni la bóveda de Obsidian; la bóveda solo se ha leído para confirmar alcance y fecha.

## Petición corta para comprobar una respuesta sospechosa

```text
Contrasta tu respuesta con el apartado Mxx/Sxx del resumen seleccionado. Separa lo que dice el temario de la aclaración técnica. Si contradice una aclaración o una traza del resumen, corrígela explícitamente y explica por qué el distractor parecía plausible. No resuelvas la discrepancia inventando un comportamiento ni ampliando el examen a sensores o multimedia.
```
