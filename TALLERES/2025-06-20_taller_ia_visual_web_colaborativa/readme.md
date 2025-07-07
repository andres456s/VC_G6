# taller_ia_visual_web_colaborativa


---

## Descripción general

Este proyecto integra un sistema de visión por computador (Python) con una interfaz web interactiva (Three.js) para **visualizar, compartir y comprender detecciones visuales de manera colaborativa**.

### ¿Qué hace el sistema?

- Captura imágenes desde webcam o video.
- Aplica un modelo de detección (YOLOv8 en este caso).
- Exporta:
  - Imagen con anotaciones (`deteccion.png`)
  - Datos en JSON (`deteccion.json`)
  - Estadísticas en CSV (`resumen.csv`)
- Muestra todo en una **web visual 3D**:
  - Fondo con la imagen procesada.
  - Cajas 3D sobre los objetos detectados.
  - Etiquetas flotantes con clase y confianza.

---

## Resultados visuales

### 🔎 Interfaz Web en Three.js  
Visualización de detecciones sobre la imagen original.

![detecciones_3d](resultados/web_demo.gif)

### Detección desde Python  
Captura de una imagen con bounding boxes y exportación del JSON.

![detecciones_python](resultados/procesamiento.gif)

---

## Flujo del sistema

1. **Captura y análisis en Python**  
   Usamos `ultralytics.YOLO` para detectar objetos en una imagen o frame de video.

2. **Exportación estructurada**  
   Se generan:
   - Imagen anotada con bounding boxes.
   - JSON con coordenadas, clases, confianza y timestamp.
   - CSV resumen con estadísticas por clase.

3. **Visualización web en Three.js**  
   Se crea una escena 3D con:
   - Fondo 2D: la imagen procesada.
   - Cajas 3D (`THREE.BoxGeometry`) sobre cada objeto detectado.
   - Etiquetas flotantes con información textual.

---

## Archivos generados

- `resultados/deteccion.png`: Imagen procesada.
- `resultados/deteccion.json`: Datos en formato estructurado.
- `resultados/resumen.csv`: Estadísticas agregadas.

---

## 📌 Código relevante

- `python/ia_exportador.py`: Captura, análisis, anotación y exportación.
- `web/index.html`: Página web básica para visualizar resultados.
- `web/main.js`: Código Three.js para cargar imagen y JSON.
- `web/style.css`: Estilo de la visualización.

---

## Prompts usados

No se usaron modelos generativos de texto en esta versión.  
Todo el análisis se basó en modelos entrenados de detección con YOLOv8 y visualización 3D manual.

---

## Reflexión

Visualizar los resultados de un modelo IA en una interfaz clara y compartible hace una gran diferencia.  
Permite validar, presentar y **comunicar el funcionamiento de la IA de forma tangible**, incluso a personas no técnicas.  

Además, integrar Python con web (Three.js) abre la puerta a sistemas colaborativos, monitoreo en vivo o plataformas educativas.

