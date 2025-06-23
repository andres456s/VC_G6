from ultralytics import YOLO
import cv2
import time
import numpy as np

# Carga del modelo
model = YOLO('yolov8n.pt')  # versión “nano” ligera y rápida :contentReference[oaicite:3]{index=3}

cap = cv2.VideoCapture(0)
if not cap.isOpened():
    raise IOError("No se puede abrir la cámara")

font = cv2.FONT_HERSHEY_SIMPLEX
prev_time = 0

while True:
    ret, frame = cap.read()
    if not ret: break

    start = time.time()
    results = model.predict(source=frame, stream=False)[0]  # predicción en un frame :contentReference[oaicite:4]{index=4}
    infer_time = time.time() - start
    fps = 1 / infer_time

    # Dibujar cajas y etiquetas
    for box in results.boxes:
        x1, y1, x2, y2 = box.xyxy[0].cpu().numpy().astype(int)
        conf = float(box.conf[0])
        cls = int(box.cls[0])
        label = model.names[cls]
        cv2.rectangle(frame, (x1,y1),(x2,y2),(0,255,0),2)
        cv2.putText(frame, f'{label} {conf:.2f}', (x1, y1 - 5),
                    font, 0.6, (0,255,0), 2)

    # Mostrar métricas
    cv2.putText(frame, f'Time: {infer_time*1000:.1f} ms FPS: {fps:.1f}', (10,30),
                font, 0.7, (0,0,255), 2)

    cv2.imshow('YOLOv8 Realtime', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
