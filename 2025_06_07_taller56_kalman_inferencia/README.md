## 🎯 Problema Resuelto

El objetivo es estimar la posición real de un objeto (variable oculta) a partir de observaciones ruidosas. Utilizamos el filtro de Kalman 1D para inferir esa posición basándonos en un modelo secuencial.

---

## 📐 Ecuaciones del Filtro de Kalman

**Predicción:**
- `x̂⁻ = x̂`
- `P⁻ = P + Q`

**Actualización (Corrección):**
- `K = P⁻ / (P⁻ + R)`
- `x̂ = x̂⁻ + K * (z - x̂⁻)`
- `P = (1 - K) * P⁻`

Donde:
- `x̂` es la estimación de la variable oculta
- `P` es la incertidumbre
- `Q` es la varianza del proceso (ruido interno)
- `R` es la varianza de la medición (ruido externo)
- `K` es la ganancia de Kalman

---

## 📊 Resultados

Se genera una señal real, una observada (con ruido), y una estimación usando el filtro. A continuación se muestra el gráfico comparativo:

![Grafico](grafico_resultado.png)

---

## 🔍 Explicación del Proceso de Inferencia

El filtro de Kalman combina la predicción basada en el modelo y la observación con ruido. A medida que recibe más observaciones, va corrigiendo la estimación, reduciendo la incertidumbre sobre la posición real.

---

## 📉 Análisis de Error

El error promedio (RMSE) entre la señal real y la estimada se calcula para medir la efectividad del filtro. Un bajo RMSE indica una estimación cercana a la realidad, lo que demuestra que el filtro infiere eficazmente la variable no observada.
