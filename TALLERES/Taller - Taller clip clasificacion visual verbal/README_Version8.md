# 🖼️ Taller: Clasificación Visual y Verbal con CLIP (OpenAI)

## 📅 Fecha
`2025-06-20`

---

## 🎯 Objetivo del Notebook

Experimentar con el modelo CLIP de OpenAI para realizar clasificación de imágenes utilizando descripciones textuales en lenguaje natural. El taller permite cargar una imagen y una lista de etiquetas/frases, y obtener la etiqueta más probable según la comprensión conjunta de visión y lenguaje de CLIP.

---

## 🧠 Conceptos Aprendidos

- [x] ¿Qué es CLIP y cómo une visión y lenguaje?
- [x] Instalación y uso del modelo pre-entrenado CLIP en Python
- [x] Preprocesamiento de imágenes y textos para CLIP
- [x] Inferencia: obtención de similitud imagen-texto
- [x] Visualización de resultados y probabilidades

---

## 🔧 Herramientas y Entornos

- Google Colab (Python 3, GPU opcional)
- [CLIP (OpenAI)](https://github.com/openai/CLIP)
- torch, torchvision, PIL, matplotlib, numpy

---

## 📁 Estructura del Proyecto

```
Taller - Taller clip clasificacion visual verbal/
└── Taller_clip_clasificacion_visual_verbal.ipynb   # Notebook principal
```

---

## 🧪 Implementación

### 🔹 Etapas realizadas

1. Instalación de CLIP y dependencias.
2. Carga del modelo y selección de dispositivo (CPU/GPU).
3. Preprocesamiento de la imagen y las etiquetas/frases.
4. Inferencia: obtención de vectores de imagen y texto, cálculo de probabilidades.
5. Visualización: etiqueta ganadora y gráfica de probabilidades para todas las frases.

---

### 🔹 Código real usado para clasificación

```python
import clip
import torch
from PIL import Image

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)
labels = ["a blurry cat", "a fast sports car", "dog", "horse", "a car", "a tree"]
image = preprocess(Image.open("/content/car.jpeg")).unsqueeze(0).to(device)
text = clip.tokenize(labels).to(device)
with torch.no_grad():
    image_features = model.encode_image(image)
    text_features = model.encode_text(text)
    logits_per_image, _ = model(image, text)
    probs = logits_per_image.softmax(dim=-1).cpu().numpy()
```

**Predicción:**

```python
predicted_label_index = np.argmax(probs)
predicted_label = labels[predicted_label_index]
print(f"The image is classified as: {predicted_label}")
```

**Visualización de probabilidades:**

```python
import matplotlib.pyplot as plt
plt.figure(figsize=(10, 6))
plt.bar(labels, probs[0])
plt.title("Image Classification Probabilities")
plt.ylabel("Probability")
plt.xticks(rotation=0)
plt.tight_layout()
plt.show()
```

---

## 📊 Resultados Visuales

![img](img.gif)
---

## 🧩 Prompts Usados

```text
¿Cómo uso CLIP de OpenAI para clasificar imágenes con frases personalizadas?
¿Cómo obtengo y visualizo las probabilidades de cada etiqueta con CLIP?
¿Cómo puedo cargar mis propias imágenes y frases en CLIP en Colab?
```

---

## 💬 Reflexión Final

- CLIP permite clasificar imágenes usando libremente descripciones en lenguaje natural, rompiendo la barrera de las etiquetas fijas.
- Es fácil de usar y visualizar, y muy útil para tareas de prototipado rápido en visión y lenguaje.
- Como mejora, podría usarse con frases en español, experimentar con imágenes propias o usar CLIP para tareas de búsqueda cruzada imagen-texto.

---

## ✅ Checklist de Entrega

- [x] Notebook funcional y comentado
- [x] Ejemplo con imagen y frases personalizadas
- [x] Visualización de resultados y probabilidades
- [x] README claro y detallado

---