# Introducción

En el aprendizaje no supervisado no se dispone de las etiquetas `yᵢ` del individuo (objeto) `i` que aparecían en el aprendizaje supervisado. Los datos que se disponen del individuo (objeto) `i` vienen almacenados en un vector `xᵢ`.

El aprendizaje no supervisado resuelve uno de los siguientes problemas:

- **Análisis clúster**: El objetivo es encontrar clústeres cuyos objetos sean lo más homogéneos entre sí y los objetos de clústeres diferentes lo más heterogéneos posible. Cuando los registros de la base de datos están asociados a individuos (en lugar de objetos), este problema también se conoce como *segmentación* (de mercados).

- **Detección de anomalías**: Este problema busca los individuos (objetos) que no encajan en los grupos conformados.

- **Reducción de la dimensionalidad de la base de datos**: Este problema consiste en simplificar la base de datos agregando variables con atributos similares. También puede ser visto como un problema de análisis clúster en el que, en lugar de agrupar individuos, se agrupan las variables, intentando encontrar aquellas que sean similares entre sí. Esta visión considera este problema como un análisis clúster *dual*, en el que en lugar de agrupar filas de la base de datos se agrupan columnas.

El segundo problema es un aspecto del primer problema, y el tercero puede enfocarse como un caso particular del primero.

Existen multitud de aplicaciones del análisis clúster en minería de datos, estadística, análisis de imágenes, bioinformática, etc. De hecho, la clasificación es uno de los objetivos fundamentales de la ciencia y el análisis clúster nos proporciona los medios técnicos para realizarla.

Los algoritmos de análisis clúster se pueden clasificar de acuerdo al tipo de datos, al criterio de agrupamiento o a la teoría que lo fundamenta. El primer criterio se basa en el nivel de incertidumbre que se asume en los datos. Bajo este criterio se diferencian dos grandes grupos:

### Métodos particionales (*crisp clustering*)

Consideran que los objetos solo pueden pertenecer a un grupo. Dentro de esta amplia categoría destacan:

- Los basados en el concepto de distancia (por ejemplo, el algoritmo **K-means** y los algoritmos **jerárquicos**).
- Los que emplean el concepto de densidad (como el **DBSCAN** y el **DPC**).
- También existen métodos basados en distribuciones de probabilidad, que no se analizan aquí. Estos se fundamentan en la estadística, agrupando los objetos de modo que sea más probable que pertenezcan a la misma distribución.

### Métodos borrosos

Consideran que hay superposición de grupos y los objetos pueden pertenecer a más de un grupo. El resultado de estos algoritmos es el **grado de pertenencia** de un objeto a cada clúster. El más difundido es el **Fuzzy C-means**.

---

## 6.2. El problema de clustering

### 6.2.1. El concepto de distancia

**Definición 1 (Distancia):**  
Dado un conjunto `X`, una **distancia** sobre `X` es una aplicación `d: X × X → ℝ` que a cada par de puntos `x, y ∈ X` le asocia un número real `d(x, y)`, que cumple unas propiedades.

| Distancia                     | Definición matemática |
|------------------------------|------------------------|
| Distancia de Minkowski       | `dₚ(x, y) = (∑|xⱼ - yⱼ|ᵖ)^(1/p)` |
| Distancia euclídea (p = 2)   | `d₂(x, y) = (∑(xⱼ - yⱼ)²)^(1/2)` |
| Distancia Manhattan (p = 1)  | `d₁(x, y) = ∑|xⱼ - yⱼ|` |
| Distancia Chebyshev (p → ∞)  | `d∞(x, y) = max |xⱼ - yⱼ|` |
| Distancia de Mahalanobis     | `d_M(x, y) = [(x - y)^T V⁻¹ (x - y)]^(1/2)` (donde `V` es la matriz de varianza-covarianza) |
| Forma cuadrática             | `d_Q(x, y) = [(x - y)^T Q (x - y)]^(1/2)` (donde `Q` es una matriz cuadrada definida positiva) |

En ocasiones se relaja la condición de la desigualdad triangular y se trabaja con las llamadas **funciones de similitud**.

- **Definición 2 (Espacio métrico):** Un espacio métrico es un par `(X, d)`, donde `X` es un conjunto y `d` una distancia definida en `X`.

- **Definición 3 (Norma):** Una norma sobre un conjunto `X` es una aplicación definida.

- **Definición 4 (Espacio normado):** Un espacio normado es un par `(X, ||·||)` en el que `(X, +)` es un espacio vectorial y `||·||` una norma en `X`.

Estas definiciones proporcionan un marco conceptual para describir muchos problemas de análisis clúster.

---

### 6.2.2. Formulación matemática del problema de clustering

**Definición 5 (Partición):**  
Diremos que la colección de subconjuntos `P = {Cₖ}_{k∈K}` es una **partición** de un conjunto `C` si cumple ciertas propiedades (por ejemplo, disjuntos y cubren todo `C`).

El problema de análisis clúster se formula mediante el siguiente **modelo de optimización**:

```plaintext
maximizar J(P)
sujeto a: P ∈ P(C)

Donde J(P) es una función que calcula la calidad de la partición P, en ocasiones recibe el nombre de función de mérito.

El problema de particionar n objetos en K subconjuntos disjuntos es un problema que no se puede abordar con una estrategia de enumeración completa de todas las posibles particiones. El número de estas particiones se calcula mediante los llamados números de Stirling.

El número total de particiones que se puede realizar en un conjunto de n elementos, esto es, el cardinal del conjunto de particiones P(C), viene definido por el llamado número de Bell.

### 6.3. Algoritmo de las K-medias

Los conglomerados deberían tener un cierto grado de homogeneidad interna y heterogeneidad entre los grupos. Históricamente muchos investigadores hicieron operativa esta definición mediante la minimización de la variación dentro del grupo.

El criterio más ampliamente usado para este fin es el de **minimizar la suma de los errores al cuadrado (SSE)**.

El **centroide** es la media aritmética de los objetos y hace el papel del representante del grupo (patrón).

El algoritmo de las K-medias fue desarrollado por **J. MacQueen**. Este algoritmo puede ser considerado como un procedimiento heurístico para resolver el problema de optimización.

#### Pasos del algoritmo:

- **Paso 0 (Inicialización)**: Se eligen K individuos (registros, filas de la matriz de datos) como centroides.
- **Paso 1 (Agrupación)**: Se asigna cada dato al centroide más cercano respecto a la distancia euclídea.
- **Paso 2 (Actualización de centroides)**: Se actualiza el centroide de cada nuevo grupo.
- **Paso 3 (Criterio de paro)**: Si algún centroide ha cambiado, se repite el procedimiento. En otro caso, se detiene el algoritmo.

---

### 6.3.1. Funciones objetivo alternativas

El algoritmo de las K-medias se puede aplicar con distancias diferentes a la distancia euclídea. En dicho caso, esta nueva versión se interpreta como un algoritmo heurístico para resolver el problema (6.10) asociado a dicha distancia.

---

### 6.3.3. Consideraciones importantes

#### Óptimos locales

Uno de los problemas más importantes en la resolución de los problemas de optimización es la existencia de los llamados **óptimos locales**. Estos puntos son los mejores candidatos relativos a un subconjunto próximo de soluciones factibles, de modo que pequeños cambios de las variables de decisión no consiguen mejorar la función objetivo.

El análisis clúster también exhibe esta problemática, ya que se formula como un problema de optimización (discreta). El algoritmo de las K-medias acaba convergiendo a mínimos locales.

- **Definición 6 (Bola abierta)**: Dado un espacio métrico (S,d), llamaremos bola abierta de centro x y radio ε al conjunto de puntos...
- **Definición 7 (Mínimo local)**: Diremos que x es un mínimo local del problema...

Para evitar los óptimos locales, algunos autores sugieren **realizar varias veces el algoritmo** de las K-medias y elegir aquella solución que sea mejor en términos de SSE.

El número de óptimos locales para un conjunto de datos de tamaño moderado puede alcanzar las centenas, por lo que **un número pequeño de reinicializaciones no garantiza encontrar el óptimo global**.

No obstante, se ha demostrado que el algoritmo de las K-medias usualmente exhibe buenas propiedades de reconstrucción de los clústeres.

El algoritmo de las K-medias puede ser visto como un **algoritmo heurístico voraz**, en el que en cada iteración se hace una búsqueda en el entorno de la solución actual. Este tipo de algoritmos también finaliza en mínimos locales.

---

#### Métodos de inicialización del algoritmo de las K-medias

La elección de los valores iniciales del algoritmo es **crucial** para evitar los numerosos óptimos locales del análisis clúster. Se han propuesto numerosas técnicas:

- Algunos métodos se basan en la **densidad** (número de datos que distan menos de una distancia d respecto a un determinado dato). Se eligen puntos con máxima densidad y dispersión entre ellos.
- Otros algoritmos son los de tipo **bootstrap**, que se basan en muestreos sobre la base de datos.

---

#### Métodos para estimar el hiperparámetro K

Uno de los problemas más complejos e importantes del análisis clúster es determinar el número de conglomerados **K**.

El método que emplearemos se basa en el llamado **Bayesian Information Criterion (BIC)**, que compara el ajuste de diferentes modelos penalizando la complejidad (número de parámetros).

- El BIC consta de dos sumandos: uno asociado a la variabilidad dentro de los grupos, y otro que penaliza el número de parámetros.
- Se toma como **K** el valor que **minimiza el BIC**.

**Pasos:**

1. **Etapa 1**: Calcular BIC(K) mientras se cumpla BIC(K+1) < BIC(K). Denotar por K este último valor que cumple BIC(K+1) ≥ BIC(K).
2. **Etapa 2**: Calcular el **cociente de cambio**.
3. **Etapa 3 (Elección del número de clústeres)**: Sea K₁ y K₂ los números de clústeres donde se alcanza el mayor cociente de cambio.

---

#### Detección de observaciones influyentes en análisis clúster

El análisis clúster puede estar fuertemente influido por **observaciones influyentes** que poseen valores extremos. Estas pueden conformar su propio grupo.

- En algunos problemas, pueden representar **incidentes o intrusiones**, por lo que es importante detectarlas.
- El método empleado es la técnica de **jackknife**.

---

### 6.4. Fuzzy C-means (FCM)

En este enfoque, las variables representan el **grado de pertenencia** de un individuo a cada clúster, tomando valores en el intervalo \[0, 1\].

- Valor 1: certeza de pertenencia.
- Valor 0: certeza de no pertenencia.
- Un individuo pertenece a todos los grupos en distinto grado, determinado por los valores wᵢₖ.

Este problema se convierte en uno de **optimización no lineal continua**, con algoritmos basados en el gradiente.

El hiperparámetro **m** controla el grado de solapamiento entre los clústeres:

- Si los datos están muy dispersos, **valores altos de m** modelan esta situación.
- Un valor común es **m = 2**.
- Para reducir solapamiento, se puede disminuir **m**.

#### Pasos:

1. **Paso 0 (Inicialización)**: Elegir una matriz de pertenencia inicial.
2. **Paso 1 (Actualización de centroides)**: Calcular la nueva matriz de centroides.
3. **Paso 2 (Actualización de los pesos)**.
4. **Paso 3 (Criterio de paro)**.


# Otros algoritmos de aprendizaje no supervisado

### 7.1. Algoritmos jerárquicos

El algoritmo de las K-medias representa a los métodos **clusters particionales**, que buscan una partición directa del conjunto de datos optimizando un criterio. Los **algoritmos jerárquicos** son una alternativa basada también en el concepto de distancia, con la particularidad de que permiten establecer una jerarquía entre los grupos. Esto permite al usuario definir el **nivel de granularidad** y determinar la partición final.

Existen dos enfoques jerárquicos:

- **Aglomerativos**: Cada objeto comienza como su propio grupo y los grupos se van uniendo.
- **Divisivos**: Se parte de un solo grupo y se van dividiendo iterativamente.

#### Complejidad computacional

- **Aglomerativos**: Tienen un coste de `O(n³)`, por lo que son viables solo con tamaños de datos pequeños.
- **Divisivos**: Requieren búsqueda exhaustiva con complejidad exponencial `O(2ⁿ)`, por lo que son prohibitivos incluso para bases pequeñas.

Dado esto, se suele trabajar con los métodos **aglomerativos**.

---

#### Funcionamiento del algoritmo aglomerativo

Se trata de un procedimiento iterativo:

1. **Inicialmente**, cada objeto es un cluster individual.
2. En cada iteración, se agrupan los **dos clusters más cercanos** de acuerdo a una **distancia intercluster** `d(Cₖ, Cₛ)`.
3. El algoritmo termina cuando todos los objetos están agrupados en un único cluster.

> Solo se necesita la **matriz de distancias**, no los datos originales.

El resultado es un **dendograma**, un árbol jerárquico que muestra las uniones entre grupos:

- El eje Y muestra la **distancia entre clusters**.
- Las conexiones indican qué grupos se unieron y con qué distancia.

Un **corte horizontal** en el dendograma define la **partición final** en grupos disjuntos.

---

#### Métodos para calcular la distancia entre clusters

- **Vecino más próximo** (*Single linkage*)
- **Vecino más alejado** (*Complete linkage*)
- **Distancia media** (*Average linkage*)
- **Distancia entre centroides** (*Centroid linkage*)
- **Mínima varianza** (*Ward's method*)

---

#### Pasos del algoritmo jerárquico aglomerativo

1. **Paso 0 (Inicialización)**: Asignar cada objeto a un cluster individual. El número inicial de clusters es n.
2. **Paso 1 (Agrupación)**: Encontrar los dos clusters más cercanos según `d(Cₖ, Cₛ)` y unirlos.
3. **Paso 2 (Criterio de paro)**: Repetir el paso 1 hasta que se alcance el número deseado de clusters.

---

### 7.2. Algoritmos basados en el concepto de densidad

La idea clave es que los clusters se encuentran en **zonas de alta densidad de datos**, mientras que las regiones de baja densidad los separan.

Dos algoritmos destacados en este enfoque son:

- **DBSCAN**
- **DPC**

---

### 7.2.1. DBSCAN

**DBSCAN** fue introducido en [EKSX96] con el objetivo de:

- Detectar **clusters con formas arbitrarias**
- Ser **eficiente en grandes bases de datos**

Requiere solo **dos hiperparámetros** y existen técnicas para ajustarlos adecuadamente.

Dado un conjunto de datos \( X = \{x_i\}_{i=1}^n \), y un parámetro \( \varepsilon \), se define la **densidad** de un punto \( x_i \) como:

\[
p = |B(x_i, \varepsilon) \cap X|
\]

donde \( B(x_i, \varepsilon) \) es la **bola abierta** centrada en \( x_i \) y de radio \( \varepsilon \). El cardinal de este conjunto representa la **densidad local**.

---

#### Clasificación de puntos en DBSCAN

- Un punto \( x_i \) es un **punto núcleo** si su densidad \( \geq \text{minPts} \). Los puntos en su entorno \( B(x_i) \cap X \) son **directamente alcanzables** desde él.
- Un punto \( x_j \) es **alcanzable** desde \( x_i \) si existe una secuencia de puntos núcleo \( q_1, ..., q_m \) tal que:
  - \( q_1 = x_i \), \( q_m = x_j \)
  - Todos los \( q_k \) son puntos núcleo
  - \( q_{k+1} \) es directamente alcanzable desde \( q_k \)
- Un punto \( x_r \) es **ruido** si no es alcanzable desde ningún punto núcleo.

**Observación**: La relación de alcanzabilidad **no es simétrica**, porque solo se puede alcanzar directamente desde **puntos núcleo**.


densidad.PNG

### Definición 8: Densamente conectados

Dos puntos \( x_i \) y \( x_j \) están **conectados densamente** si existe un punto \( x \) tal que tanto \( x_i \) como \( x_j \) son **alcanzables directamente** desde \( x \).

---

### DBSCAN – Pasos del algoritmo

- **Paso 0 (Inicialización)**:
  - Elegir los parámetros \( \varepsilon \) y `minPts`.
  - Calcular la densidad de cada punto \( i \) usando la ecuación (7.1).
  - Inicializar el conjunto de **puntos núcleo** \( X_N \).

- **Paso 1 (Expansión del cluster)**:
  - Para todo \( p \in X_N \subseteq X_e \):
    - Tomar \( X_e = X_e \setminus \{p\} \)
    - Inicializar un nuevo cluster \( C = B(p) \cap X \)
    - Mientras \( C \nsubseteq X_e \):
      - Tomar \( q \in C \cap X_e \)
      - Hacer \( X_e = X_e \setminus \{q\} \)
      - Si \( q \in X_N \), actualizar \( C = C \cup (B(q) \cap X) \)

- **Paso 2 (Etiquetado de outliers)**:
  - Asignar la etiqueta de **outlier** a los datos no etiquetados \( X_e \)

---

### Ventajas e inconvenientes de DBSCAN

**Ventajas**:

- No requiere especificar el número de clusters \( K \).
- Capaz de detectar **clusters con formas arbitrarias**.
- Insensible a **outliers**.
- Solo requiere **dos parámetros**.
- Capaz de **detectar ruido**.

**Inconvenientes**:

- El orden de los datos **afecta al agrupamiento** de puntos no núcleo y no ruido.
- **Maldición de la dimensionalidad**: en espacios de alta dimensión, la distancia pierde capacidad discriminativa.
- DBSCAN **no agrupa bien clusters con densidades muy dispares**.

---

### 7.2.2. Algoritmo basado en picos de densidad (DPC)

Este algoritmo se basa en dos hipótesis:

- **Hipótesis 1**: Los centros de los clusters están rodeados de puntos con **menor densidad**.
- **Hipótesis 2**: Los centros de los clusters están a una **distancia grande** de otros puntos con mayor densidad.

DPC realiza dos fases:

1. **Localiza los centros de los clusters**
2. **Asigna los puntos restantes** al mismo cluster que su vecino más cercano de mayor densidad.

> Puede detectar clusters **no convexos**, y es eficiente en grandes conjuntos de datos.

---

#### Cálculo de la densidad

- **Bases de datos grandes**: número de vecinos a menos de \( d_c \).
- **Bases de datos pequeñas**: uso de **núcleos gaussianos**.

---

#### Pasos del algoritmo DPC

1. **Inicialización**: Elegir parámetro \( d_c \)
2. **Cálculo de distancias** \( d_{ij} \)
3. **Cálculo de densidades** \( \rho_i \)
4. **Cálculo de distancia mínima a un punto de mayor densidad** \( \delta_i \)
5. **Gráfico de decisión**: seleccionar manualmente los centros
6. **Asignación**: asignar cada punto al mismo cluster que su vecino más cercano de mayor densidad

---

## 7.3. Algoritmos K-means basados en núcleos

### 7.3.1. Motivación

El algoritmo K-means funciona bien con clusters **linealmente separables**, donde existe un hiperplano que divide los grupos.

Pero cuando los datos **no son separables linealmente** (por ejemplo, clusters en forma de anillo), K-means falla.

---

### Solución: Proyección al espacio de características

El **K-means con núcleos** proyecta los datos a un **espacio de características** donde los grupos sí sean linealmente separables.

Este nuevo espacio:

- Tiene un **producto escalar**
- Puede tener **dimensión infinita** (espacio de funciones)

---

### Espacios RKHS y núcleos

Se utilizan los llamados **espacios de Hilbert con núcleo reproductor (RKHS)**, definidos por una función \( K(x, y) \), llamada **núcleo de Mercer**. El espacio se denota como \( \mathcal{H}_K \).

---

## Reducción de dimensionalidad: Análisis de Componentes Principales (PCA)

PCA transforma los datos a un nuevo sistema de coordenadas donde:

- Las nuevas variables (**componentes principales**) son combinaciones lineales de las originales.
- Se ordenan según la **varianza explicada**.

---

### Aplicaciones del PCA

- **Reducción de la dimensionalidad**
- **Eliminación de ruido**
- **Visualización** de datos multidimensionales
- **Compresión** de datos

---

### Pasos para calcular PCA

1. **Estandarización** de variables
2. **Cálculo de la matriz de covarianzas**
3. **Descomposición en valores propios**
4. **Ordenación de los vectores propios**
5. **Selección de componentes principales**

---

### Ventajas del PCA

- Fácil de implementar
- Mejora el rendimiento de otros algoritmos
- Reduce riesgo de **sobreajuste**
- Reduce la dimensionalidad eliminando ruido

### Inconvenientes del PCA

- **Poca interpretabilidad** de los componentes
- **Compromiso** entre pérdida de información y reducción de dimensionalidad
