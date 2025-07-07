# 🧬 Taller: Embeddings Visuales con CLIP y Reducción PCA

## 📅 Fecha
`2025-06-28`

---

## 🎯 Objetivo del Notebook

Explorar y visualizar representaciones (embeddings) de imágenes generadas por el modelo CLIP de OpenAI, aplicando reducción de dimensionalidad con PCA (Análisis de Componentes Principales). El taller permite observar cómo CLIP "entiende" imágenes y cómo se pueden agrupar visualmente según su similitud semántica.

---

## 🧠 Conceptos Aprendidos

- [x] Generación de embeddings visuales con CLIP
- [x] Preprocesamiento y carga de múltiples imágenes
- [x] Reducción de dimensionalidad con PCA para visualización 2D
- [x] Visualización de agrupamientos semánticos en el espacio reducido
- [x] Relación entre visión computacional y aprendizaje profundo

---

## 🔧 Herramientas y Entornos

- Google Colab (Python 3, GPU opcional)
- [CLIP (OpenAI)](https://github.com/openai/CLIP)
- scikit-learn (`PCA`)
- torch, torchvision, PIL, matplotlib, numpy

---

## 📁 Estructura del Proyecto

```
Taller - Taller embeddings visuales clip pca/
└── Taller_Taller_embeddings_visuales_clip_pca.ipynb   # Notebook principal
```

---

## 🧪 Implementación

### 🔹 Etapas realizadas

1. Instalación y carga del modelo CLIP y dependencias.
2. Selección/carga de un conjunto de imágenes de ejemplo.
3. Extracción de embeddings visuales para cada imagen usando CLIP.
4. Aplicación de PCA para reducir la dimensionalidad de los embeddings.
5. Visualización 2D de los embeddings proyectados con etiquetas o miniaturas.
6. Interpretación de agrupamientos y relaciones semánticas en el espacio reducido.

---

### 🔹 Código real usado para embeddings y reducción

```python
import clip
import torch
from PIL import Image
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
import numpy as np

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

images = [Image.open(path) for path in image_paths]
image_tensors = [preprocess(img).unsqueeze(0).to(device) for img in images]
image_features = []

with torch.no_grad():
    for tensor in image_tensors:
        feats = model.encode_image(tensor).cpu().numpy().flatten()
        image_features.append(feats)

image_features = np.array(image_features)

# Reducción de dimensionalidad con PCA
pca = PCA(n_components=2)
embeddings_2d = pca.fit_transform(image_features)

# Visualización
plt.figure(figsize=(8,6))
plt.scatter(embeddings_2d[:, 0], embeddings_2d[:, 1])
for i, label in enumerate(image_labels):
    plt.annotate(label, (embeddings_2d[i, 0], embeddings_2d[i, 1]))
plt.title("Visualización 2D de Embeddings CLIP reducidos con PCA")
plt.show()
```

---

## 📊 Resultados Visuales

-![img](gif.gif)

---

## 🧩 Prompts Usados

```text
¿Cómo obtengo embeddings visuales de imágenes con CLIP?
¿Cómo reduzco la dimensionalidad de embeddings con PCA y los visualizo?
¿Cómo puedo visualizar agrupamientos semánticos de imágenes usando CLIP?
```

---

## 💬 Reflexión Final

- Visualizar los embeddings de CLIP ayuda a entender cómo los modelos asocian imágenes similares.
- PCA es útil para exploración y prototipado visual, aunque puede perder información respecto al espacio original.
- Como mejora, se podría probar t-SNE o UMAP para reducción no lineal, o explorar embeddings de texto junto a los de imagen.

---

## ✅ Checklist de Entrega

- [x] Notebook funcional y comentado
- [x] Ejemplo con conjunto de imágenes y visualización 2D
- [x] Interpretación y reflexión sobre los resultados
- [x] README claro y detallado

---