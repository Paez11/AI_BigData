# Árboles de Decisión

## Estructura de un Árbol de Decisión
1. **Nodo Raíz:**  
   - Punto de partida del árbol. Representa la totalidad del conjunto de datos.  
   - Se divide basado en la mayor ganancia de información (clasificación) o mayor reducción de la varianza (regresión).

2. **Nodos Internos:**  
   - Corresponden a características del conjunto de datos y se dividen según sus valores posibles.  
   - El criterio de división se basa en qué tan efectivamente clasifica o predice el resultado.

3. **Ramas:**  
   - Representan decisiones o resultados de una división desde un nodo hacia otro nodo o una hoja.

4. **Nodos Hoja o Terminales:**  
   - No se dividen más y proporcionan la predicción final en regresión o clasificación.

## Funcionamiento de un Árbol de Decisión
- **Selección de Atributos:** Se utilizan medidas como índice Gini, entropía o error de clasificación para elegir el atributo que mejor "divide" el conjunto de datos.  
- **Construcción del Árbol:** División recursiva de datos hasta cumplir un criterio de parada o tener datos homogéneos.  
- **Poda del Árbol:** Eliminación de ramas con poco poder predictivo para mejorar la generalización.

## Ventajas de los Árboles de Decisión
- Fácil de entender e interpretar.  
- No requieren suposiciones sobre la distribución de los datos.  
- Manejan datos numéricos y categóricos sin mucho preprocesamiento.

## Desventajas de los Árboles de Decisión
- Riesgo de sobreajuste.  
- Sensibles a pequeñas variaciones en los datos.  
- Problemas con datos desbalanceados.

## Ejemplo de construcción de un árbol de decisión

### Conjunto de datos:
| Outlook   | Humidity | Wind  | Play Tennis |
|-----------|----------|-------|-------------|
| Sunny     | High      | Weak  | No          |
| Sunny     | High      | Strong| No          |
| Overcast  | High      | Weak  | Yes         |
| Rain      | High      | Weak  | Yes         |
| Rain      | Normal    | Weak  | Yes         |
| Rain      | Normal    | Strong| No          |
| Overcast  | Normal    | Strong| Yes         |
| Sunny     | High      | Weak  | No          |
| Sunny     | Normal    | Weak  | Yes         |
| Rain      | Normal    | Weak  | Yes         |
| Sunny     | Normal    | Strong| Yes         |
| Overcast  | High      | Strong| Yes         |
| Overcast  | Normal    | Weak  | Yes         |
| Rain      | High      | Strong| No          |

1. Calcular la entropía del conjunto completo.
2. Calcular la ganancia de información para cada característica.  
3. Elegir la característica con mayor ganancia de información.  
4. Repetir el proceso para cada subconjunto.  
5. Formar nodos hoja o continuar dividiendo.

## Árboles de Decisión para Regresión
- Predicen valores numéricos en lugar de categorías.  
- Utilizan la reducción de varianza para dividir nodos.  
- Pueden usar árboles de modelos que ajustan modelos lineales en cada nodo para relaciones más complejas.

## Criterios de Parada
1. Profundidad máxima del árbol.  
2. Número mínimo de muestras para dividir un nodo.  
3. Número mínimo de muestras en una hoja.  
4. Reducción mínima de impureza requerida para dividir.  
5. Número máximo de características para dividir.  
6. Número máximo de nodos hoja.  
7. Criterio de parada basado en tamaño o profundidad del árbol.  
8. Poda posterior.  
9. Umbral de error.  
10. Insuficiencia de datos.

## Poda de un Árbol
- **Poda Previa:** Limita el crecimiento del árbol durante su construcción.  
- **Poda Posterior:** Construye el árbol completo y luego elimina ramas no significativas.  
- Scikit-Learn permite poda por complejidad de costo (`ccp_alpha`).

## Sesgo y Varianza
- **Sesgo:** Error debido a suposiciones excesivas. Modelos simples tienen alto sesgo (subajuste).  
- **Varianza:** Error debido a la sensibilidad del modelo a pequeñas variaciones. Modelos complejos tienen alta varianza (sobreajuste).  
- **Equilibrio:** Buscar modelos con bajo sesgo y baja varianza.

## Técnicas de Ensamble
- **Bagging:** Reduce la varianza al promediar múltiples modelos.  
- **Random Forest:** Bagging con selección aleatoria de características.  
- **Boosting:** Reduce el sesgo entrenando modelos secuenciales.

## Comparación
| Característica    | Bagging    | Random Forest | Boosting      |
|------------------|------------|---------------|---------------|
| Reduce sobreajuste (varianza) | Sí            | Excelente     | No            |
| Reduce subajuste (sesgo)      | No            | No            | Sí            |
| Sensibilidad al ruido         | Baja          | Baja          | Alta          |
| Computación necesaria         | Baja          | Media         | Alta          |
| Interpretabilidad             | Baja          | Media         | Baja          |

## Conclusión
- Usa Bagging si quieres reducir la varianza y evitar sobreajuste.  
- Usa Random Forest si necesitas robustez frente al ruido y manejo de muchas características.  
- Usa Boosting si buscas precisión máxima aunque pueda haber sobreajuste.