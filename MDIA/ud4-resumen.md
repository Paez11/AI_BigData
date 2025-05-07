# UD4: Sistemas Expertos

Los Sistemas Expertos surgieron en las décadas de los 70 y 80. Se definen como software capaz de simular el proceso de decisión que tomaría un experto humano en un cierto campo para la solución de un problema. Su objetivo principal es ayudar a encontrar la solución óptima a un problema concreto sin tener que recurrir a un experto en la materia.

Un sistema experto es un programa informático que, tras haber sido debidamente entrenado, es capaz de deducir información (**output**) a partir de un conjunto de datos y fuentes de información (**input**). Estos sistemas están diseñados para:

- Tomar decisiones de forma automática como expertos.
- Explicar la decisión que han tomado.
- Potencialmente aprender cuando se les facilita nueva información.

> Para su desarrollo es imprescindible disponer del conocimiento de un especialista en el campo de estudio. Por ello, también se les conoce como **sistemas basados en conocimientos** o **en reglas**.

Son capaces de aplicar de forma autónoma procedimientos de inferencia, utilizando procesos inductivos o deductivos para llegar a una conclusión a partir del análisis de hechos (inputs) y generar outputs.

## Características de los Sistemas Expertos

- **Especialización**: Resuelven problemas en un área concreta como medicina, finanzas o ingeniería.
- **Emulación del pensamiento humano**: Razonan, infieren y deciden como un experto humano.
- **Capacidad de aprendizaje**: Algunos aprenden de nuevos datos o experiencias.
- **Interactividad**: Permiten interacción con usuarios mediante consultas y respuestas.

A diferencia de los sistemas de *Deep Learning* (**Caja Negra**), donde es difícil rastrear el proceso de decisión, un sistema experto se considera una **Caja de Cristal**, ya que puede mostrar los pasos lógicos seguidos.

## Tipos de Sistemas Expertos

- **Basados en Reglas**: Utilizan expresiones del tipo `IF (condición) THEN (acción)`.
  - Ejemplo: Diagnóstico de gripe basado en síntomas.

- **Basados en Árboles de Decisión**: Crean árboles para clasificar datos.
  - Ejemplo: Sistema de apoyo en termografía mamaria.

- **Basados en Casos**: Se basan en soluciones previas para resolver nuevos problemas.
  - Uso: Medicina, ingeniería, abogacía.

- **Basados en Redes Bayesianas**: Usan relaciones de dependencia para determinar probabilidades.
  - Ejemplo: Probabilidad de hierba húmeda por lluvia o rociador.

## Ejemplo Notable

- **DELTA (1981)**: Ayudaba a ingenieros de General Electric a diagnosticar averías en locomotoras diésel-eléctricas. Estaba basado en reglas y desarrollado en LISP.

## Estructura de un Sistema Experto

- **Interfaz de usuario**: Comunicación externa mediante texto o gráficos.
- **Base de conocimiento**: Reglas tipo *SI… ENTONCES*, incluye conocimiento:
  - Procedimental
  - Factual
  - Heurístico
- **Motor de inferencias**: Realiza el razonamiento y toma de decisiones.
- **Sistema de explicación**: Justifica el razonamiento al usuario.
- **Adquisición de conocimiento**: Permite introducir nueva información al sistema.

## Ventajas y Desventajas

**Ventajas:**

- Implementación rápida.
- Manejo de grandes volúmenes de información.
- Decisiones transparentes.

**Desventajas:**

- Difícil cubrir todo un campo del conocimiento.
- No ofrecen soluciones creativas.
- Limitados por la información disponible.

## Tecnologías y Frameworks

- **Lenguajes/Frameworks**: CLIPS, Drools, Jess, Prolog, Expert System Shells, Pyke, OpenCyc.
- **Prolog**: Lenguaje declarativo de los 70, estructura similar al lenguaje natural. Usa `:-` en lugar de *SI...ENTONCES*.

## Mecanismos de Inferencia

- **Razonamiento hacia adelante (Forward Chaining)**:
  - Parte de condiciones conocidas para llegar a consecuencias.
  - Ejemplo: Si (fiebre) Y (pérdida de olfato) → hacer prueba PCR.
  - Usado en LISP.

- **Razonamiento hacia atrás (Backward Chaining)**:
  - Parte de una hipótesis para validar condiciones.
  - Ejemplo: Si (caza ratones) Y (bebe leche) → es un gato.
  - Usado en PROLOG.

## Aplicaciones Actuales

- Recursos Humanos
- Medicina
- Banca
- Mantenimiento industrial
- Control de embalses

**Beneficios:**

- Mejora en la calidad y velocidad de decisiones.
- Reducción de costes.
- Mejora en la consistencia de respuestas.

> Tendencia actual: Combinar reglas con **Machine Learning**.
