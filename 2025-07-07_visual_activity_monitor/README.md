# 🧪 Monitor de Actividad Visual en 3D

Sistema integrado de detección visual con visualización reactiva en tiempo real que combina procesamiento de imágenes con Python y visualización 3D interactiva usando React Three Fiber.

## 🎯 Objetivo

Crear una escena 3D que se adapte dinámicamente según datos provenientes de un sistema de visión por computador, simulando aplicaciones como:
- Sistemas de vigilancia inteligente
- Arte generativo reactivo
- Interfaces de realidad aumentada
- Monitoreo de espacios públicos

## 🏗️ Arquitectura del Sistema

\`\`\`
┌─────────────────┐    WebSocket    ┌─────────────────┐
│   Python        │ ──────────────► │   React Three   │
│   OpenCV/YOLO   │    JSON Data    │   Fiber (3D)    │
│   Detection     │                 │   Visualization │
└─────────────────┘                 └─────────────────┘
\`\`\`

## 📊 Datos Transmitidos

El sistema envía los siguientes datos en tiempo real:

\`\`\`json
{
  "timestamp": 1704067200000,
  "people_count": 3,
  "objects": [
    {
      "id": "obj_123_0",
      "type": "person",
      "confidence": 0.85,
      "bbox": [100, 150, 80, 120],
      "center": [140, 210]
    }
  ],
  "movement_intensity": 0.75,
  "dominant_color": [120, 180, 200]
}
\`\`\`

## 🎮 Funcionalidades 3D Reactivas

### Objetos Reactivos
- **Escala**: Proporcional al número de personas detectadas
- **Color**: Basado en el color dominante de la imagen
- **Rotación**: Velocidad según intensidad de movimiento
- **Emisión**: Brillo según actividad detectada

### Visualización en Tiempo Real
- **Etiquetas flotantes**: Muestran objetos detectados con confianza
- **Grid de referencia**: Para orientación espacial
- **Controles de cámara**: Órbita, zoom y paneo
- **Indicadores de estado**: Conexión y métricas en vivo

## 🚀 Instalación y Uso

### Requisitos
\`\`\`bash
# Para el simulador Python
pip install websockets asyncio

# Para OpenCV real (opcional)
pip install opencv-python ultralytics mediapipe
\`\`\`

### Ejecución

1. **Iniciar el simulador Python**:
\`\`\`bash
python scripts/detection_simulator.py
\`\`\`

2. **Iniciar la aplicación React**:
\`\`\`bash
npm run dev
\`\`\`

3. **Abrir en navegador**: `http://localhost:3000`

## 🔧 Configuración Avanzada

### Integración con OpenCV Real

Para usar detección real en lugar del simulador, modificar `detection_simulator.py`:

```python
import cv2
from ultralytics import YOLO

class RealVisualDetection:
    def __init__(self):
        self.model = YOLO('yolov8n.pt')
        self.cap = cv2.VideoCapture(0)
    
    def detect_objects(self, frame):
        results = self.model(frame)
        return self.process_results(results)
