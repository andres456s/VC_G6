# Taller - Animaciones por Esqueleto: Importando y Reproduciendo Animaciones

## Objetivo

Este taller explora el uso de animaciones esqueléticas en modelos 3D usando Three.js. Se trabajó con un modelo `.gltf` animado para aprender cómo importar clips de animación, reproducirlos y controlarlos en tiempo real dentro de una escena interactiva.

---

## Tecnologías utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Three.js](https://threejs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Drei](https://github.com/pmndrs/drei)

---

## ¿Qué es una animación por esqueleto?

Las animaciones esqueléticas utilizan un **sistema de huesos (rig)** para mover un modelo 3D. En lugar de mover vértices directamente, se controla un esqueleto interno, y las deformaciones del modelo se producen por la influencia de los huesos sobre la malla.

Una animación se compone de **clips**, que son secuencias de transformaciones sobre esos huesos. Estos clips pueden ser reproducidos, pausados o mezclados (blend/fade).

---

## Animaciones en Three.js

Se utilizó la función `useGLTF()` para cargar el modelo, y `useAnimations()` para acceder a los clips disponibles. La animación activa se reprodujo automáticamente al cargar la escena:

```jsx
const { actions, names } = useAnimations(gltf.animations, gltf.scene)

useEffect(() => {
  if (names.length > 0 && actions[names[0]]) {
    actions[names[0]].reset().fadeIn(0.5).play()
  }
}, [actions, names])


---
## Resultado
![Resultado](./resultado.png)
---

## Observaciones
El modelo fue cargado correctamente y su animación principal se ejecutó de forma fluida.

La animación se mantiene activa en loop sin errores de rigging.

La integración con React Three Fiber fue sencilla y modular.

No se implementaron aún transiciones entre múltiples clips, pero el sistema está listo para hacerlo.

## Conclusión
Este taller permitió entender cómo funcionan las animaciones esqueléticas en Three.js, cómo se organizan los clips de animación y cómo se reproducen en un entorno interactivo. Fue especialmente útil aprender la diferencia entre manipular directamente un objeto y trabajar con un sistema jerárquico de huesos.

En futuras versiones, se podrían añadir botones para cambiar entre clips, o sincronizar eventos con las animaciones (como mostrar texto al caminar o rugir).
