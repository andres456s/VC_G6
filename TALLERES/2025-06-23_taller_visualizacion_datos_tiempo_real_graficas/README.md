# 🧪 Taller - Visualización de Datos en Tiempo Real: Gráficas en Movimiento


## 📅 Fecha
`2025-06-23` – Fecha de realización

---

## 🎯 Objetivo del Taller

Capturar conteo de objetos y visualizarlos en tiempo real mediante gráficos dinámicos. Se busca explorar cómo enlazar datos numéricos con representaciones gráficas actualizadas en vivo, útiles en monitoreo, visualización científica y dashboards.
---

## 🧠 Conceptos Aprendidos

Lista los principales conceptos aplicados:

- [x] Detección de objetos
- [x] Graficos en tiempo real




---

## 🔧 Herramientas y Entornos

Especifica los entornos usados:

- Visual Studio Codde
- Python / Yolo



---

## 📁 Estructura del Proyecto

```
2025-06-23_taller_visualizacion_datos_tiempo_real_graficas/
├── python/               #  python/, entorno de ejecución
    ├── conteoYolo.py/                 # Código fuente 
    ├── DemostracionVisualizaciónDatosTiempoReal.gif/   # Gif
    ├── requirements.txt/            #  Archivo para instalar dependencias
├── README.md
```


---

## 🧪 Implementación

Explica el proceso:

### 🔹 Etapas realizadas
1. Capturar video.
2. Usar modelo Yolo para identificar objetos.
3. Implementar gráfico en tiempo real.
4. Visualizar el resultado y guardar los resultados.


### 🔹 Código relevante

Fragmento que resume el corazón del taller:

```py
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

```

---

## 📊 Resultados Visuales

### 📌 GIFs animado:


![Demostración del funcionamiento de la identificación de objetos en tiempo real con gráfica](../2025-06-23_taller_visualizacion_datos_tiempo_real_graficas/python/DemostracionVisualizacionDatosTiempoReal.gif)



---

## 🧩 Prompts Usados

Prompts utilizados:


- Dame el codigo para implementar un modelo Yolo de identificación de objetos
- Implementa un grafico en tiempo real sobre la cantidad de objetos



---

## 💬 Reflexión Final


- ¿qué tan útil es visualizar datos en tiempo real? Muchisimo, son resultados para mostrar a cualquier cliente y facilita mostrar la importancia del modelo hecho.
- ¿qué dificultades encontraste? Un poco pesado para correr en mi pc

---

## 👥 Contribuciones 

Describe exactamente lo que hiciste tú:

```markdown
- Programé la identificación de la camara.
- Integré el código generado por modelos de IA.
- Generé documentación y GIFS.
```

---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-06-23_taller_visualizacion_datos_tiempo_real_graficas`
- [x] GIF incluido con nombre descriptivo 
- [x] Visualizaciones o métricas exportadas
- [x] Visualización dinámica de datos en tiempo real.
- [x] Gráfico funcional (líneas, barras o puntos).
- [x] Fuente de datos conectada al gráfico (real).
- [x] Código modular, limpio y comentado.
- [x] README completo con explicación, evidencia visual (GIF) y prompts.
- [x] Commits descriptivos en inglés

---