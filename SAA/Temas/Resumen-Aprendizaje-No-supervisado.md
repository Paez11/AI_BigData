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
```

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

DBSCAN fue introducido con el objetivo de poder descubrir **clusters con forma arbitraria** y, además, poseer una buena eficiencia en grandes bases de datos. Este algoritmo se basa en el concepto de **densidad** y solo requiere **dos hiperparámetros** de entrada, existiendo técnicas para determinar los valores apropiados.

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


![densidad](https://github.com/user-attachments/assets/602fa5e3-ccaf-41d3-b3f2-bf2233e7e9b5)

**Definición 8: Densamente conectados**

Dos puntos \(x_i\) y \(x_j\) están conectados densamente si existe un punto \(x\) de modo que tanto \(x_i\) como \(x_j\) son alcanzables directamente desde \(x\).

---

### DBSCAN – Pasos del algoritmo

- **Paso 0 (Inicialización):**  
  Elegir los parámetros \(\varepsilon\) y `minPts`.  
  – **Cálculo de las densidades:** Calcular la densidad de cada punto \(i\) empleando la ecuación (7.1).  
  – **Inicialización de conjuntos:** Inicializar el conjunto de puntos núcleo.

- **Paso 1:**  
  Para todo \(p \in X_N \subseteq X_e\), hacer:  
  Tomar \(X_e = X_e \setminus \{p\}\).  
  Inicializa un nuevo cluster como \(C = B(p) \cap X\).  
  While \(C \nsubseteq X_e\):  
  Tomar un \(q \in C \cap X_e\), haz \(X_e = X_e \setminus \{q\}\).  
  Si \(q \in X_N\), entonces \(C = C \cup (B(q) \cap X)\).

- **Paso 2:**  
  Asigna a los datos no etiquetados \(X_e\) la etiqueta de *outlier*.

---

### Ventajas e inconvenientes de DBSCAN

**Ventajas:**

- DBSCAN no necesita que el modelador le indique el número de clusters \(K\) a formar, a diferencia de K-means y FCM donde sí es necesario.
- A diferencia de K-means, puede encontrar clusters no esféricos, de formas arbitrarias.
- Como incorpora específicamente el concepto de *outliers*, es insensible a los mismos.
- DBSCAN requiere solamente dos parámetros.
- El orden de los datos en la base de datos afecta al agrupamiento de los puntos no núcleo y no ruido.

**Inconvenientes:**

- Cuando aumenta el número de dimensiones de los datos \(x_i\), la variabilidad de la distancia disminuye exponencialmente con el número de dimensiones, haciendo que la distancia se vuelva menos discriminativa. Este efecto se conoce con el nombre de la **maldición de la dimensionalidad**.
- DBSCAN no puede agrupar bien grupos con densidades muy dispares, ya que en esos casos no se pueden ajustar correctamente los parámetros \(\varepsilon\) y `minPts`.

---

### 7.2.2. Algoritmo basado en picos de densidad (DPC)

Este algoritmo considera que los centros de los clusters tienen mayor densidad que sus vecinos, y también que están a una distancia relativamente grande de cualquier otro punto con mayor densidad. En una primera etapa, este método localiza los centros de los clusters, y en una segunda usa una estructura de entornos para asignar el cluster a los puntos restantes. El DPC puede detectar clusters con formas no convexas.

1. El algoritmo es simple y eficiente.
2. El DPC es adecuado para el análisis *cluster* para gran cantidad de datos porque los objetos se asignan a los clusters en una sola iteración, basándose en asignar el mismo cluster que su vecino más cercano con mayor densidad.

---

#### Hipótesis básicas del DPC

- **Hipótesis 1:** Los centros de los clusters están rodeados de vecinos con menor densidad.
- **Hipótesis 2:** Los centros de los clusters están a una distancia relativamente grande de otros puntos con mayor densidad que ellos.

La formulación matemática de estas dos hipótesis requiere la definición de dos magnitudes para cada objeto \(i\) a ser agrupado:

1. Su densidad \(\rho_i\)
2. Su distancia \(\delta_i\)

---

#### Cálculo de la densidad \(\rho_i\)

- **Para bases de datos grandes:** se mide como el número de puntos vecinos de \(i\) que se encuentran a una distancia inferior a \(d_c\) unidades.
- **Para bases de datos de tamaño moderado:** se calcula a partir de funciones conocidas con el nombre de **núcleos gaussianos**.

---

Una vez obtenidos \(\rho_i\) y \(\delta_i\), se construye un **gráfico de decisión** (también denominado *grafo de decisión*), con el fin de seleccionar los centros, que serán puntos más separados del resto del gráfico, ya que tienen una densidad mayor que sus vecinos y también están separados de otros candidatos.  
> El procedimiento requiere la intervención humana para seleccionar los centros manualmente.

---

### Pasos del algoritmo DPC

- **Paso 0 (Inicialización):** Elegir el parámetro de distancia de corte \(d_c\).
- **Paso 1 (Cálculo de distancias):** Calcular la matriz de distancias \(d_{ij}\).
- **Paso 2 (Cálculo de densidades):** Calcular \(\rho_i\) para cada objeto \(i\) usando la fórmula correspondiente.
- **Paso 3 (Distancia mínima a puntos de mayor densidad):** Calcular \(\delta_i\) para cada objeto \(i\).
- **Paso 4 (Gráfico de decisión):** Dibujar el grafo de decisión y seleccionar manualmente los centros de los clusters.
- **Paso 5 (Asignación):** Asignar los objetos restantes al mismo cluster que su vecino más cercano de mayor densidad.

![densidad2](https://github.com/user-attachments/assets/3b0f08e5-f489-414e-926a-4a9a02a0c11e)

---

## 7.3. Algoritmos K-means basados en núcleos

### 7.3.1. Motivación

El algoritmo K-means es adecuado para identificar grupos que están **separados linealmente**. En esta situación, existe un hiperplano (en el caso de datos bidimensionales, se trata de una recta) que los separa.

Si los datos tienen una distribución como la mostrada en la parte derecha de la figura 7.6, el algoritmo K-means no sería capaz de identificar los dos grupos. Cuando se produce esta disposición geométrica, se dice que los datos **no pueden ser separados linealmente**, es decir, no se puede dibujar una recta que deje a un lado los cuadrados y al otro los círculos.

---

### Solución: Proyección al espacio de características

El algoritmo K-means con núcleos busca resolver esta problemática **proyectando los datos a un espacio donde sí estén separados linealmente**, y luego aplica K-means en dicho espacio. Este espacio se denomina **espacio de características**.

En este espacio:

- Deben existir hiperplanos → se requiere un producto escalar.
- Es distinto del espacio euclídeo original.
- Puede tener dimensión infinita → espacio de funciones.

Los **espacios vectoriales de funciones**, en lugar de tener puntos con \(n\) componentes, tienen funciones. Estos espacios con producto escalar son **espacios de Hilbert**.

---

### Núcleos y espacios RKHS

Los llamados **espacios de Hilbert con núcleo reproductor (RKHS)** son los adecuados para trabajar.  
Están completamente definidos por funciones \(K(x, y)\), denominadas **núcleos de Mercer**, y el espacio asociado se denota por \(\mathcal{H}_K\).

---

## Reducción de la dimensionalidad mediante Análisis de Componentes Principales (PCA)

Cada transformación se denomina **componente principal**, y los nuevos valores en columna \(Z = XQ\) que toman los datos mediante esta transformación se denominan **scores**.

La cuestión esencial es saber cómo calcular los coeficientes \(\varphi_{ij}\).  
Una elección adecuada es aquella que preserva la **máxima varianza** de las variables originales.

---

### Aplicaciones del PCA

El algoritmo PCA puede utilizarse:

- Por sí solo.
- Como técnica de **limpieza o preprocesamiento de datos**, antes de aplicar otro algoritmo de aprendizaje automático.

**Usos comunes:**

1. Reducción de la dimensionalidad del problema.
2. Eliminación de ruido de los datos.
3. Visualización de datos multidimensionales.
4. Compresión de información.

---

### ¿Cómo se calcula el PCA?

Mediante **descomposición de valores propios** de la matriz de varianza-covarianza.

**Pasos:**

1. Estandarización de las variables.
2. Cálculo de la matriz de varianza-covarianza.
3. Calcular la **descomposición en valores propios** de dicha matriz.
4. Ordenar los vectores propios.
5. Seleccionar el número de componentes principales.

---

### Ventajas del PCA

- Fácil de realizar.
- Acelera algoritmos de aprendizaje automático.
- Palía problemas de alta dimensionalidad.
- Elimina ruido de los datos.
- Reduce la dimensión del conjunto de entrenamiento → evita el sobreajuste.

---

### Desventajas del PCA

- Baja interpretabilidad de los componentes principales.
- Existe un equilibrio entre **la pérdida de información** y la reducción de la dimensionalidad.
