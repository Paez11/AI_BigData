# Arquitectura y Aplicaciones de Big Data

## Arquitectura de sistemas Big Data

El proceso de información consta de varias etapas: identificación de datos, almacenamiento, análisis y visualización.

La arquitectura prototípica de un sistema Big Data es eficiente y modular, implementada en la nube o clústeres para escalabilidad y disponibilidad.

Los sistemas Big Data siguen estos pasos:
- Ingestión de datos
- Procesamiento
- Aprendizaje automático
- Motor de búsqueda
- Aplicación web para la interacción del usuario

## Tipos de procesamiento

Existen tres tipos de procesamiento:
- **Por lotes (batch)**: Maneja grandes volúmenes de datos de forma eficiente, acumulando datos antes de analizarlos en una sola ejecución.
- **En streaming**: Procesa datos en micro-lotes de forma continua y secuencial a medida que llegan.
- **En tiempo real**: Analiza datos inmediatamente a medida que se ingieren, requiriendo respuestas instantáneas o casi instantáneas y sin pérdida de datos.

El procesamiento en streaming y en tiempo real utilizan la memoria RAM para un alto rendimiento, mientras que el procesamiento por lotes usa el disco duro.

## Desafíos de sistemas Big Data en la nube

- **Seguridad y hackeo**: Riesgo de protección de datos si los protocolos son deficientes.
- **Cuellos de botella en el procesamiento**: Ocurren cuando un componente no puede manejar el volumen de tareas.
- **Escalabilidad**: Necesaria para adaptarse a la demanda creciente de recursos.
- **Concurrencia**: Debe gestionarse para evitar conflictos entre tareas que comparten recursos.
- **Tolerancia a fallos**: Asegura que el sistema continúe operando sin pérdida de datos si un nodo falla.
- **Disponibilidad**: Los servicios deben estar accesibles en todo momento, replicando servicios en varios nodos.

## MapReduce

Modelo de computación para procesamiento por lotes, con tres etapas:
1. **Map**: Procesamiento inicial de datos locales en cada nodo.
2. **Shuffle**: Reorganización y reordenamiento de los datos intermedios.
3. **Reduce**: Procesamiento de los datos intermedios para producir el resultado final.

El usuario define las funciones Map y Reduce.

## Plataformas para Big Data

### Apache Hadoop
- Diseñado para el procesamiento por lotes, implementando el modelo MapReduce.
- **Características**: Escalable, tolerante a fallos y flexible en el almacenamiento de datos.
- **Retos**: Falta de recursividad e interactividad, coste inicial alto y complejidad de administración.
- **Componentes**:
  - **HDFS**: Almacenamiento.
  - **YARN**: Gestión de recursos.

El ecosistema de Hadoop incluye herramientas como MapReduce, Apache Sqoop, HBase, Cassandra, Flume y Mahout.

### Apache Spark
- Herramienta avanzada para procesamiento rápido, tanto por lotes como en tiempo real, utilizando la memoria RAM.
- **Características**:
  - Utiliza **DAGs** (Directed Acyclic Graphs) para la organización de procesos.
  - Su núcleo son los **RDDs** (Resilient Distributed Datasets), que permiten la tolerancia a fallos.
  - Organiza datos en particiones y los mantiene en memoria RAM.
  - Los RDDs tienen un registro de linaje para reconstruir particiones en caso de fallos.
  - **Spark Streaming** convierte flujos de datos en mini-batches para procesamiento casi en tiempo real.
- **Componentes**: Spark SQL, Spark Streaming, MLib y GraphX.

### Similitudes y diferencias entre Hadoop y Spark

- Ambos priorizan la localidad de datos y dividen los procesos en etapas.
- **Hadoop** usa lectura y escritura en disco, mientras que **Spark** usa la memoria RAM para mayor velocidad.
- **Hadoop** tiene un flujo rígido de MapReduce, mientras que **Spark** usa DAGs optimizados para las etapas.

## Aplicaciones de Big Data

Se distinguen:
- **BIG Data**: Grandes infraestructuras.
- **big DATA**: Basadas en datos.

Las grandes empresas como Amazon, Netflix, Apple, Coca-Cola y Starbucks usan Big Data para recomendaciones, optimización y análisis de datos.

### Uso de Big Data en Empresas Internacionales

#### Amazon
- Utiliza el análisis predictivo para sistemas de recomendación de productos.
- Implementó "Amazon Go" para automatizar compras sin cajeros.

#### Netflix
- Emplea Big Data y Deep Data para analizar el comportamiento de sus usuarios.
- Utiliza IA y transfer learning para personalizar recomendaciones.
- Analiza patrones de uso para prevenir bajas de suscriptores.

#### Apple
- Usa análisis de datos para personalizar la experiencia del usuario y mejorar la eficiencia operativa.

#### Coca-Cola
- Usa datos climáticos e históricos de precios para optimizar precios y mantener la uniformidad del sabor de sus productos.
- Implementa IA para el servicio al cliente y monitoreo en redes sociales.

#### Starbucks
- Utiliza datos para ofertas personalizadas y desarrollo de productos.
- Usa señalización digital dinámica en sus tiendas.
- Analiza el tráfico y tránsito peatonal al elegir ubicaciones.

## Big Data en España: Adopción, Retos y Oportunidades

### Porcentaje de empresas que utilizan Big Data
- **Total**: 13.9% de las empresas en España.
- **Comunidades líderes**: Madrid (17%), Cataluña y La Rioja (16%).
- **Objetivo**: Alcanzar un 25% de adopción para 2026.

### Variación del uso según el tamaño de empresa
- **Grandes empresas**: 34.7%
- **Empresas medianas**: 20.8%
- **Pequeñas empresas**: 11.9%
- **Microempresas**: 3.7%

### Sectores líderes en adopción
- TIC: 35.2%
- Información y comunicaciones: 34.7%
- Transporte: 24.6%
- Energía y agua: 22.1%
- Actividades profesionales o científicas: 19.9%

### Barreras para la implementación
- **Falta de personal cualificado** (64% disponible, se espera 80% para 2030).
- **Falta de infraestructura**.
- **Disponibilidad de datos confiables**.
- **Privacidad y seguridad**.
- **Falta de conocimientos**.

### Oportunidades
- **Análisis del comportamiento del cliente**.
- **Detección de tendencias emergentes**.
- **Optimización de precios y modelos de negocio**.
- **Innovación en productos y servicios**.
- **Identificación de nuevos mercados**.

## Big Data: Análisis Financiero y Casos de Éxito

### Métricas Financieras Clave (VAN, ROI, TIR)

#### Valor Actual Neto (VAN)
- Mide la rentabilidad descontando los flujos de caja futuros.
- Un VAN positivo indica que el proyecto es rentable.

#### Retorno de la Inversión (ROI)
- Calcula la relación entre beneficios y costos.
- **Fórmula**: ROI = (VAN / I0) x 100%

#### Tasa Interna de Retorno (TIR)
- Tasa que hace que el VAN sea 0.
- Cuanto mayor sea la TIR, mejor la rentabilidad del proyecto.

### Importancia del Business Case en Proyectos de Big Data
- **Optimización de la evaluación**.
- **Medición de beneficios**.
- **Gestión de riesgos**.
