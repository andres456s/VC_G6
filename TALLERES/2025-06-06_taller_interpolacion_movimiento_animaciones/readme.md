# Taller - Interpolación de Movimiento: Suavizando Animaciones en Tiempo Real

## Entorno: Three.js con React Three Fiber

Este proyecto implementa técnicas de interpolación para crear animaciones suaves en objetos 3D utilizando Three.js y React Three Fiber.

---

## Objetivo

Comparar distintos tipos de interpolación para animar un objeto entre dos puntos. El enfoque principal es controlar la transición de manera fluida con efectos como aceleración, desaceleración o movimientos curvos.

---

## Interpolaciones Implementadas

### LERP (Linear Interpolation)
- Interpolación lineal de posición entre dos puntos.
- Utiliza `THREE.Vector3.lerpVectors()` para mover un objeto de forma constante en línea recta.
- Su implementación fue directa y útil para movimientos predecibles.

### SLERP (Spherical Linear Interpolation)
- Interpolación de rotación entre dos orientaciones.
- Utiliza `THREE.Quaternion.slerp()` dentro del `useFrame()` para interpolar rotaciones suaves.
- Ideal para transiciones naturales de rotación, como giro de cámara o rotación de objeto.

### Bézier Curve Interpolation
- Movimiento sobre una curva personalizada usando puntos de control.
- Se utiliza `THREE.CubicBezierCurve3` para definir una trayectoria curvada.
- Visualmente más natural y orgánica que LERP.

---

## Resultado Visual

A continuación se muestra una captura del resultado:

![Resultado](./resultado.png)


---

## Conclusiones

- **LERP** es fácil de implementar, pero puede sentirse robótico.
- **SLERP** da rotaciones suaves y naturales, ideal para orientación de cámara u objetos.
- **Curvas Bézier** proporcionan trayectorias más interesantes, especialmente para animaciones más orgánicas.
- En nuestra experiencia, el movimiento sobre curvas fue el más fluido y estéticamente agradable.

---

