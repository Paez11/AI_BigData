# UD 6 – Fases de los Modelos: Valoración, Interpretación y Despliegue

## 1 · Introducción  

En este capítulo se presentan tres metodologías de referencia para gestionar proyectos de ciencia de datos:

- **CRISP-DM** (Cross-Industry Standard Process for Data Mining)  
  Metodología generalista, gratuita y muy difundida en la industria. Guía todo el ciclo, desde entender el problema de negocio hasta poner el modelo en producción.

- **TDSP** (Team Data Science Process)  
  Proceso ágil propuesto por Microsoft que integra control de versiones, automatización de experimentos y buenas prácticas DevOps, pensado para equipos multidisciplinares.

- **ASUM-DM** (Analytics Solutions Unified Method for Data Mining)  
  Evolución de CRISP-DM creada por IBM. Añade un marco de gestión de proyectos y gobierno corporativo, orientado a soluciones analíticas complejas y escalables.
  
---

## 2 · Metodología CRISP-DM  

CRISP-DM (1999) divide el ciclo de vida de un proyecto analítico en **seis fases iterativas**:

### 2.1 Comprensión del negocio
- **Objetivo**: traducir la necesidad empresarial a objetivos técnicos.  
- **Tareas principales**  
  1. Establecimiento de los objetivos del negocio  
  2. Evaluación de la situación actual (recursos, restricciones, riesgos)  
  3. Definición de los objetivos de minería de datos  
  4. Elaboración del plan de proyecto (fases, herramientas, cronograma)  
- **Ejemplo**: una tienda online desea predecir qué clientes comprarán de nuevo.

### 2.2 Comprensión de los datos
- **Objetivo**: familiarizarse con las fuentes de datos y su calidad.  
- **Tareas principales**  
  - Obtención de los datos iniciales  
  - Descripción estadística de variables  
  - Exploración de patrones y valores atípicos  
  - Verificación de calidad (exactitud, completitud, consistencia…)  
- **Ejemplo**: se detectan edades de clientes con valores faltantes o erróneos.

### 2.3 Preparación de los datos
- **Objetivo**: dejar los datos listos para el modelado.  
- **Tareas principales**  
  - Selección de atributos relevantes / descarte de irrelevantes  
  - Limpieza (errores, duplicados, valores nulos)  
  - Construcción de atributos derivados (p. ej. «cliente_frecuente»)  
  - Integración de múltiples fuentes  
  - Formateo (tipos, escalas, estructuras)  

### 2.4 Modelado
- **Objetivo**: entrenar modelos predictivos o descriptivos.  
- **Tareas principales**  
  - Selección de la técnica (clasificación, regresión, clustering, etc.)  
  - Diseño del esquema de validación (k-fold, hold-out…)  
  - Entrenamiento / ajuste de hiperparámetros  
  - Evaluación con métricas apropiadas (accuracy, recall, F1…)  
- **Ejemplo**: modelo con 85 % de acierto en la predicción de recompra.

### 2.5 Evaluación
- **Objetivo**: comprobar que el modelo satisface los objetivos del negocio y no solo los técnicos.  
- **Tareas principales**  
  - Comparar resultados con los KPIs definidos  
  - Revisar el proceso para detectar mejoras o sesgos  
  - Decidir los siguientes pasos (iterar, ampliar datos, desplegar…)

### 2.6 Despliegue
- **Objetivo**: utilizar el modelo en un entorno real y sostenible.  
- **Tareas principales**  
  - Plan de despliegue (batch, API, dashboard…)  
  - Monitorización y mantenimiento (drift, re-entrenos)  
  - Informe final y lecciones aprendidas  

#### Ejemplo completo (industria 4.0)
Una empresa manufacturera instala sensores en sus máquinas y construye un **random forest** que predice fallos 48 h antes con un 85 % de precisión. El sistema alerta automáticamente al jefe de mantenimiento y activa un plan de mantenimiento preventivo solo cuando es necesario, reduciendo paradas y costes.

---

## 3 · Metodología TDSP (Microsoft)

Proceso ágil de cinco fases que enfatiza la colaboración y la entrega continua:

| Fase                                 | Descripción |
|--------------------------------------|-------------|
| **1. Comprensión del problema**      | Definir objetivo, preguntas clave y métricas de éxito. |
| **2. Adquisición y comprensión de datos** | Ingesta, limpieza, exploración y definición de la arquitectura de datos. |
| **3. Modelado**                      | Ingeniería de características, entrenamiento y comparación de varios modelos. |
| **4. Despliegue**                    | Publicación del mejor modelo como servicio (API, microservicio, etc.). |
| **5. Aceptación del cliente**        | Validación funcional y económica, documentación y formación de usuarios. |

### Roles típicos en un equipo TDSP
- **Administrador de grupo** – visión estratégica del área de data science.  
- **Líder de equipo** – coordina a los científicos de datos.  
- **Líder de proyecto** – gestión operativa diaria.  
- **Colaboradores** – ingenieros, analistas, DevOps, etc.

#### Ejemplo (mantenimiento predictivo)
Con los mismos datos de sensores, el equipo entrena varios modelos, elige random forest y lo despliega como API que alerta a mantenimiento. El cliente valida la reducción de paradas y aprueba su uso piloto.

---

## 4 · Metodología ASUM-DM (IBM)

Evolución corporativa de CRISP-DM con **seis fases** (cinco secuenciales + una transversal de gestión):

1. **Análisis** – entender problema, actores y requerimientos; generar un plan inicial.  
2. **Diseño** – seleccionar técnicas, arquitectura (cloud/on-premise), recursos y criterios de éxito.  
3. **Configuración y construcción** – ciclos iterativos de limpieza, modelado, integración y pruebas.  
4. **Despliegue** – migración al entorno productivo sin impacto y capacitación de usuarios.  
5. **Operación y optimización** – monitorizar el rendimiento y re-entrenar o ampliar la solución.  
6. **Gestión de proyecto** (transversal) – cronograma, riesgos, stakeholders y comunicación.

---

## 5 · Comparativa rápida

| Aspecto                | **CRISP-DM** | **TDSP** | **ASUM-DM** |
|------------------------|--------------|----------|-------------|
| **Origen**             | Europa (1999) | Microsoft | IBM |
| **Enfoque**            | Generalista y orientado a negocio | Ágil / DevOps | Corporativo y escalable |
| **Iteración**          | Iterativo libre | Iteraciones cortas | Iteración + gestión paralela |
| **Roles explícitos**   | No | Sí (líder técnico, administrador…) | Sí, enfatiza gobernanza |
| **Uso actual**         | Muy extendido | Creciente en ML | Popular en grandes empresas |
| **Fortalezas**         | Simplicidad y adaptabilidad | Integración continua y colaboración | Gestión de riesgos y alineación estratégica |
| **Debilidades**        | Poca guía sobre infraestructura | Curva de entrada para principiantes | Puede ser pesado en proyectos pequeños |

---

## 6 · Conclusión

Las tres metodologías comparten un núcleo común (comprender negocio → comprender datos → preparar → modelar → evaluar → desplegar) pero difieren en **profundidad**, **herramientas** y **gobierno**:

- **CRISP-DM** es ideal para introducir un enfoque ordenado y comprensible.  
- **TDSP** resulta potente cuando el objetivo es llevar modelos a producción con buenas prácticas DevOps.  
- **ASUM-DM** añade un marco robusto de gestión que encaja en organizaciones con procesos formales y requisitos de calidad estrictos.

Seleccionar el enfoque adecuado depende del **tamaño del equipo**, la **madurez de la organización** y la **criticidad** de la solución a desplegar.
