# 🧪 Taller: Proyecciones y Cámaras Virtuales en Three.js

## 📅 Fecha
`2025-05-22`

---

## 🎯 Objetivo del Taller

Entender el funcionamiento de las proyecciones de cámara en 3D y su efecto en la visualización de escenas virtuales usando Three.js y React Three Fiber. Explorar la diferencia entre cámaras perspectiva y ortográfica, y cómo afectan la representación de objetos y la proyección de puntos en 2D.

---

## 🧠 Conceptos Aprendidos

- [x] Diferencia entre cámara perspectiva y ortográfica
- [x] Proyección de coordenadas 3D a la pantalla 2D
- [x] Uso de React Three Fiber y Drei para cámaras y controles
- [x] Actualización en tiempo real de parámetros de cámara y proyección de puntos

---

## 🔧 Herramientas y Entornos

- Three.js (usando React y @react-three/fiber)
- @react-three/drei

---

## 📁 Estructura del Proyecto

```
2025-05-22_Taller proyecciones camara virtual/
├── threejs/
│   └── src/
│       └── App.jsx    # Código principal de la demo
├── README.md
```

---

## 🧪 Implementación

### 🔹 Etapas realizadas
1. Creación de una escena 3D con varias figuras distribuidas en el espacio.
2. Implementación de un sistema para alternar entre cámara perspectiva y ortográfica.
3. Mostrado en tiempo real de los parámetros de la cámara y la proyección 2D de un punto 3D arbitrario.
4. Visualización interactiva con controles orbitales y overlays en pantalla.

### 🔹 Código real relevante

Fragmento del archivo [`threejs/src/App.jsx`](threejs/src/App.jsx):

```javascript
// Alternar entre cámara perspectiva y ortográfica
const CameraSwitcher = React.forwardRef(function CameraSwitcher({ usePerspective }, ref) {
  const aspect = window.innerWidth / window.innerHeight;
  const orthoParams = {
    left: -aspect * 4,
    right: aspect * 4,
    top: 3.5,
    bottom: -3.5,
    near: 0.1,
    far: 50,
  };
  return usePerspective ? (
    <PerspectiveCamera
      ref={ref}
      makeDefault
      position={[0, 4, 8]}
      fov={60}
      near={0.1}
      far={50}
    />
  ) : (
    <OrthographicCamera
      ref={ref}
      makeDefault
      position={[0, 4, 8]}
      {...orthoParams}
    />
  );
});

// Proyección de un punto 3D a 2D
function CanvasLogic({
  usePerspective,
  setCameraParams,
  setPoint2D,
  cameraRef,
}) {
  const { camera, size } = useThree();
  useFrame(() => {
    // Actualiza métricas, posición y rotación de la cámara activas
    if (camera) {
      setCameraParams(
        usePerspective
          ? {
              fov: camera.fov,
              aspect: camera.aspect,
              near: camera.near,
              far: camera.far,
              position: [camera.position.x, camera.position.y, camera.position.z],
              rotation: [camera.rotation.x, camera.rotation.y, camera.rotation.z],
            }
          : {
              left: camera.left,
              right: camera.right,
              top: camera.top,
              bottom: camera.bottom,
              near: camera.near,
              far: camera.far,
              position: [camera.position.x, camera.position.y, camera.position.z],
              rotation: [camera.rotation.x, camera.rotation.y, camera.rotation.z],
            }
      );
      // Proyección del punto (2,0,2) a 2D
      const point3d = new THREE.Vector3(2, 0, 2);
      const projected = point3d.clone().project(camera);
      const x = ((projected.x + 1) / 2) * size.width;
      const y = ((-projected.y + 1) / 2) * size.height;
      setPoint2D({ x, y });
    }
  });
  return null;
}
```

---

## 📊 Resultados Visuales

- Demostración interactiva de cámara perspectiva y ortográfica.
- Overlay con parámetros de cámara y punto proyectado en pantalla (círculo rojo).
![Grabación-de-pantalla-2025-05-31-095746](https://github.com/user-attachments/assets/46570317-339e-4d7a-a61c-b46c6e048317)

---

## 🧩 Prompts Usados

```text
¿Cómo puedo alternar entre una cámara perspectiva y una ortográfica en Three.js usando React?
¿Cómo proyecto un punto 3D a coordenadas 2D de pantalla con Three.js?
¿Cómo muestro los parámetros de la cámara en tiempo real en React Three Fiber?
```

---

## 💬 Reflexión Final

- Aprendí cómo la proyección de cámara afecta la visualización de objetos en 3D.
- Visualizar la posición y rotación de la cámara en tiempo real ayuda a entender la perspectiva virtual.
- La proyección de puntos y el cambio dinámico entre cámaras son herramientas poderosas para depuración y educación en gráficos computacionales.

---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-05-22_Taller proyecciones camara virtual`
- [x] Código funcional en la carpeta `threejs/src`
- [x] README completo y claro
- [x] Commits descriptivos

---
