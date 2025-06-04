# 🧪 Taller - Gestos con Cámara Web: Control Visual con MediaPipe

## 🔍 Objetivo

Este taller tiene como propósito explorar el uso de interfaces naturales mediante el reconocimiento de gestos de mano con una cámara web, utilizando la biblioteca MediaPipe. Se busca permitir la interacción en tiempo real con elementos visuales sin necesidad de hardware adicional, fomentando el desarrollo de experiencias más intuitivas y accesibles.

---

## 🧠 Tecnologías utilizadas

- **Python**
- **OpenCV** – Captura y procesamiento de video.
- **MediaPipe Hands** – Detección y seguimiento de manos.
- **NumPy** – Cálculos numéricos para distancias y lógica de gestos.

---

## 🎯 Actividades desarrolladas

### ✅ Detección en tiempo real

- Activación de la cámara web con OpenCV.
- Detección de manos en tiempo real usando `MediaPipe Hands`.
- Renderizado de los landmarks (puntos de referencia de la mano).

### ✅ Análisis de gestos

- Identificación del número de dedos extendidos.
- Cálculo de la distancia entre puntos específicos (ej. entre el pulgar y el índice).
- Uso de lógica condicional para interpretar gestos personalizados.

### ✅ Acciones visuales vinculadas a gestos

- Cambiar el color de fondo al detectar una configuración específica de los dedos.
- Mover un objeto virtual según la posición de la mano.
- Cambiar de "escena" (modo visual) mediante gestos como abrir o cerrar la palma.

### 🎮 Bonus

- Desarrollo de una pequeña interfaz interactiva controlada únicamente con la mano.
- Exploración de mecánicas de juego simples o simulaciones visuales.

---

## 💻 Código relevante

El código principal se desarrolló en Python. A continuación, se muestra un fragmento base del sistema de captura y procesamiento:

```python
import cv2
import mediapipe as mp
import numpy as np
import math

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

cap = cv2.VideoCapture(0)

# ... lógica de detección de gestos y acciones ...

if cv2.waitKey(1) & 0xFF == 27:
    break

cap.release()
cv2.destroyAllWindows()


---
💬 Reflexión
Trabajar con MediaPipe permitió comprender cómo funciona la visión por computadora en la detección de gestos. El sistema mostró buena precisión en condiciones de iluminación adecuadas y con una sola mano frente a la cámara. Las posibles mejoras incluyen:

Filtrado de ruido para gestos más estables.

Detección de ambas manos simultáneamente.

Agregar una capa de suavizado para transiciones visuales más suaves.

Este tipo de interacción basada en gestos puede ser especialmente útil para accesibilidad, interfaces sin contacto y prototipos de control natural.

