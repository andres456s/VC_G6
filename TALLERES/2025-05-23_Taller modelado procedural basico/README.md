# 🧪 Taller: Modelado Procedural Básico

## 📅 Fecha
`2025-05-23`

---

## 🎯 Objetivo del Taller

Explorar los fundamentos del modelado procedural utilizando JavaScript y Three.js, aprendiendo a generar geometría 3D de manera programática en el navegador.

---

## 🧠 Conceptos Aprendidos

- [x] Transformaciones geométricas (escala, rotación, traslación)
- [x] Modelado procedural de geometría básica en Three.js
- [x] Uso de librerías gráficas para la automatización de escenas y objetos

---

## 🔧 Herramientas y Entornos

- Three.js (JavaScript)

---

## 📁 Estructura del Proyecto

```
2025-05-23_Taller modelado procedural basico/
├── threejs/        # Implementación en Three.js
├── README.md
```

---

## 🧪 Implementación

### 🔹 Etapas realizadas
1. Definición de parámetros y escena en Three.js.
2. Programación de generación procedural de objetos 3D.
3. Visualización e interacción en el navegador.

### 🔹 Código relevante

```javascript
// Ejemplo: Crear una malla procedural de esferas en Three.js
for (let x = -5; x <= 5; x += 2) {
  for (let y = -5; y <= 5; y += 2) {
    const geometry = new THREE.SphereGeometry(0.8, 16, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x66ccff });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, 0);
    scene.add(sphere);
  }
}
```

---

## 📊 Resultados Visuales

Puedes encontrar los resultados visuales (capturas, gifs, etc.) dentro de la carpeta `threejs` o en el repositorio correspondiente, según se vayan generando.
![Grabación-de-pantalla-2025-05-31-101355](https://github.com/user-attachments/assets/c8f058b6-55c6-4727-bf75-b4bd16ee0a57)

---

## 🧩 Prompts Usados

```text
¿Cómo añado múltiples esferas en posiciones programáticas dentro de una escena Three.js?
¿Cómo automatizar la generación de geometría en Three.js usando bucles?
```

---

## 💬 Reflexión Final

- Aprendí a crear y automatizar la generación de geometría básica en Three.js usando JavaScript.
- Me resultó interesante ver cómo la lógica procedural permite crear patrones y escenas complejas de manera sencilla.
- Como mejora, podría integrar controles interactivos para modificar parámetros en tiempo real.

---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-05-23_Taller modelado procedural basico`
- [x] Código funcional en la carpeta `threejs`
- [x] README completo y claro
- [x] Commits descriptivos

---
