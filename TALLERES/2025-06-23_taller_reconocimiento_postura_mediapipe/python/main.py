import cv2
import numpy as np
import mediapipe as mp
import pygame  # opcional

# Opcional: sonido
pygame.mixer.init()
ding = pygame.mixer.Sound("audio.mp3") if pygame.mixer.get_init() else None

mp_pose = mp.solutions.pose
mp_draw = mp.solutions.drawing_utils
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)

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

cap.release()
cv2.destroyAllWindows()
