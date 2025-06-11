# 🌐 Taller: WebSockets e Interacción Visual en Tiempo Real

## 📅 Fecha
`2025-06-03`

---

## 🎯 Objetivo del Taller

Explorar la integración de WebSockets con Three.js y Python para crear experiencias interactivas en tiempo real en la web. Aprender a establecer comunicaciones bidireccionales entre el cliente y el servidor, permitiendo la actualización dinámica de escenas 3D en el navegador y el procesamiento de datos en el servidor.

---

## 🧠 Conceptos Aprendidos

- [x] Fundamentos de WebSockets y su implementación en aplicaciones web.
- [x] Integración de Three.js con WebSockets para la actualización en tiempo real de escenas 3D.
- [x] Implementación de un servidor WebSocket en Python utilizando `websockets`.
- [x] Manejo de eventos y sincronización de datos entre múltiples clientes.
- [x] Optimización de la comunicación para reducir la latencia y mejorar la experiencia del usuario.

---

## 🔧 Herramientas y Entornos

- **Frontend:**
  - Three.js (JavaScript)
  - React (Opcional para la interfaz de usuario)

- **Backend:**
  - Python
  - Librería `websockets` para la implementación del servidor WebSocket

---

## 📁 Estructura del Proyecto

```
2025-06-03_Taller WebSockets e interacción visual en tiempo real/
├── threejs/                    # Implementación en Three.js
│   ├── src/
│   │   ├── App.jsx             # Componente principal de la aplicación
│   │   └── WebSocketManager.js # Manejo de la conexión WebSocket
├── python/                     # Implementación del servidor WebSocket en Python
│   └── server.py               # Configuración y manejo de conexiones
├── public/
│   └── index.html              # Página principal
└── README.md                   # Documentación del taller
```

---

## 🧪 Implementación

### 🔹 Etapas realizadas

1. **Configuración del servidor WebSocket en Python**: Implementación de un servidor en Python utilizando la librería `websockets` para manejar las conexiones entrantes de los clientes.

2. **Establecimiento de la conexión en el cliente**: Creación de una conexión WebSocket desde el navegador para enviar y recibir datos en tiempo real.

3. **Integración con Three.js**: Actualización dinámica de la escena 3D en el cliente en respuesta a los mensajes recibidos a través de WebSocket.

4. **Sincronización de múltiples clientes**: Implementación de lógica para asegurar que todos los clientes conectados vean la misma información en tiempo real.

### 🔹 Código real usado para la conexión WebSocket en el cliente

Fragmento del archivo [`threejs/src/WebSocketManager.js`](threejs/src/WebSocketManager.js):

```javascript
const socket = new WebSocket('ws://localhost:8765');

socket.onopen = () => {
  console.log('Conexión WebSocket establecida');
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Actualizar la escena 3D con los datos recibidos
};

socket.onerror = (error) => {
  console.error('Error en la conexión WebSocket:', error);
};

socket.onclose = () => {
  console.log('Conexión WebSocket cerrada');
};
```

### 🔹 Código real usado para el servidor WebSocket en Python

Fragmento del archivo [`python/server.py`](python/server.py):

```python
import asyncio
import websockets
import json

clients = set()

async def register(websocket):
    clients.add(websocket)
    try:
        await websocket.wait_closed()
    finally:
        clients.remove(websocket)

async def handler(websocket, path):
    await register(websocket)
    try:
        async for message in websocket:
            data = json.loads(message)
            # Procesar los datos recibidos y enviar respuestas si es necesario
            await websocket.send(json.dumps({"status": "received", "data": data}))
    except websockets.ConnectionClosed:
        pass

async def main():
    async with websockets.serve(handler, "localhost", 8765):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())
```

---

## 📊 Resultados Visuales

![Grabación-de-pantalla-2025-06-03-133802](https://github.com/user-attachments/assets/81ac1459-9856-41af-96c1-9a02a2394ed0)

---

## 🧩 Prompts Usados

```text
¿Cómo integro WebSockets con Three.js para crear aplicaciones interactivas en tiempo real?
¿Cómo implemento un servidor WebSocket en Python utilizando la librería websockets?
```

---

## 💬 Reflexión Final

- La combinación de WebSockets, Three.js y Python permite crear experiencias interactivas ricas en el navegador.
- La sincronización en tiempo real entre clientes presenta desafíos, pero también oportunidades para mejorar la colaboración en línea.
- Como mejora, se podría implementar autenticación de usuarios para personalizar la experiencia.

---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-06-03_Taller WebSockets e interacción visual en tiempo real`
- [x] Código funcional en las carpetas `threejs/src` y `python/`
- [x] README completo y claro
- [x] Commits descriptivos
