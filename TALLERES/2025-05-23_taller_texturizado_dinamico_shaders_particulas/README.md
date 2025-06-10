# 🧪 Taller - Texturizado Creativo: Materiales Dinámicos con Shaders y Datos

## 📅 Fecha
`2025-05-23` – Fecha de realización 

---

## 🎯 Objetivo del Taller

Crear materiales que cambien en tiempo real en respuesta al usuario, como por ejemplo el mouse, o con el paso del tiempo, además se integró el efecto de partículas para complementar visualmente, en este caso, se simula fenomenos como el agua en un corazón.

---

## 🧠 Conceptos Aprendidos

Lista los principales conceptos aplicados:

- [x] Transformaciones geométricas (escala, rotación, traslación)
- [x] Shaders y efectos visuales
- [x] Sistema de partículas


---

## 🔧 Herramientas y Entornos

Entornos usados:

- Three.js / React Three Fiber
- Visual Studio Code


---

## 📁 Estructura del Proyecto

```
2025-05-23_taller_texturizado_dinamico_shaders_particulas/
├── threejs/               # threejs/, VSCODE/
    ├── public/                 # Gif
    ├── src/                 # Código fuente
        ├── components/            #  Componentes, como el corazón y las particulas
            ├── Heart.jsx/            # Componente corazon
            ├── Particles.jsx/            # Componente particulas
        ├── shaders/            # Un shaders que no funciona correctamente

├── README.md
```


---

## 🧪 Implementación

Explica el proceso:

### 🔹 Etapas realizadas
1. Crear escena con el corazon.
2. Aplicar un cambio de color en el paso del tiempo y con el mouse.
3. Aplicar shader al corazón con el agregado de que cambia con el mouse.
4. Agregar sistema de particulas.

### 🔹 Código relevante

Incluye un fragmento que resuma el corazón del taller:

```js
const EnergyMaterial = shaderMaterial(
  {
    time: 0,
    hover: 0,
    color1: new THREE.Color(0xff0033),
    color2: new THREE.Color(0x00ffff)
  },
  `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float time;
  uniform float hover;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    float wave = sin(pos.x * 5.0 + time * 2.0) * 0.1 * hover;
    pos += normal * wave;
    
    pos.z += sin(time + pos.x * 2.0) * 0.2 * hover;
    pos.y += cos(time + pos.y * 2.0) * 0.2 * hover;
    
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float time;
  uniform float hover;
  uniform vec3 color1;
  uniform vec3 color2;
  
  void main() {
    float energyPattern = sin(vUv.x * 20.0 + time * 3.0) * cos(vUv.y * 20.0 + time * 2.0);
    vec3 baseColor = mix(color1, color2, energyPattern * 0.5 + 0.5);
    float glow = sin(time * 2.0 + vPosition.z * 5.0) * 0.3 + 0.7;
    float edge = smoothstep(0.3, 0.8, 1.0 - length(vUv - 0.5));
    
    vec3 finalColor = baseColor * glow + edge * 0.5;
    finalColor *= 1.0 + hover * 0.5;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
  `
)

```

---

## 📊 Resultados Visuales

### 📌GIF animado:


![Demostración de shader en corazón con sistema de partículas alrededor](./threejs/taller21/public/DemostracionTallerShaderDinamico.gif)

---

## 🧩 Prompts Usados

Prompts utilizados:

```text
"Como crear un shader que simule agua en corazon"
"Como agrego un sistema de particulas alrededor de este corazon"
```


---

## 💬 Reflexión Final

Responde en 2-3 párrafos:

- ¿Qué aprendiste o reforzaste con este taller? A aplicar un shader a un objeto y a crear un corazón en threejs
- ¿Qué parte fue más compleja o interesante? Aplicar el shader correctamente
- ¿Qué mejorarías o qué aplicarías en futuros proyectos? Simular fuego

---


Describe exactamente lo que hiciste tú:

```markdown
- Programé el corazón como objeto central
- Generé los GIFs y documentación
- Integré el codigo suministrado por modelo de IA
```

---

## ✅ Checklist de Entrega

- [x] Carpeta `YYYY-MM-DD_nombre_taller`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés

---