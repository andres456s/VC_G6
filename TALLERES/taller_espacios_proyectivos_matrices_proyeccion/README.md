
## 🔍 Tipos de Proyección


### 🔷 Proyección Ortográfica
Descripción: Proyecta los puntos de forma paralela al plano de imagen. No hay perspectiva; los objetos no cambian de tamaño con la distancia.

Uso común: Planos arquitectónicos, juegos 2D con lógica 3D, editores CAD.

Característica visual: Objetos del fondo y primer plano aparecen del mismo tamaño.

### 🔶 Proyección en Perspectiva
Descripción: Imita cómo el ojo humano ve el mundo. Las líneas convergen hacia un punto de fuga y los objetos más lejanos parecen más pequeños.

Uso común: Videojuegos 3D, simuladores, visualizaciones realistas.

Característica visual: Profundidad perceptual, distorsión realista basada en la distancia focal.

## 🖼 Comparación Visual
Ortográfica	Perspectiva (d=3)	Perspectiva (d=10)

A medida que aumenta la distancia focal (d), la perspectiva se suaviza.

En distancia focal corta, el efecto de profundidad es más dramático.

## ⚙️ Tecnologías Usadas

### 🐍 Python

matplotlib + numpy (proyecciones estáticas)

### 🌐 Three.js

React Three Fiber + @react-three/drei (proyecciones interactivas)

