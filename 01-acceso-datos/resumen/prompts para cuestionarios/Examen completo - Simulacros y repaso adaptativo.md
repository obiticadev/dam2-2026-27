# Primer examen — Prompts mixtos y repaso adaptativo

## Selección de fuentes y límites

Selecciona **ambos resúmenes preparados**: UT02-A sin NIO y UT02-B completo. No selecciones el temario 2A original sin filtrar ni fuentes de otras asignaturas. Las distribuciones siguientes son propuestas de entrenamiento, no información del profesor.

Para Studio, pega Q-M1. Para seis alternativas con estructura controlada, usa Q-M2 en el chat. Para practicar sin ver de antemano todas las preguntas, Q-M3. Para aprender de fallos, Q-M4. Para detectar huecos antes del examen, Q-M5. Seis opciones es un requisito solicitado al modelo: comprueba que lo cumple; el formato nativo puede limitarlo.

## Q-M1. Studio: examen mixto difícil

```text
Crea un cuestionario difícil en español del primer examen de Acceso a Datos para segundo de DAM a partir solo de los dos resúmenes seleccionados, UT02-A - Manejo de ficheros - Resumen completo y UT02-B - Librerías XML en Java - Resumen completo. Alcance: java.io y acceso aleatorio; XML/DOM/SAX/StAX/JAXB. NIO excluido: no Path, Files, canales, selectores ni opciones de apertura NIO.

Objetivo: unas 40 preguntas, mitad por unidad, sin presentarlo como ponderación oficial. Si el formato limita cantidad, conserva equilibrio y variedad. Solicito seis alternativas por pregunta con una sola correcta si el formato lo permite. Combina conceptos, contratos, código, trazas y elección razonada de mecanismo. Distractores difíciles pero justos, no ambigüedades.

Incluye contrastes transversales: byte/texto/objeto/XML; EOF -1/null/excepción; readObject/cast frente a unmarshal; árbol frente a eventos; acumulación de buffers frente a acumulación SAX; estado en memoria frente a persistencia explícita; RandomAccessFile directo frente a streaming XML. No confundas Serializable y anotaciones JAXB.

Usa los desarrollos y sus matices antes que los anexos originales. Fija condiciones que afecten al resultado. No inventes preguntas oficiales, fechas ni requisitos. Al revisar explica todas las opciones y referencia Axx/Bxx. No deduzcas que todo lo enlazado externamente entra en examen.
```

## Q-M2. Chat: simulacro de 40 preguntas con corrección diferida

```text
Actúa como examinador de práctica. Usa exclusivamente los dos resúmenes seleccionados de UT02-A y UT02-B. El primer examen incluye UT02-A sin NIO y UT02-B completo. Genera un simulacro textual de 40 preguntas difíciles en español, exactamente seis opciones A-F por pregunta y una sola correcta. No copies literalmente los ejemplos de preguntas ya incluidos.

Matriz de práctica, no oficial: 4 fundamentos/jerarquía, 4 File/filtros, 4 bytes/primitivas, 3 serialización binaria, 3 caracteres/secuencial, 2 RandomAccessFile; 2 XML/elección de API, 6 DOM, 4 SAX, 4 StAX y 4 JAXB. Intercala temas; no reveles el bloque como pista si eso facilita la respuesta. Al menos 14 preguntas deben usar código, XML o trazas. Especifica condiciones de lectura, formato, cursor y estado de archivo. No dependas de NIO, orden del listado, codificación predeterminada, particiones de texto o formato de serialización no garantizados.

Entrega primero solo preguntas y plantilla 1-40, sin soluciones ni indicaciones reveladoras. Si no cabe en una respuesta, divide en tandas numeradas sin cambiar la matriz y sin dar soluciones entre tandas. Espera mis respuestas. Corrige después en tabla y explica cada error con regla, cálculo/traza y descarte de las otras cinco opciones, citando Axx/Bxx. Cuenta aciertos/errores/omitidas sin aplicar penalización oficial inventada.

Antes de publicar, comprueba internamente unicidad de respuesta, seis alternativas y consistencia técnica con las aclaraciones del resumen. Después de corregir, propone el siguiente repaso según mis fallos, no una repetición genérica de todo el temario.
```

## Q-M3. Chat: examinador interactivo de una pregunta cada vez

```text
Quiero practicar el primer examen de Acceso a Datos con los dos resúmenes seleccionados. Alcance UT02-A sin NIO y UT02-B completo. Hazme una sola pregunta cada vez, en español, con seis opciones A-F y una sola correcta. No muestres solución antes de mi respuesta. No inventes preguntas oficiales.

Empieza con una pregunta de diagnóstico y alterna bloques para no dejar sin evaluar File/filtros, bytes, serialización, caracteres, acceso aleatorio, XML/elección de API, DOM, SAX, StAX y JAXB. Usa código y trazas con condiciones completas. No uses Path/Files/canales ni metas contenidos externos por estar enlazados.

Cuando responda, indica si acerté, explica el mecanismo y por qué falla cada distractor, cita el bloque Axx/Bxx y formula la siguiente pregunta. Si digo «no sé», explica primero una versión sencilla y después ofrece una variante nueva. Aumenta dificultad solo cuando demuestre comprensión, no porque acierte una vez.

Mantén un registro en esta conversación de bloque, acierto/error/omisión y tipo de confusión. Cada diez preguntas ofrece balance de cobertura y recomienda dos apartados concretos. No confundas dificultad con redacción ambigua ni supongas respuestas sin matices. Comienza ahora con una única pregunta.
```

## Q-M4. Chat: repaso adaptativo a partir de mis errores

```text
Voy a pegar mis respuestas falladas o dudas del primer examen. Usa solo los dos resúmenes seleccionados, UT02-A sin NIO y UT02-B completo. Primero identifica para cada fallo la confusión subyacente: tipo/retorno, efecto, estado/puntero, parámetro, precondición, representación, dirección de conversión o elección de API.

No repitas solo la respuesta correcta. Explica la regla y un contraejemplo, cita Axx/Bxx y diseña dos preguntas nuevas por confusión: una directa y otra de transferencia con datos diferentes. Cada pregunta tendrá seis opciones y una única correcta; no reveles soluciones hasta que responda. Revisa que ninguna dependa de condiciones omitidas o de NIO.

Cuando conteste, corrige cada alternativa, actualiza los errores recurrentes y distingue haber acertado por descarte de poder explicar el mecanismo. Propón un orden corto de lectura de apartados para remediar mis fallos. Si faltan mis respuestas, pídelas en lugar de inventar un diagnóstico. No marques ningún bloque como dominado sin evidencia de mis respuestas.
```

## Q-M5. Chat: auditoría de cobertura y examen de trampas

```text
Con los dos resúmenes seleccionados, audita la cobertura de los cuestionarios que pegaré. Alcance del primer examen: UT02-A sin NIO y UT02-B completo. No basta contar preguntas ni encabezados.

Construye una matriz bloque/mecanismo evaluado/preguntas existentes/hueco detectado. Considera A01-A10 y A14-A16, y B01-B15. Comprueba que se evalúan métodos, parámetros, retornos, condiciones de error, trazas, casos límite y decisiones de tecnología, no solo definiciones generales. Los anexos son respaldo, no bloques nuevos que duplicar.

Señala contenido fuera de alcance, preguntas repetidas, respuestas ambiguas y errores como File creador físico, null frente a vacío, off como posición de archivo, getEncoding predeterminado null, append ingenuo de objetos, seek relativo, getNodeValue de Element como texto, characters único, StAX con retroceso, getElementText sin avance, wrapper/ítem intercambiados y JAXB incluido en JDK17.

Después genera solo las preguntas necesarias para los huecos: seis opciones y una correcta, con precondiciones suficientes. Separa enunciados de soluciones para que pueda practicar. Usa referencias Axx/Bxx y no inventes distribución oficial. Si todavía no he pegado los cuestionarios, espera a recibirlos.
```
