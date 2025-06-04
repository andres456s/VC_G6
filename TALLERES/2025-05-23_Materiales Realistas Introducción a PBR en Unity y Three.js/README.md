# 🧪 Taller: Materiales Realistas — Introducción a PBR en Three.js

## 📅 Fecha
`2025-05-23`

---

## 🎯 Objetivo del Taller

Introducir los conceptos básicos de materiales realistas en gráficos 3D utilizando PBR (Physically Based Rendering) en Three.js. Aprender a aplicar texturas, mapas y propiedades físicas para simular materiales como metal, madera, plástico y piedra en escenas web interactivas.

---

## 🧠 Conceptos Aprendidos

- [x] Principios de PBR (Physically Based Rendering)
- [x] Configuración de materiales realistas en Three.js
- [x] Uso de mapas de texturas (albedo, normal, roughness, metalness)
- [x] Iluminación y entorno para realismo visual

---

## 🔧 Herramientas y Entornos

- Three.js (JavaScript, React)

---

## 📁 Estructura del Proyecto

```
2025-05-23_Materiales Realistas Introducción a PBR en Unity y Three.js/
├── threejs/        # Implementación en Three.js
│   ├── src/
│   │   └── App.jsx # Código principal con ejemplo de PBR
├── README.md
```

---

## 🧪 Implementación

### 🔹 Etapas realizadas
1. Configuración básica de escena y cámara en Three.js.
2. Creación de materiales PBR utilizando `MeshStandardMaterial`.
3. Aplicación de diferentes mapas de texturas (color, normal, roughness, metalness).
4. Configuración de luces ambientales y de entorno para realismo.
5. Visualización y ajustes en tiempo real en el navegador.

### 🔹 Código real usado para aplicar texturas PBR

Fragmento del archivo [`threejs/src/App.jsx`](threejs/src/App.jsx):

```javascript
// Cargar texturas PBR solo una vez
const loader = new THREE.TextureLoader();
texturesRef.current.map = loader.load('textures/gold/Foil002_1K-JPG_Color.jpg');
texturesRef.current.roughnessMap = loader.load('textures/gold/Foil002_1K-JPG_Roughness.jpg');
texturesRef.current.metalnessMap = loader.load('textures/gold/Foil002_1K-JPG_Metalness.jpg');
texturesRef.current.normalMap = loader.load('textures/gold/Foil002_1K-JPG_NormalGL.jpg');

// Esfera con material PBR
const geometry1 = new THREE.SphereGeometry(0.8, 32, 32);
const pbrMaterial = new THREE.MeshStandardMaterial({
    map: texturesRef.current.map,
    color: 0xffd700,
    roughnessMap: texturesRef.current.roughnessMap,
    metalnessMap: texturesRef.current.metalnessMap,
    normalMap: texturesRef.current.normalMap,
    roughness,
    metalness
});
const pbrSphere = new THREE.Mesh(geometry1, pbrMaterial);
scene.add(pbrSphere);
```

Además, el taller permite activar/desactivar cada mapa en tiempo real:

```javascript
pbrMaterialRef.current.map = useMap ? texturesRef.current.map : null;
pbrMaterialRef.current.roughnessMap = useRoughnessMap ? texturesRef.current.roughnessMap : null;
pbrMaterialRef.current.metalnessMap = useMetalnessMap ? texturesRef.current.metalnessMap : null;
pbrMaterialRef.current.normalMap = useNormalMap ? texturesRef.current.normalMap : null;
pbrMaterialRef.current.needsUpdate = true;
```

---

## 📊 Resultados Visuales

Incluye capturas, gifs o videos demostrando el efecto de los materiales PBR en la carpeta `threejs` si están disponibles.

![Vídeo-sin-título-‐-Hecho-con-Clipchamp-_2_](https://github.com/user-attachments/assets/d95827e8-6bf6-4900-9b44-92076971a8b3)


---

## 🧩 Prompts Usados

```text
¿Cómo aplico materiales PBR realistas en Three.js?
¿Cómo utilizo mapas de texturas físicas (albedo, normal, roughness, metalness) en un material en Three.js?
```

---

## 💬 Reflexión Final

- Aprendí a crear materiales realistas en el navegador usando técnicas de PBR con Three.js y React.
- Me parece interesante cómo pequeñas variaciones en los mapas de textura cambian radicalmente la apariencia del material.
- Como mejora, podría integrar controles interactivos para modificar parámetros en tiempo real y comparar diferentes materiales.

---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-05-23_Materiales Realistas Introducción a PBR en Unity y Three.js`
- [x] Código funcional en la carpeta `threejs/src`
- [x] README completo y claro
- [x] Commits descriptivos

---
