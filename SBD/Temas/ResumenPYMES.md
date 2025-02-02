# Plan de Digitalización de las PYMEs en España 2021-2025

## Introducción
El **Plan de Digitalización de las PYMEs 2021-2025** forma parte del *Plan de Recuperación, Transformación y Resiliencia* del Gobierno de España. Con una inversión total de **4.656 millones de euros**, busca acelerar la digitalización de **1.500.000 PYMEs y autónomos**, fortaleciendo su competitividad en un entorno global digital.

---

## Objetivos del Plan
El plan tiene como finalidad:
- **Impulsar el uso del Big Data** para el análisis de tendencias y comportamiento del consumidor.
- **Optimizar procesos internos** como la gestión de recursos y la cadena de suministro.
- **Mejorar estrategias de marketing** en redes sociales mediante análisis de datos.
- **Analizar el rendimiento** y aceptación de productos en diferentes mercados.

---

## Principales Medidas Relacionadas con Big Data

### **1. Digital Toolkit (3.000 millones de euros)**
Subsidios para integrar herramientas digitales como ERP, CRM y comercio electrónico, con impacto en:
- **Marketing especializado:** segmentación y ventas cruzadas.
- **Fidelización de clientes:** análisis de comportamiento en redes.
- **Diseño de productos y procesos** basados en datos.

### **2. Agentes del Cambio (300 millones de euros)**
- Profesionales especializados en Big Data para ayudar a PYMEs en la transformación digital.

### **3. Programa de Innovación Disruptiva (439 millones de euros)**
- Implementación de **Big Data, IA, computación en la nube e IoT**.

### **4. Formación de Expertos en Transformación Digital (100 millones de euros)**
- Capacitación de empleados en **análisis de datos y toma de decisiones** basadas en Big Data.

### **5. Activa Industria 4.0**
- Digitalización del sector industrial con enfoque en **Big Data y automatización**.

---

## Beneficios del Big Data para las PYMEs
- **Automatización de procesos** y mejora de productos.
- **Estrategias de marketing personalizadas** basadas en análisis de datos.
- **Optimización de la cadena de valor** y relación con proveedores y clientes.

---

## Business Case y Big Data
Un **Business Case** justifica y evalúa proyectos estratégicos con base en:
1. **Perspectiva emocional** (*motivación personal*).
2. **Perspectiva racional** (*análisis basado en datos y riesgos*).

El Big Data permite fundamentar decisiones empresariales con:
- **Análisis predictivo** y tendencias de mercado.
- **Medición de beneficios** económicos y estratégicos.
- **Gestión de riesgos** con modelos de simulación.
- **Optimización del ROI y TIR** (retorno de inversión y tasa interna de retorno).

---

## Estructura del Business Case (Metodología PRINCE2)
### 1. **Portada**
   - Título, autores, fecha y revisiones.

### 2. **Objetivos y Alcance**
   - Definir qué se busca lograr y qué incluye/excluye el proyecto.

### 3. **Resumen Ejecutivo**
   - Problema a resolver, beneficios esperados, ROI y recursos necesarios.

### 4. **Motivación**
   - Justificación alineada con la estrategia empresarial.

### 5. **Opciones de Negocio**
   - Evaluación de alternativas:
     - No hacer nada.
     - Implementación mínima.
     - Implementación completa.

### 6. **Beneficios Esperados**
   - Económicos, operativos y estratégicos con métricas específicas.

### 7. **Desventajas Esperadas**
   - Posible resistencia al cambio y ajustes en procesos.

### 8. **Calendario**
   - Hitos, duración y amortización.

### 9. **Costes**
   - Inversión inicial y costos operativos.

### 10. **Valoración de la Inversión**
   - Uso de indicadores financieros:
     - **VAN (Valor Actual Neto)**
     identifica si un proyecto aporta valor al descontar flujos de caja futuros
     - **ROI (Retorno de Inversión)**
     calcula el retorno por cada euro invertido, fundamentado en datos históricos y
     proyecciones futuras.
     - **TIR (Tasa Interna de Retorno)**
     valida si el retorno supera la tasa mínima esperada.

### 11. **Riesgos**
   - Identificación y mitigación con análisis de datos.

---

## Cálculo del Valor de la Inversión
### **Ejemplo de VAN**
Se evalúa si un proyecto genera valor:

#### Fórmula:

![van](https://github.com/user-attachments/assets/97569cab-e981-45d9-b162-1e4b2a4aa490)

Donde:
- **I₀** = inversión inicial.
- **Fₜ** = flujo de caja en el tiempo t.
- **k** = tasa de descuento.

Si el **VAN > 0**, el proyecto es rentable.

---

### **Ejemplo de ROI**
Se mide la eficiencia de la inversión:

#### Fórmula:

![roi](https://github.com/user-attachments/assets/cea96149-3f63-4926-a6dd-577b2ac35f61)

Si el **ROI es alto**, la inversión es atractiva.

---

### **Ejemplo de TIR en Python**
La **Tasa Interna de Retorno (TIR)** mide la rentabilidad anualizada.

Es un indicador de rentabilidad de proyectos o inversiones, de manera que cuanto mayor
sea el TIR, mejor es la rentabilidad. Representa el porcentaje de rendimiento que se
espera obtener sobre el dinero invertido, considerando el valor del dinero en el tiempo y
los flujos de efectivo esperados del proyecto.

![tir](https://github.com/user-attachments/assets/4dcaf125-7630-433d-8edc-c8305a4006e3)



Código en Python:
```python
import numpy_financial as npf

flujos = [-25000, -2000, 12500, 27000]  
tir = round(npf.irr(flujos), 5)  
print(f"TIR: {tir * 100} %")
