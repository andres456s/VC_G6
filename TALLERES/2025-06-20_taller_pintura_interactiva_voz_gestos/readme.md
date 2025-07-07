# taller_pintura_interactiva_voz_gestos

Este proyecto artístico permite pintar sin usar teclado ni mouse, solo con **movimientos de la mano** y **comandos de voz**. Combina tecnologías de visión por computadora y reconocimiento de voz para ofrecer una experiencia expresiva y libre.

---

## ¿Cómo funciona?

- **MediaPipe Hands** detecta la posición de la mano en tiempo real.
  - El **dedo índice** actúa como pincel.
- **speech_recognition** escucha comandos de voz cada ciertos segundos.
  - Puedes decir: `"rojo"`, `"verde"`, `"limpiar"`, `"guardar"`, `"pincel"`, `"grueso"`, etc.
- La pintura se actualiza en vivo mientras te mueves frente a la cámara.
- Puedes guardar tu obra diciendo “guardar”.

---

## Proceso en acción

### Dibujo con gestos
![](images/1.jpg)

### Cambiando color con voz
![](images/2.jpg)

### Resultado final
![](images/3.jpg)

---

## Código relevante

Todo el código del taller está disponible en el archivo:

python/taller_pintura_interactiva_voz_gestos`  
Se puede ejecutar en un entorno local que tenga cámara y micrófono habilitados.

---

## Prompts usados

Este proyecto **no usa prompts generativos**, sino comandos de voz simples definidos en español:

- `"rojo"`, `"verde"`, `"azul"` → Cambiar color del pincel
- `"limpiar"` → Borra el lienzo
- `"guardar"` → Guarda la imagen en `/obras/`
- `"grueso"` / `"pincel"` → Cambia el grosor del trazo

---

