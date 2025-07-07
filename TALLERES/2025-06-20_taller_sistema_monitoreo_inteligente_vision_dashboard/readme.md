# taller_sistema_monitoreo_inteligente_vision_dashboard

Este proyecto implementa un sistema básico de monitoreo inteligente que usa visión por computador para detectar personas u objetos, mostrar estadísticas visuales en tiempo real, y registrar eventos relevantes automáticamente.

---

## ¿Cómo funciona?

- El sistema utiliza la cámara del equipo para capturar video en tiempo real.
- Detecta objetos usando un modelo liviano (`yolov4-tiny`) a través de la librería `cvlib`.
- Cuando se detecta una **persona**, el sistema:
  - Guarda una captura de la imagen en `/capturas/`
  - Registra un evento en un archivo CSV dentro de `/logs/`
- Al finalizar la ejecución, se generan gráficos automáticos en `/images/` que muestran:
  - Un conteo total de objetos detectados.
  - Una línea temporal de detecciones de personas.

---

## Visualizaciones del Sistema

### Estadísticas de detección total
![](images/1.jpg)

### Línea temporal de detecciones de personas
![](images/2.jpg)

---

##  Log Generado

```csv
timestamp,evento,clase,confianza
2025-04-22 14:23:08,Persona detectada,person,0.92
2025-04-22 14:23:09,Captura guardada,person,0.92

```
---
Reflexión y Mejoras Futuras
Este sistema básico es funcional y puede aplicarse como base para:

Un sistema de seguridad doméstico.

Monitoreo de espacios públicos o aulas.

Automatización de alertas por detección de objetos.

Posibles mejoras:

Integrar notificaciones (correo, Telegram, etc.).

Agregar detección de movimiento y zonas de interés.

Ejecutar el sistema en un dispositivo embebido como Raspberry Pi.

Añadir visualización en web usando dash o streamlit

