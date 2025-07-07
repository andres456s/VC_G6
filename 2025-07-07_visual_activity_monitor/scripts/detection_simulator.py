"""
Simulador de detección visual para el Monitor de Actividad 3D
Este script simula la funcionalidad de OpenCV/YOLO para detectar objetos
y envía los datos via WebSocket a la aplicación React Three Fiber.

Para usar OpenCV real, reemplazar las funciones simulate_* con:
- cv2.VideoCapture() para captura de video
- YOLO model para detección de objetos
- MediaPipe para detección de poses/manos
"""

import asyncio
import websockets
import json
import time
import random
import math
from typing import List, Dict, Tuple

class VisualDetectionSimulator:
    def __init__(self):
        self.is_running = False
        self.frame_count = 0
        self.detection_history = []
        
    def simulate_object_detection(self) -> List[Dict]:
        """
        Simula detección de objetos usando YOLO
        En implementación real, usar: model.predict(frame)
        """
        objects = []
        num_objects = random.randint(0, 5)
        
        object_types = ['person', 'car', 'bicycle', 'dog', 'cat', 'bus']
        
        for i in range(num_objects):
            obj = {
                'id': f'obj_{self.frame_count}_{i}',
                'type': random.choice(object_types),
                'confidence': 0.6 + random.random() * 0.4,
                'bbox': [
                    random.randint(0, 500),  # x
                    random.randint(0, 400),  # y
                    random.randint(50, 150), # width
                    random.randint(80, 200)  # height
                ],
                'center': [
                    random.randint(50, 590),  # center_x
                    random.randint(50, 430)   # center_y
                ]
            }
            objects.append(obj)
            
        return objects
    
    def simulate_movement_detection(self) -> float:
        """
        Simula detección de movimiento usando diferencia de frames
        En implementación real, usar: cv2.absdiff(frame1, frame2)
        """
        # Simular movimiento con función senoidal + ruido
        base_movement = math.sin(time.time() * 0.5) * 0.5 + 0.5
        noise = random.random() * 0.3
        return min(1.0, max(0.0, base_movement + noise))
    
    def simulate_color_analysis(self) -> Tuple[int, int, int]:
        """
        Simula análisis de color dominante
        En implementación real, usar: cv2.kmeans() o histogramas
        """
        # Simular cambios de color basados en tiempo
        t = time.time() * 0.3
        r = int(128 + 127 * math.sin(t))
        g = int(128 + 127 * math.sin(t + 2.094))  # 120 grados
        b = int(128 + 127 * math.sin(t + 4.188))  # 240 grados
        return (r, g, b)
    
    def process_frame(self) -> Dict:
        """
        Procesa un frame simulado y extrae todas las métricas
        """
        objects = self.simulate_object_detection()
        movement = self.simulate_movement_detection()
        dominant_color = self.simulate_color_analysis()
        
        # Contar personas específicamente
        people_count = len([obj for obj in objects if obj['type'] == 'person'])
        
        detection_data = {
            'timestamp': int(time.time() * 1000),
            'frame_id': self.frame_count,
            'people_count': people_count,
            'objects': objects,
            'movement_intensity': movement,
            'dominant_color': list(dominant_color),
            'fps': 5.0  # FPS simulado
        }
        
        # Mantener historial para análisis
        self.detection_history.append(detection_data)
        if len(self.detection_history) > 100:  # Mantener últimos 100 frames
            self.detection_history.pop(0)
            
        self.frame_count += 1
        return detection_data
    
    async def send_data_websocket(self, websocket, path):
        """
        Envía datos via WebSocket a la aplicación React
        """
        print(f"Cliente conectado: {websocket.remote_address}")
        
        try:
            while self.is_running:
                detection_data = self.process_frame()
                
                # Enviar datos como JSON
                await websocket.send(json.dumps(detection_data))
                
                # Log para debugging
                print(f"Frame {self.frame_count}: {detection_data['people_count']} personas, "
                      f"movimiento: {detection_data['movement_intensity']:.2f}")
                
                # Esperar antes del siguiente frame (simular FPS)
                await asyncio.sleep(0.2)  # 5 FPS
                
        except websockets.exceptions.ConnectionClosed:
            print("Cliente desconectado")
        except Exception as e:
            print(f"Error: {e}")
    
    async def start_server(self, host='localhost', port=8765):
        """
        Inicia el servidor WebSocket
        """
        self.is_running = True
        print(f"🚀 Iniciando servidor de detección en ws://{host}:{port}")
        print("💡 Para conectar desde React: new WebSocket('ws://localhost:8765')")
        
        async with websockets.serve(self.send_data_websocket, host, port):
            print("✅ Servidor iniciado. Presiona Ctrl+C para detener.")
            try:
                await asyncio.Future()  # Ejecutar indefinidamente
            except KeyboardInterrupt:
                print("\n🛑 Deteniendo servidor...")
                self.is_running = False

def main():
    """
    Función principal para ejecutar el simulador
    """
    print("🧪 Monitor de Actividad Visual 3D - Simulador Python")
    print("=" * 50)
    
    simulator = VisualDetectionSimulator()
    
    try:
        asyncio.run(simulator.start_server())
    except KeyboardInterrupt:
        print("\n👋 Simulador detenido por el usuario")

if __name__ == "__main__":
    main()

"""
INSTRUCCIONES DE USO:

1. Instalar dependencias:
   pip install websockets asyncio

2. Para usar OpenCV real (opcional):
   pip install opencv-python ultralytics mediapipe

3. Ejecutar el simulador:
   python detection_simulator.py

4. El simulador enviará datos a ws://localhost:8765
   La aplicación React se conectará automáticamente

ESTRUCTURA DE DATOS ENVIADOS:
{
    "timestamp": 1704067200000,
    "frame_id": 123,
    "people_count": 2,
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
    "dominant_color": [120, 180, 200],
    "fps": 5.0
}

INTEGRACIÓN CON OPENCV REAL:
Para usar detección real, reemplazar las funciones simulate_* con:

import cv2
from ultralytics import YOLO

def real_object_detection(self, frame):
    model = YOLO('yolov8n.pt')
    results = model(frame)
    # Procesar results.boxes para extraer objetos
    
def real_movement_detection(self, frame1, frame2):
    diff = cv2.absdiff(frame1, frame2)
    gray = cv2.cvtColor(diff, cv2.COLOR_BGR2GRAY)
    return cv2.sumElems(gray)[0] / (frame.shape[0] * frame.shape[1])
"""
