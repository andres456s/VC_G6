# 🧪 Taller - Reconocimiento de Acciones Simples con Detección de Postura


## 📅 Fecha
`2025-06-23` – Fecha de realización

---

## 🎯 Objetivo del Taller

Implementar el reconocimiento de acciones simples (como sentarse, levantar brazos) usando MediaPipe Pose para detectar la postura corporal. El objetivo es utilizar puntos clave del cuerpo (landmarks) para interpretar la acción y responder visual o sonoramente.

---

## 🧠 Conceptos Aprendidos

Lista los principales conceptos aplicados:

- [x] Detección acciones
- [x] Landmarks
- [x] interpretación de acción
- [x] Respuesta visual y sonora de acción




---

## 🔧 Herramientas y Entornos

Especifica los entornos usados:

- Visual Studio Codde
- Python / MediaPipe



---

## 📁 Estructura del Proyecto

```
2025-06-23_taller_reconocimiento_postura_mediapipe/
├── python/               #  python/, entorno de ejecución
    ├── audio.mp3/                 # Audio 
    ├── DemostracionIdentificacionPostura.gif/   # Código fuente
    ├── main.py/            # Código fuente
    ├── requirements.txt/            #  Archivo para instalar dependencias
├── README.md
```


---

## 🧪 Implementación

Explica el proceso:

### 🔹 Etapas realizadas
1. Capturar video.
2. Usar mediaPipe para identificar posturas.
3. Mostrar en pantalla acción detectada.
4. Visualizar el resultado y guardar los resultados.


### 🔹 Código relevante

Fragmento que resume el corazón del taller:

```py
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        print("No se detecta imagen de la cámara")
        break

    h, w = frame.shape[:2]
    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    res = pose.process(img_rgb)

    action = "Esperando..."
    if res.pose_landmarks:
        mp_draw.draw_landmarks(frame, res.pose_landmarks, mp_pose.POSE_CONNECTIONS)
        lm = res.pose_landmarks.landmark
        y = lambda idx: lm[idx].y * h

        # Brazos arriba
        if y(mp_pose.PoseLandmark.LEFT_WRIST) < y(mp_pose.PoseLandmark.NOSE) \
           and y(mp_pose.PoseLandmark.RIGHT_WRIST) < y(mp_pose.PoseLandmark.NOSE):
            action = "💪 Brazos arriba!"
            if ding: ding.play()
        # Sentado
        elif y(mp_pose.PoseLandmark.LEFT_HIP) > y(mp_pose.PoseLandmark.LEFT_KNEE) \
             and y(mp_pose.PoseLandmark.RIGHT_HIP) > y(mp_pose.PoseLandmark.RIGHT_KNEE):
            action = "🪑 Sentado"
            if ding: ding.play()
        else:
            action = "Cuerpo neutro"

    cv2.putText(frame, action, (30,50),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)
    
    cv2.imshow("Detección de Pose", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

```

---

## 📊 Resultados Visuales

### 📌 GIFs animado:


![Demostración del funcionamiento de la identificación de postura con MediaPipe](../2025-06-23_taller_reconocimiento_postura_mediapipe/python/DemostracionIdentificacionPostura.gif)



---

## 🧩 Prompts Usados

Prompts utilizados:


- Como uso mediaPipe para identificar posturas
- Como accedo a mi camara para luego idenficar con mediapipe



---

## 💬 Reflexión Final


-  ¿hubo falsos positivos? si, por ejemplo al estar muy cerca marcaba que estaba sentado
- ¿qué acción fue más fácil de detectar? los brazos arriba

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

- [x] Carpeta `2025-06-23_taller_reconocimiento_postura_mediapipe`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo 
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Captura de pose humana con landmarks funcionales.
- [x] Al menos dos acciones correctamente reconocidas.
- [x] Retroalimentación visual o sonora inmediata.
- [x] Código organizado, comentado y reutilizable.
- [x] README completo con explicación, evidencia visual (GIF) y prompts.
- [x] Commits descriptivos en inglés

---