# UD5: Principales Métodos y Algoritmos en la Minería de Datos

## 1. Introducción

La minería de datos es una disciplina clave dentro del análisis de datos que tiene como propósito principal descubrir patrones útiles en grandes volúmenes de información. Esta actividad forma parte de un proceso más amplio conocido como **KDD (Knowledge Discovery in Databases)**, que traduce "descubrimiento de conocimiento en bases de datos".

Aunque el proceso KDD incluye varias fases, esta unidad se centra en la minería de datos por ser la parte más visible y práctica. Además, se exploran los diferentes tipos de minería (de datos, de textos, de opiniones, de grafos) y tareas asociadas como clasificación, agrupamiento y detección de anomalías. También se presentan metodologías como **SEMMA** y **P3TQ**, que sirven para organizar todo el proceso de minería de datos.

---

## 2. Diferentes Tipos de Minería

### 2.1 Minería de Datos

Este tipo de minería trabaja con **datos estructurados**, generalmente almacenados en bases de datos relacionales, hojas de cálculo o DBMS. Su objetivo es descubrir regularidades o patrones que permitan construir modelos de clasificación o predicción. Estos modelos pueden aplicarse a nuevos datos para generar información valiosa.

**Ejemplos de aplicación:**

* Predecir la fuga de clientes.
* Clasificación de correos en spam/no spam.
* Perfilamiento de patrones de consumo.

### 2.2 Minería de Textos

Opera sobre datos **no estructurados**, como documentos, correos o redes sociales. El objetivo es extraer patrones semánticos, aunque muchas técnicas actuales son de enfoque lexicográfico, basadas en el conteo de palabras.

**Objetivos típicos:**

* Extracción de información relevante.
* Análisis de frecuencia de términos.
* Generación automática de resúcmenes.

**Ejemplo:** Automatizar el resumen de noticias o documentos extensos para recuperar los puntos clave.

### 2.3 Minería de Opiniones

Conocida también como **análisis de sentimientos**, busca identificar la polaridad emocional de los textos. Clasifica los contenidos en:

* Positivos
* Negativos
* Neutros

Debe manejar lenguaje informal, abreviaturas y emoticonos. Resulta crucial para detectar cambios en la percepción pública.

**Aplicaciones:**

* Seguimiento de la reputación de marcas.
* Ajustes en estrategias de marketing.
* Mejora de productos según retroalimentación del cliente.

### 2.4 Minería de Grafos

Analiza relaciones complejas representadas en grafos: nodos y aristas. Se aplica a:

* Redes sociales.
* Redes semánticas.
* Infraestructuras de redes informáticas.

Utiliza recursos como **WordNet**, una base de datos léxica que agrupa sinónimos en "synsets" para mejorar la comprensión semántica y posibilitar tareas de desambiguación o recuperación de información.

---

## 3. Profundidad y Amplitud en el Análisis

Existe una relación directa entre la **amplitud** (cantidad de datos) y la **profundidad** (nivel de complejidad del análisis). A mayor profundidad, mayor valor analítico.

**Datos estructurados:**

* Comienzan con indicadores y reportes básicos.
* Pasan por consultas ad hoc y descubrimiento de patrones.
* Culminan en modelos predictivos complejos.

**Datos no estructurados:**

* Desde búsquedas simples de palabras clave.
* Hasta minería de textos y análisis de sentimientos.

---

## 4. Proceso KDD

KDD es un enfoque iterativo para extraer conocimiento a partir de los datos. Fue definido por **Usama Fayyad** y se compone de cinco fases:

### 4.1 Selección

Se identifican y extraen datos relevantes del conjunto total. Implica prospección y definición de objetivos.

**Ejemplo:** Elegir datos de clientes bancarios por criterios como renta, edad y localización para prever su comportamiento crediticio.

### 4.2 Preproceso

Implica:

* Limpieza de datos (errores, outliers).
* Tratamiento de valores faltantes.
* Corrección de inconsistencias.

### 4.3 Transformación

Reestructuración de los datos:

* Reducción de variables.
* Clustering preliminar.

Ejemplo: Agrupar clientes en buenos, malos y dudosos pagadores.

### 4.4 Minería de Datos

Fase central donde se aplican algoritmos. Se definen:

#### Funciones del modelo:

* **Clasificación**
* **Clustering**
* **Resumen**
* **Análisis de secuencias**

#### Representación:

* Árboles de decisión.
* Reglas tipo "SI...ENTONCES...".
* Redes neuronales.
* Redes bayesianas y algoritmos genéticos.

#### Criterios de evaluación:

* Precisión.
* Recall.
* F1-score.
* Interpretabilidad y eficiencia.

#### Algoritmos de búsqueda:

* Descenso del gradiente.
* Algoritmos evolutivos.

### 4.5 Interpretación y Evaluación

Se interpretan los modelos generados y se evalúa su validez y utilidad práctica en la toma de decisiones.

---

## 5. Metodología SEMMA

Diseñada por **SAS Institute**, está centrada en la modelización predictiva.

### Etapas:

1. **Sample**: Selección de muestra representativa.
2. **Explore**: Exploración de relaciones y patrones.
3. **Modify**: Transformación y limpieza de datos.
4. **Model**: Construcción del modelo predictivo.
5. **Assess**: Evaluación de resultados y calidad.

SEMMA está orientada a la práctica técnica del modelado, pero no cubre el ciclo completo como KDD.

---

## 6. Metodología P3TQ

Propuesta por **Dorian Pyle (2003)**, tiene enfoque táctico y estratégico. Sus siglas provienen de:

* Product
* Place
* Price
* Time
* Quantity

### Aportaciones:

* Alineación entre negocio y análisis.
* Clarificación de objetivos reales.
* Estructura adaptable a diferentes contextos.

### Fases:

#### Modelo de Negocio:

* Identifica el contexto, problema y objetivos.
* Utiliza entrevistas, mapeo, modelado sistémico.

#### Modelo de Explotación de Información:

1. Preparación de datos.
2. Selección de herramientas y modelado.
3. Ejecución.
4. Evaluación.
5. Comunicación de resultados.

---

## Caso de Estudio: Concesión de Créditos

**Fase 1: Selección**

* Datos de clientes de distintas zonas y perfiles.
* Se eliminan datos sensibles (DNI, teléfono).

**Fase 2: Preproceso**

* Limpieza de datos, valores nulos, formatos incorrectos.

**Fase 3: Transformación**

* Clustering en buenos, dudosos y malos pagadores.

**Fase 4: Minería**

* Clasificación de nuevos clientes usando árboles o tablas resumen.

**Fase 5: Evaluación**

* Validación de decisiones automáticas con base en patrones aprendidos.

---

## Conclusión

KDD es un proceso metodológico integral que abarca la minería de datos. Las metodologías **SEMMA** y **P3TQ** complementan su aplicación en contextos específicos. A través de estas herramientas, las organizaciones pueden transformar datos en conocimiento accionable, optimizando la toma de decisiones a todos los niveles.
