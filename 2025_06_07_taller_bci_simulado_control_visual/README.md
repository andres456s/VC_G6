# 🧪 Taller - BCI Simulado: Señales Mentales Artificiales para Control Visual

## 🎯 Objetivo

Simular una interfaz BCI (Brain-Computer Interface) con señales EEG artificiales para traducir actividad cerebral en una acción visual. El enfoque principal es aplicar filtros pasa banda, calcular potencia y activar respuestas visuales condicionales.

---

## 📁 Estructura del proyecto

```
yyyy-mm-dd_taller_bci_simulado_control_visual/
├── python/
│   └── bci_simulado_control_visual.ipynb
├── README.md
```

---

## 💻 Herramientas utilizadas

- `numpy`, `pandas`, `matplotlib`
- `scipy.signal` para filtros
- `pygame` para simulación visual
- Jupyter Notebook (recomendado en entorno local)

---

## 🧠 Señales simuladas

Se generó una señal EEG artificial combinando frecuencias de las bandas **Alpha (10 Hz)** y **Beta (20 Hz)** con ruido blanco.

```python
alpha = np.sin(2 * np.pi * 10 * t)
beta = 0.5 * np.sin(2 * np.pi * 20 * t)
noise = 0.2 * np.random.randn(len(t))
signal = alpha + beta + noise
```

---

## 🎚️ Procesamiento de señales

- Se aplicaron filtros pasa banda para aislar:
  - Banda **Alpha**: 8–12 Hz
  - Banda **Beta**: 12–30 Hz

- Se calculó la **potencia** de la banda Alpha en ventanas de 1 segundo.

- Se definió una condición artificial de **“atención”**:  
  > Si la potencia Alpha supera un umbral (0.3), se considera que el usuario está en estado activo.

---

## 🎮 Control visual con pygame

Se creó una animación en `pygame` donde:

- El fondo cambia de color si el nivel de atención es alto.
- Se muestra un círculo blanco (activo) o gris (inactivo) por cada segundo simulado.

📸 **GIF ilustrativo (recomendado agregar)**  
Puedes grabar un fragmento de la simulación y convertirlo a GIF para mostrar este comportamiento.

---

## 📓 Código

El archivo `bci_simulado_control_visual.ipynb` incluye:

1. Simulación y visualización de señales EEG.
2. Aplicación de filtros.
3. Cálculo de potencia.
4. Evaluación de condiciones lógicas.
5. Simulación visual con pygame.


---

## 🤖 Prompts utilizados 

> “Simula una señal EEG con componentes Alpha y Beta”  
> “Aísla la banda Alpha con filtros pasa banda usando `scipy.signal`”  
> “Calcula potencia en ventanas de 1 segundo”  
> “Define condición de atención como potencia Alpha > umbral”  
> “Crea animación con pygame que responda a esta condición”

---

## 💬 Comentarios personales

> El taller me permitió comprender mejor cómo se representan las señales EEG y cómo filtrar y extraer características relevantes (como la potencia en una banda). El uso de `pygame` fue interesante para visualizar respuestas en tiempo real y entender cómo una interfaz cerebro-computadora puede funcionar.  
>
> Una dificultad fue que `pygame` requiere ejecución local y no es compatible con Colab. Lo solucioné usando Jupyter localmente.
