# Resumen Extendido: Modelos de Inteligencia Artificial

Este documento, basado en contenidos del curso de especialización en IA y Big Data, abarca conceptos fundamentales sobre agentes racionales, entornos de trabajo, sistemas de resolución de problemas, modelos de IA, lógica difusa, entre otros.

---

## **Capítulo 2: Utilización de los modelos de la Inteligencia Artificial**

### **2.1. Agentes Racionales**

Un agente racional es aquel que realiza acciones correctas basadas en un objetivo definido. Los elementos esenciales de un agente racional son:
1. **Medida de rendimiento:** Define lo que es correcto (objetivo).
2. **Conocimiento previo:** Información inicial del entorno.
3. **Actuadores:** Herramientas que el agente usa para interactuar.
4. **Sensores:** Datos que el agente percibe.

#### **Ejemplo: Robot aspirador**
- **Objetivo:** Maximizar la superficie limpia.
- **Entorno:** Suelos, muebles, animales, etc.
- **Actuadores:** Dirección, aceleración.
- **Sensores:** Cámaras, infrarrojos, batería.

El comportamiento de un agente se define mediante una **función agente**, implementada como un programa.

---

### **2.2. Entornos de Trabajo**

Los entornos de trabajo de un agente se clasifican según las siguientes dimensiones:
- **Observabilidad:**
  - **Completa:** El agente tiene acceso al estado completo del entorno.
  - **Parcial:** Solo percibe una parte del entorno.
- **Número de agentes:**
  - **Individual:** Un solo agente opera.
  - **Multi-agente:** Varios agentes interactúan entre sí.
- **Determinismo:**
  - **Determinista:** El estado siguiente está definido por el actual y las acciones.
  - **No determinista:** Existen variables no controladas por el agente.
- **Episodicidad:**
  - **Episódico:** Cada acción es independiente.
  - **Secuencial:** Una acción afecta decisiones futuras.
- **Dinamismo:**
  - **Estático:** El entorno no cambia mientras el agente decide.
  - **Dinámico:** El entorno evoluciona durante el proceso.
- **Continuidad:**
  - **Discreto:** Estados y acciones limitados.
  - **Continuo:** Cambios en tiempo o estados no limitados.

---

### **2.3. Sistemas de Resolución de Problemas**

#### **2.3.1. Tipos de Problemas**
1. **Búsqueda de estado:** Encontrar un estado objetivo que cumpla restricciones.
2. **Búsqueda de secuencia de acciones:** Identificar la ruta óptima hacia un objetivo.
3. **Problemas en línea:** El agente construye el modelo del espacio de estados mientras actúa.
4. **Problemas fuera de línea:** Se conoce todo el espacio de estados desde el inicio.
5. **Problemas de contingencia:** Incertidumbre en los efectos de las acciones.

#### **2.3.2. Programas Agente**
Se describen varios tipos de programas agente, cada uno con características y aplicaciones específicas:

1. **Agente dirigido por tablas:**
   - Construye una tabla para cada posible percepción y su acción correspondiente.
   - Práctico solo en entornos pequeños debido a limitaciones de memoria y tiempo.

2. **Agente reactivo simple:**
   - Toma decisiones basadas únicamente en la percepción actual.
   - Ejemplo: Robot aspirador que detecta si la superficie está sucia.

3. **Agente reactivo basado en modelos:**
   - Mantiene un estado interno actualizado basado en percepciones pasadas.
   - Utiliza modelos de transición y sensor para simular cómo evoluciona el entorno.

4. **Agente basado en objetivos:**
   - Decide acciones considerando un objetivo final deseado.
   - Más flexible que los reactivos, adecuado para entornos dinámicos.

5. **Agente basado en utilidad:**
   - Maximiza la utilidad al comparar la calidad de diferentes estados del mundo.
   - Útil para resolver conflictos entre objetivos múltiples.

6. **Agentes que aprenden:**
   - Incorporan mecanismos de aprendizaje automático para mejorar su desempeño con el tiempo.

---

### **2.4. Modelos de Sistemas de IA**

#### **Planificación Automática**
La planificación busca una secuencia de acciones para alcanzar un objetivo en entornos deterministas y observables. Los pasos incluyen:
1. **Planteamiento del objetivo.**
2. **Formulación del problema.**
3. **Búsqueda de soluciones.**
4. **Ejecución.**

Se utilizan lenguajes como PDDL (Planning Domain Definition Language) para describir dominios y problemas. Ejemplo:
- **Acción:** `Volar(a, origen, destino)`
  - **Precondición:** `En(a, origen)`
  - **Efecto:** `¬En(a, origen) ∧ En(a, destino)`

#### **Sistemas de Razonamiento Impreciso**
Basados en **lógica difusa**, permiten representar incertidumbre con valores en el rango [0, 1].

**Pasos del método de Mamdani:**
1. **Modelado:** Definir variables de entrada y salida con conjuntos difusos.
2. **Fuzzificación:** Calcular grados de pertenencia.
3. **Inferencia:** Aplicar reglas tipo `SI-ENTONCES` con conjuntos difusos.
4. **Defuzzificación:** Convertir los resultados difusos a valores discretos.

**Ejemplo:** Problema de la propina.
- **Entradas:** Calidad del servicio y comida.
- **Salidas:** Porcentaje de propina.
- **Reglas:**
  - SI calidad de comida es buena O calidad de servicio es increíble, ENTONCES propina es alta.

---

### **Lógica Clásica y Lógica de Primer Orden**

#### **Lógica Clásica**
- Utiliza conectivas lógicas como `¬`, `∧`, `∨`, `⇒`, `⇔`.
- Evalúa proposiciones con valores `verdadero` o `falso`.
- Ejemplo: `(P ∧ Q) ⇒ R`.

#### **Lógica de Primer Orden**
- Extiende la lógica clásica para incluir objetos, relaciones y funciones.
- Ejemplo: `∀x (Ingeniero(x) ⇒ Persona(x))`.

#### **PDDL (Planning Domain Definition Language)**
- Define dominios y problemas mediante predicados y acciones.
- Ejemplo:
  ```pddl
  (:action Volar
    :parameters (?a ?origen ?destino)
    :precondition (and (En ?a ?origen) (Aeropuerto ?origen) (Aeropuerto ?destino))
    :effect (and (not (En ?a ?origen)) (En ?a ?destino)))
