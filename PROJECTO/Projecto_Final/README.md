# Clasificador de Residuos Orgánicos

Este repositorio presenta un proyecto de clasificación automática de residuos orgánicos mediante técnicas de visión por computador y aprendizaje profundo. Se exploran diferentes arquitecturas de redes neuronales para mejorar el rendimiento en la tarea de clasificación de imágenes de residuos.

Los modelos en formato .pth estan en el kaggle

## 🔗 Recursos del Proyecto

- 📓 **Notebook de desarrollo**:  
  [https://www.kaggle.com/code/andr3spatino/fork-of-projec](https://www.kaggle.com/code/andr3spatino/fork-of-project)

- 📊 **Presentación en diapositivas (Gamma)**:  
  https://gamma.app/docs/Clasificador-de-Residuos-Organicos-tpijqpyeeu9htfl?mode=present#card-kwolpuxlobvb68f

- 📄 **Artículo completo en PDF**:  
  [Clasificador_de_residuos.pdf](./Clasificador_de_residuos.pdf)

- 📄 **archivos de prueba de los modelos**:  
  [Clasificador_de_residuos hibrido .py](./webcam_inferencia_Version2.py) y [Clasificador_de_residuos Vision trasformer.py](./webcam_inferencia_VIT_Version4.py)

## 🧠 Arquitecturas Evaluadas

El estudio evalúa cuatro enfoques distintos:

1. **CNN simple**: arquitectura básica con capas convolucionales y densas.
2. **CNN + ResNet50**: utiliza aprendizaje por transferencia desde ResNet50.
3. **Vision Transformer (ViT)**: modelo basado en atención global.
4. **Modelo híbrido Transformer + ResNet**: combinación de extracción de características de ResNet con un Transformer.

## 📈 Resultados

| Modelo                         | Accuracy Promedio (%) |
|-------------------------------|------------------------|
| CNN simple                    | 71.27                 |
| ResNet50                      | 76.61                 |
| CNN + ResNet                  | 87.46                 |
| Vision Transformer (ViT)      | 95.21                 |

ViT mostró el mejor rendimiento en precisión y estabilidad entre pliegues, aunque con mayor costo computacional. CNN+ResNet demostró un buen balance entre rendimiento y eficiencia computacional.

## 🧪 Dataset

Se utilizó el dataset **Trash Type Detection** disponible en Kaggle, que contiene 2,527 imágenes clasificadas en seis categorías: *metal, glass, paper, trash, cardboard y plastic*.

## 📌 Resultados

### 📌 Vit



https://github.com/user-attachments/assets/ad5c9785-6959-4535-9de2-8c5d52d38aff

### 📌 CNN+RestNet50


https://github.com/user-attachments/assets/748a6ac6-4094-4701-bbfd-dc29734d79e2





## 📌 Conclusiones

- La complejidad arquitectónica influye significativamente en el desempeño del modelo.
- Modelos como ViT son altamente precisos, pero requieren mayor capacidad de cómputo.
- CNN+ResNet es una opción sólida para escenarios con recursos limitados.
- Este proyecto demuestra la viabilidad del uso de visión artificial para automatizar la clasificación de residuos en contextos reales.
- El modelo Vit fue la que tuvo el un mejor performance en un esenario real.
