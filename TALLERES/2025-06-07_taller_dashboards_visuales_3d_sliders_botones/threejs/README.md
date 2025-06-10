# 🧪 Taller - Dashboards Visuales 3D: Sliders y Botones para Controlar Escenas


## 📅 Fecha
`2025-06-07` – Fecha de realización

---

## 🎯 Objetivo del Taller

Crear interfaces gráficas 3D interactivas que permitan al usuario controlar elementos de una escena, como transformaciones, colores o luces. El propósito es construir paneles funcionales y visuales que conecten entradas de usuario (sliders, botones) con la modificación en tiempo real de objetos 3D.

---

## 🧠 Conceptos Aprendidos

Lista los principales conceptos aplicados:

- [x] Interfaces gráficas 3D interactivas
- [x] Transformaciones gráficas
- [x] Modificación objetos 3D



---

## 🔧 Herramientas y Entornos

Especifica los entornos usados:

- Visual Studio Codde
- Three.js / React Three Fiber



---

## 📁 Estructura del Proyecto

```
2025-06-07_taller_dashboards_visuales_3d_sliders_botones/
├── threejs/               #  threejs/, entorno de ejecución
    ├── public/                 # Gif
    ├── src/                 # Código fuente
        ├── components/            # Carpeta de los componentes
            ├── TorusMesh.jsx/            #  Componente torus
├── README.md
```


---

## 🧪 Implementación

Explica el proceso:

### 🔹 Etapas realizadas
1. Crear torus.
2. Usar leva para crear diferentes sliders para modificar el tamaño, color o textura.
3. Utilizar useControls() para tener control directamente sobre la propiedad.
4. Visualizar el resultado y guardar los resultados.


### 🔹 Código relevante

Fragmento que resume el corazón del taller:

```js
// Controles con Leva: escala, color, auto-rotación y selección de material de 5 opciones
  const { scale, color, autoRotate, materialType } = useControls('Torus Controls', {
    scale: { value: 1, min: 0.1, max: 3, step: 0.01 },
    color: '#ffae00',
    autoRotate: false,
    materialType: {
      label: 'Material',
      options: {
        Standard: 'standard',
        Phong: 'phong',
        Lambert: 'lambert',
        Toon: 'toon',
        Basic: 'basic'
      },
      value: 'standard'
    }
  });

  // Rotación automática
  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  // Elige el componente de material basado en materialType
  const materialProps = { color };
  let materialElement;
  switch (materialType) {
    case 'phong':
      materialElement = <meshPhongMaterial {...materialProps} shininess={100} />;
      break;
    case 'lambert':
      materialElement = <meshLambertMaterial {...materialProps} />;
      break;
    case 'toon':
      materialElement = <meshToonMaterial {...materialProps} gradientMap={null} />;
      break;
    case 'basic':
      materialElement = <meshBasicMaterial {...materialProps} />;
      break;
    case 'standard':
    default:
      materialElement = <meshStandardMaterial {...materialProps} metalness={0.3} roughness={0.7} />;
  }


```

---

## 📊 Resultados Visuales

### 📌 GIFs animado:


![Demostración del funcionamiento del brazo con segmentos en threejs](./public/DemostracionTorusSliders.gif)



---

## 🧩 Prompts Usados

Prompts utilizados:


- Dime como generar sliders para modificar el color, tamaño, textura y rotación de este torus
- Dame 5 materiales para implementar en un figura tipo torus



---

## 💬 Reflexión Final

Responde en 2-3 párrafos:

- ¿Qué aprendiste o reforzaste con este taller? Como afectar directamente las propiedades de un elemento
- ¿Qué parte fue más compleja o interesante? Visualizar los diferentes tipos de texturas.
- ¿Qué mejorarías o qué aplicarías en futuros proyectos? Aplicar a un modelo más complejo.
---

## 👥 Contribuciones 

Describe exactamente lo que hiciste tú:

```markdown
- Programé la figura torus.
- Integré el código generado por modelos de IA.
- Generé documentación y GIFS.
```

---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-06-07_taller_dashboards_visuales_3d_sliders_botones`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo 
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés

---