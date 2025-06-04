import cv2
import numpy as np

# Abre la webcam
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        print("No se pudo acceder a la cámara.")
        break

    # Voltea la imagen para que actúe como espejo
    frame = cv2.flip(frame, 1)

    # Convierte la imagen a espacio de color HSV
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # Rango de color para detectar piel (ajusta si lo necesitas)
    lower_skin = np.array([0, 30, 60], dtype=np.uint8)
    upper_skin = np.array([20, 150, 255], dtype=np.uint8)
    mask = cv2.inRange(hsv, lower_skin, upper_skin)

    # Aplica operaciones morfológicas para limpiar la máscara
    kernel = np.ones((5,5),np.uint8)
    mask = cv2.dilate(mask, kernel, iterations=2)
    mask = cv2.GaussianBlur(mask, (5,5), 100)

    # Encuentra contornos
    contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        # Encuentra el contorno más grande (probablemente la mano)
        max_contour = max(contours, key=cv2.contourArea)
        if cv2.contourArea(max_contour) > 5000:
            # Dibuja el contorno en la imagen original
            cv2.drawContours(frame, [max_contour], -1, (0,255,0), 3)

    # Muestra el resultado
    cv2.imshow('Detección de Mano OpenCV', frame)
    cv2.imshow('Mascara de piel', mask)

    # Salir con 'q'
    if cv2.waitKey(5) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()