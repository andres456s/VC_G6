# 🧪 Taller - Detección de Objetos en Tiempo Real con YOLO y Webcam


## 📅 Fecha
`2025-06-23` – Fecha de realización

---

## 🎯 Objetivo del Taller

Implementar detección de objetos en tiempo real utilizando un modelo YOLOv8 preentrenado, capturando la señal de la webcam del computador. Se busca explorar la eficiencia y precisión del modelo, así como medir el desempeño del sistema en vivo (FPS).

---

## 🧠 Conceptos Aprendidos

Lista los principales conceptos aplicados:

- [x] Detección de objetos
- [x] Desempeño en vivo (FPS)
- [x] Eficiencia y precisión del modelo



---

## 🔧 Herramientas y Entornos

Especifica los entornos usados:

- Visual Studio Codde
- Python / Yolo



---

## 📁 Estructura del Proyecto

```
2025-06-23_taller_yolo_deteccion_webcam_tiempo_real/
├── python/               #  python/, entorno de ejecución
    ├── detect_realtime.py/                 # Código fuente 
    ├── DemostracionDeteccionWebcamTiempoREal.gif/   # Gif
    ├── requirements.txt/            #  Archivo para instalar dependencias
├── README.md
```


---

## 🧪 Implementación

Explica el proceso:

### 🔹 Etapas realizadas
1. Capturar video.
2. Usar modelo Yolo para identificar objetos.
3. Implementar calculo de FPS.
4. Visualizar el resultado y guardar los resultados.


### 🔹 Código relevante

Fragmento que resume el corazón del taller:

```py
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


```

---

## 📊 Resultados Visuales

### 📌 GIFs animado:


![Demostración del funcionamiento de la identificación de objetos con Yolo en tiempo real](../2025-06-23_taller_yolo_deteccion_webcam_tiempo_real/python/DemostracionDeteccionWebcamTiempoReal.gif)



---

## 🧩 Prompts Usados

Prompts utilizados:


- Dame el codigo para implementar un modelo Yolo de identificación de objetos
- Implementa el calculo de FPS en cada toma de la webcam



---

## 💬 Reflexión Final


- ¿cuál fue el FPS promedio? alrededor de 5
- ¿qué objetos se detectaron mejor? Las personas claramente
- ¿cómo afectó el rendimiento? Si es pesado de correr al involucrar la camara directamente.

---

## 👥 Contribuciones 

Describe exactamente lo que hiciste tú:

```markdown
- Programé la identificación de la camara.
- Integré el código generado por modelos de IA.
- Importe modelo Yolo
- Generé documentación y GIFS.
```

---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-06-23_taller_yolo_deteccion_webcam_tiempo_real`
- [x] GIF incluido con nombre descriptivo 
- [x] Visualizaciones o métricas exportadas
- [x] Carga funcional de YOLOv5 o YOLOv8
- [x] Captura en tiempo real desde webcam.
- [x] Detección visual con etiquetas y confianza.
- [x] Cálculo de tiempo de inferencia por frame (FPS).
- [x] Código limpio, modular y comentado.
- [x] README completo con explicación, evidencia visual (GIF) y prompts.
- [x] Commits descriptivos en inglés

---