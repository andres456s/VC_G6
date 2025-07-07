# 🏷️ Taller: Segmentación Semántica con SAM y DeepLab en Deep Learning

## 📅 Fecha
`2025-06-25`

---

## 🎯 Objetivo del Notebook

Explorar y comparar modelos de segmentación semántica de imágenes utilizando técnicas de Deep Learning. El taller implementa y prueba dos enfoques avanzados: **SAM (Segment Anything Model)** y **DeepLab**, mostrando cómo aplicar ambos para segmentar objetos y regiones en imágenes.

---

## 🧠 Conceptos Aprendidos

- [x] Principios de la segmentación semántica en Deep Learning
- [x] Uso del modelo DeepLab (PyTorch/TensorFlow)
- [x] Uso de SAM (Segment Anything Model) de Meta AI
- [x] Preprocesamiento de imágenes para segmentación
- [x] Visualización y comparación de máscaras segmentadas
- [x] Análisis de ventajas y limitaciones de cada enfoque

---

## 🔧 Herramientas y Entornos

- Google Colab (Python 3, GPU opcional)
- PyTorch y/o TensorFlow
- torchvision, numpy, matplotlib
- [Segment Anything Model (SAM)](https://github.com/facebookresearch/segment-anything) de Meta AI
- Modelos pre-entrenados DeepLab (por ejemplo, DeepLabV3)

---

## 📁 Estructura del Proyecto

```
Taller - Taller segmentacion semantica sam deeplab/
├── sementacion_semantica_sam_deelearnig.ipynb   # Notebook principal con todo el flujo
└── (imágenes de ejemplo, si se usan)
```

---

## 🧪 Implementación

### 🔹 Etapas realizadas

1. Instalación de dependencias y descarga de modelos pre-entrenados.
2. Carga y preprocesamiento de imágenes de ejemplo.
3. Aplicación de SAM para segmentación automática de regiones.
4. Aplicación de DeepLabV3 (u otro) para segmentación semántica clásica.
5. Visualización de resultados: máscaras, overlays y comparación lado a lado.
6. Discusión sobre diferencias, ventajas y casos de uso de cada método.

---

### 🔹 Fragmento real del código (ejemplo típico de flujo)

```python
# Ejemplo de inferencia con SAM
import torch
import numpy as np
from segment_anything import SamPredictor, sam_model_registry

sam = sam_model_registry["vit_h"](checkpoint="sam_vit_h.pth").to(device)
predictor = SamPredictor(sam)
predictor.set_image(image)
masks, scores, logits = predictor.predict(point_coords=points, point_labels=labels)

# Ejemplo de inferencia con DeepLabV3
import torchvision
deeplab = torchvision.models.segmentation.deeplabv3_resnet101(pretrained=True).eval()
input_tensor = preprocess(image)
with torch.no_grad():
    output = deeplab(input_tensor.unsqueeze(0))["out"]
mask = output.argmax(1).squeeze().cpu().numpy()
```

---

## 📊 Resultados Visuales

![imag](masks_animation.gif)

---

## 🧩 Prompts Usados

```text
¿Cómo uso SAM (Segment Anything Model) para segmentar regiones en imágenes en Colab?
¿Cómo aplico DeepLab para segmentación semántica en imágenes?
¿Cómo comparo visualmente los resultados de dos modelos de segmentación?
```

---

## 💬 Reflexión Final

- SAM ofrece una segmentación automática y flexible, útil para distintos dominios y objetos, pero requiere más recursos.
- DeepLab sigue siendo una opción sólida y eficiente para segmentación semántica clásica y tareas supervisadas.
- La combinación de ambos permite explorar ventajas prácticas y entender el estado del arte en segmentación.

---

## ✅ Checklist de Entrega

- [x] Notebook funcional y comentado
- [x] Ejemplos con imágenes reales
- [x] Comparación visual entre SAM y DeepLab
- [x] README claro y detallado

---