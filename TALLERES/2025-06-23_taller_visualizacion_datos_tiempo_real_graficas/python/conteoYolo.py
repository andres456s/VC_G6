from ultralytics import YOLO
import cv2, time
import numpy as np
import matplotlib.pyplot as plt

# Cargar modelo YOLO (asegúrate de tener yolov8n.pt)
model = YOLO('yolov8n.pt')

# Inicializar captura de cámara
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    raise RuntimeError("No se puede abrir la cámara")

# Configurar gráfica en vivo
plt.ion()
fig, ax = plt.subplots()
counts, times = [], []
line, = ax.plot(times, counts, '-o')
ax.set_xlabel('Segundos')
ax.set_ylabel('Conteo de objetos')
start_time = time.time()

print("Presiona 'q' en la ventana de video para salir")

while True:
    ret, frame = cap.read()
    if not ret: break

    t = time.time() - start_time
    results = model.predict(source=frame, stream=False)[0]
    count = len(results.boxes)

    # Actualizar datos
    times.append(t)
    counts.append(count)
    line.set_data(times, counts)
    ax.relim()
    ax.autoscale_view()
    fig.canvas.draw()
    fig.canvas.flush_events()

    # Dibujar detecciones y mostrar FPS
    for box in results.boxes:
        x1,y1,x2,y2 = box.xyxy[0].cpu().numpy().astype(int)
        conf, cls = float(box.conf[0]), int(box.cls[0])
        label = model.names[cls]
        cv2.rectangle(frame, (x1,y1),(x2,y2),(0,255,0),2)
        cv2.putText(frame, f'{label} {conf:.2f}', (x1,y1-5),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,255,0), 2)
    fps = 1 / (time.time() - (start_time + t))
    cv2.putText(frame, f'FPS: {fps:.1f}', (10,30),
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,0,255), 2)

    # Mostrar video con detecciones
    cv2.imshow('YOLOv8 + Gráfica en vivo', frame)
    if cv2.waitKey(1) == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
