# Resumen Árboles de Decisión

## 4.1. Árboles de Decisión

Los árboles de decisión son una técnica de aprendizaje automático por inducción que permiten identificar conceptos (clases de objetos) a partir de las características de un conjunto de ejemplos que los representan. La información extraída de los mismos queda organizada jerárquicamente en forma de árbol, es decir, en forma de grafo dirigido que consta de nodos y arcos. Los nodos corresponden a una pregunta o a un test que se hace a los ejemplos.  
El árbol de decisión (ver Figura 4.1) se construye a base de ir haciendo preguntas sobre características determinadas a los ejemplos y clasificándolos según la respuesta. Por tanto un árbol de decisión trabaja como un "clasificador".  
Las diferentes opciones de clasificación (respuesta a las preguntas) son excluyentes entre sí, lo que hace que a partir de casos desconocidos y siguiendo el árbol adecuadamente, se llegue a una única conclusión o decisión a tomar.  

### Construcción de un árbol de decisión

La construcción de un árbol de decisión requiere:
1. Un conjunto de ejemplos.  
2. Una representación simbólica del conocimiento (Ejemplos y definición de sus características) a través de atributos y sus valores.  
3. Un algoritmo de aprendizaje (clasificación o regresión).  
4. Un método de evaluación o esquema de valoración.  

Un árbol de decisión tiene un nodo raíz, nodos intermedios y hojas.  
Cualquier nodo intermedio puede ser un nodo raíz de un subárbol. Esto conduce a una definición recursiva de árbol de decisión. Cada nodo intermedio y la raíz tienen asociados separadores que formulan una pregunta o realizan un test acerca de la existencia o no de una característica en cada caso ejemplo.  
El atributo que se selecciona como separador dentro de un nodo debe cumplir el objetivo de que su posición en algún punto del árbol genere un subárbol tan simple como sea posible y dé una concreta clasificación.  
Cuando se construye un árbol de decisión, es necesario tener un medio para determinar tanto los atributos importantes requeridos para la clasificación, como el orden de uso de esos atributos importantes.  

### Algoritmo

El algoritmo general para todo método basado en árboles de decisión sería el siguiente:
1. Se calcula la calidad (criterio de selección de separadores, impureza, ganancia de información, etc.) del nodo (conjunto de ejemplos).  
2. Si un conjunto de ejemplos en un nodo no tiene suficiente calidad, se calcula el mejor atributo separador. Una vez que se obtiene, se añade a la base de reglas, y se utiliza para dividir el conjunto de ejemplos en al menos dos conjuntos nuevos de mayor calidad.  
3. Seguir separando hasta que se cumpla el criterio de parada.  

### Criterios de Selección

- **Índice de Entropía:** se calcula el índice de entropía para cada una de las variables: Si la variable es categórica, se obtiene sumando el índice de entropía de cada una de sus clases. En cambio, si es numérica, previamente se obtiene uno o varios puntos de corte por métodos iterativos. Se elegirá aquella variable que tenga menor índice de entropía.  
- **Índice de Gini:** mide la probabilidad de no sacar dos registros con el mismo valor para la variable objetivo dentro del mismo nodo. Cuando menor es el índice de Gini mayor es la pureza del corte.  

### Criterios de Parada y Poda

Otro de los aspectos más importantes al construir un árbol de decisión es el criterio de parada con el fin de evitar el sobreaprendizaje.  

- **Máximo número de ramas por nodo (Maximum Branch):** número de ramas máximo en que puede dividirse un nodo.  
- **Número mínimo de observaciones por nodo final (Leaf Size):** número mínimo de observaciones que tiene que tener un nodo final para que se construya la regla.  
- **Número mínimo de observaciones para dividir un nodo (Split Size):** número mínimo de observaciones que tiene que tener un nodo para que se pueda cortar por la variable seleccionada.  
- **Variables discriminantes (Discriminant Variables):** no encontrar ninguna variable que sea lo suficientemente discriminante en el nodo es motivo de parada.  

En último lugar es recomendable podar (pruning) el árbol. Consiste en reducirlo, haciéndolo más sencillo dejando sólo los nodos más importantes y a su vez eliminando los redundantes. Para ello, antes de llamar recursivamente al algoritmo para cada nodo, se calcula tanto la tasa de ramificación del conjunto actual como de los subconjuntos.  

## 4.1.1. Importancia de las características

La importancia de cada característica es su contribución relativa a las predicciones del objetivo. Así, una característica con mayor importancia tendrá un mayor impacto en las predicciones.  
Habitualmente este factor se calcula estimando la reducción agregada y normalizada del error de predicción de cada característica para cada división de un árbol.  

4.2. Conjuntos de Modelos

Los modelos individuales de aprendizaje supervisado son capaces de resolver un buen número de problemas de clasificación y regresión, sin embargo, otros muchos de estos problemas no se pueden resolver con un solo modelo.
Uno de los inconvenientes de los modelos individuales es que puede sobreaprender en el caso de hacerse demasiado complejos, Para solucionar este problema aparecen los conjuntos de modelos.
Son colecciones de árboles de decisión múltiples que se combinan para crear un modelo más sólido con un mejor rendimiento predictivo.
Son menos sensibles a los valores atípicos en sus datos de entrenamiento lo cual les ayuda a mitigar el riesgo de sobreajuste y generalizar mejor cuando se los aplica a nuevos datos.
La idea básica es remuestrear los datos y calcular las predicciones sobre el conjunto de datos remuestreados.

- Sesgo: Es la diferencia entre el valor proporcionado por el modelo y el valor real.
- Varianza: Cantidad de variación de la predicción del modelo según los datos que utilicemos se usen para entrenar.

Las técnicas que se pueden utilizar para construir conjuntos de árboles de decisión se basan en los métodos de Bagging/Boosting:

- Bagging (Bootstrap Aggregating): este algoritmo crea cada árbol individual a partir del aprendizaje sobre una muestra aleatoria de los elementos del conjunto de datos de entrenamiento. Por defecto las muestras son tomadas utilizando un ratio del 100%, reduciéndose si es conjunto de datos es muy grande, con reemplazo, esto es, cada miembro del conjunto es entrenado con una muestra diferente del conjunto de entrenamiento. El tamaño es el mismo que el conjunto de entrenamiento original pero no su composición. El resultado final es el promedio de la predicción de cada uno de los miembros del conjunto. Es la estrategia más simple de las tres, pero obtiene unos rendimientos muy buenos sobre otras estrategias más complejas y costosas. 

- RandomForests: sigue una estrategia similar al Bagging pero añadiendo un elemento adicional de aleatoriedad eligiendo para cada árbol un subconjunto de las características del conjunto de entrenamiento. En subespacios aleatorios (random subspaces), cada miembro es entrenado con todos los ejemplos, pero con un subconjunto de los atributos. La dimensión de los subespacios es uno de los parámetros de este algoritmo. De nuevo el resultado es el promedio de los árboles obtenidos. Es uno de los métodos más precisos de todos los métodos de clasificación.

- Boosted Trees (Boosting, Adaboost, Gradient Boosted Trees) en este caso el algoritmo construye secuencialmente un conjunto de árboles de decisión que supone modelos débiles (weak learners). Un modelo débil es cualquier conjunto de aprendizaje que es al menos un poco mejor que la predicción aleatoria (>50%). Posteriormente combina sus salidas de forma aditiva para obtener una predicción final. En cada iteración del algoritmo, cada modelo individual intenta corregir los errores cometidos en la iteración previa mediante la optimización de una función de pérdida.

4.2.1. Árboles Individuales

En las técnicas de Bagging como en las de Random Forests cada árbol individual intenta predecir el campo objetivo utilizando cierto nivel de aleatoriedad, Sin embargo, en los Boosted Trees, 
cada árbol en lugar de predecir el campo objetivo, intenta aprender de los errores cometidos por el modelo anterior ajustando un paso de gradiente para minimizar el error del clasificador anterior.

4.2.2. Predicciones

Los conjuntos se componen de varios árboles. Cada árbol devuelve una predicción diferente dados los datos de entrada. Estas predicciones individuales deben combinarse para obtener una predicción final para el conjunto.

### Boosted Trees
- Las predicciones se agregan de manera aditiva (no promediada).
- **Clasificación:** Se realizan sumas ponderadas para cada clase y se aplican con `softmax` para obtener probabilidades. No se devuelve confianza ni error esperado.
- **Regresión:** Se suman las predicciones de cada árbol multiplicadas por su peso. No se puede calcular el error esperado.

### Bagging y Random Forest
- Las predicciones de los árboles individuales se promedian.  
- Se pueden obtener probabilidades, confianza y error esperado (en regresión).

### Ejemplo de Clasificación
| Árbol  | Verdadero | Falso |
|-------|-----------|-------|
| 1     | 80%       | 20%   |
| 2     | 40%       | 60%   |
| 3     | 60%       | 40%   |
| **Conjunto** | 60% | 40%  |

### Ejemplo de Regresión
| Árbol  | Ventas | Error |
|-------|--------|-------|
| 1     | 200    | 2.40  |
| 2     | 250    | 2.10  |
| 3     | 180    | 1.45  |
| **Conjunto** | 210    | 1.98  |


## 4.2.3. Importancia de las características

Al igual que con los árboles de decisión individuales, se puede obtener una medida de la importancia de una característica en relación con las demás.  
Se calcula tomando una media ponderada de cuánto reduce cada característica el error de predicción del árbol en cada división.  

---

## 4.3. Selección y Optimización de Modelos  

### 4.3.1. Selección de Modelos  

No hay una respuesta fácil a la pregunta de qué modelo produce los mejores resultados.  
- Si se espera que la función de decisión sea muy compleja y se dispone de muchos datos, el **boosting** puede funcionar mejor.  
- Si el conjunto de datos tiene mucho ruido y el sobreajuste es un problema, tanto el **Bagging** como los **Random Forests** pueden ser la mejor opción, ya que el boosting es más vulnerable al ruido en los datos.  
- Si se sospecha que se afronta una función "fácilmente aprendible", el **Bagging** puede funcionar mejor que las otras dos opciones.  

---

### 4.3.2. Hiperparámetros  

- Un **parámetro** puede considerarse interno al modelo y se obtiene después de que el modelo haya aprendido de los datos.  
- Un **hiperparámetro** puede considerarse externo al modelo y es fijado arbitrariamente por el programador.  

---

### 4.3.3. Parametrización  

En los conjuntos de modelos existen diferentes parámetros relevantes.  

- Uno de los más importantes es el **número de árboles de decisión** que conforman el ensemble en los casos del Bagging y del Random Forests.  
  - Por defecto, se recomienda un mínimo de **10** y un máximo de **1.024 árboles**.  
  - Aumentar el número de árboles generalmente mejora los resultados, pero incrementa el tiempo de cálculo.  
  - Mayor cantidad de árboles es útil cuando el conjunto de datos no es muy grande.  

- Se puede fijar un **umbral de crecimiento de un árbol** dentro del conjunto.  
  - Un umbral más bajo simplifica el conjunto y ayuda a evitar el sobreajuste.  
  - También puede reducir el poder de predicción en comparación con conjuntos más profundos.  
  - El número ideal de nodos depende del tamaño del conjunto de datos y del número de características.  
  - Reducir el número de nodos es útil para obtener una comprensión inicial de los patrones de datos básicos.  

- Los siguientes parámetros son propios de los **Boosted Trees**:  
  - **Parada temprana (early stopping):** Intenta encontrar el número óptimo de iteraciones probando los modelos individuales.  
  - **Tasa de aprendizaje (learning rate):** Controla la agresividad del ajuste a los datos.  
    - Los valores válidos están entre **0 y 1**.  
    - Valores más grandes evitan el sobreajuste, pero valores más pequeños (generalmente **0.1 o menos**) suelen funcionar mejor.  

---

### 4.3.4. Optimización de Hiper-parámetros  

La mejor combinación de hiperparámetros se puede encontrar probando diferentes combinaciones y buscando el mejor rendimiento en una prueba de validación cruzada.  

Para realizar esta búsqueda se necesita:  
- Un modelo (**Árbol de Decisión, Random Forests, Boosted Trees**).  
- Un conjunto de combinaciones de parámetros a explorar.  
- Un método de búsqueda o muestreo de candidatos.  
- Un esquema de validación cruzada.  
- Una función de puntuación.  

---

#### Métodos de búsqueda de hiperparámetros:  

- **Búsqueda exhaustiva (GridSearch):**  
  - Genera exhaustivamente candidatos a partir de una cuadrícula de conjuntos de valores especificados para cada hiperparámetro del modelo.  
  - Evalúa todas las combinaciones generadas y selecciona la mejor combinación.  

- **Búsqueda aleatoria (RandomSearch):**  
  - Muestrea un número determinado de candidatos de un espacio de parámetros con una distribución específica.  
  - Cada prueba se realiza sobre una combinación posible de hiperparámetros entre los especificados inicialmente.  
  - Permite una exploración más rápida de espacios amplios de parámetros.  
  - Es necesario especificar el número de combinaciones candidatas a muestrear.  
  - Para cada parámetro, se puede definir una distribución sobre posibles valores o una lista de opciones.  

Es importante tener en cuenta que un pequeño subconjunto de hiperparámetros puede tener un gran impacto en el rendimiento predictivo o de cálculo del modelo.  
