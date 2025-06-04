import os
import pyaudio
import wave
from pocketsphinx import AudioFile
import tkinter as tk
from pythonosc import udp_client
import pyttsx3
import threading

# --- CONFIGURACIÓN DE MODELOS ---
MODELO_ES_PATH = r"CIEMPIESS_Spanish_Models_581h/CIEMPIESS_Spanish_Models_581h/es-Es/581HCDCONT10000SPA"      # Modelo acústico (carpeta que contiene mdef, means, variances, etc)
DICCIONARIO_PATH = r"CIEMPIESS_Spanish_Models_581h/CIEMPIESS_Spanish_Models_581h/es-Es/581HCDCONT10000SPA.dic"  # Diccionario
MODELO_LENGUAJE_PATH = r"CIEMPIESS_Spanish_Models_581h/CIEMPIESS_Spanish_Models_581h/es-Es/581HCDCONT10000SPA.lm.bin"  # Modelo de lenguaje (LM)

COMANDOS = {
    "rojo": ("COLOR", "red"),
    "azul": ("COLOR", "blue"),
    "girar": ("ACCION", "rotate"),
    "iniciar": ("ACCION", "start"),
    "detener": ("ACCION", "stop")
}

# --- OSC ---
OSC_IP = "127.0.0.1"
OSC_PORT = 8000

# --- GRABACIÓN Y RECONOCIMIENTO ---
def grabar_audio(nombre_archivo="grabacion.wav", segundos=3):
    formato = pyaudio.paInt16
    canales = 1
    tasa_muestreo = 16000
    chunk = 1024

    audio = pyaudio.PyAudio()
    stream = audio.open(format=formato, channels=canales, rate=tasa_muestreo, input=True, frames_per_buffer=chunk)
    print("Grabando...")
    frames = []
    for _ in range(0, int(tasa_muestreo / chunk * segundos)):
        data = stream.read(chunk)
        frames.append(data)
    print("Grabación finalizada.")
    stream.stop_stream()
    stream.close()
    audio.terminate()
    with wave.open(nombre_archivo, 'wb') as wf:
        wf.setnchannels(canales)
        wf.setsampwidth(audio.get_sample_size(formato))
        wf.setframerate(tasa_muestreo)
        wf.writeframes(b''.join(frames))

def reconocer_audio(nombre_archivo="grabacion.wav"):
    config = {
        'hmm': MODELO_ES_PATH,
        'lm': MODELO_LENGUAJE_PATH,
        'dict': DICCIONARIO_PATH,
        'logfn': os.devnull
    }
    audio = AudioFile(audio_file=nombre_archivo, **config)
    resultado = ""
    for frase in audio:
        if isinstance(frase, str):
            resultado += frase + " "
        elif hasattr(frase, "hypothesis"):
            resultado += frase.hypothesis() + " "
    resultado = resultado.strip()
    print("Reconocido:", resultado)
    return resultado

def buscar_comando(texto):
    if not texto:
        print("No se reconoció ningún texto.")
        return None, None
    texto = texto.lower()
    for palabra, (tipo, valor) in COMANDOS.items():
        if palabra in texto:
            print(f"Comando detectado: {palabra} ({tipo}:{valor})")
            return tipo, valor
    print("Ningún comando reconocido en el texto.")
    return None, None

# --- VISUALIZACIÓN EN TKINTER ---
class VisualApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Comando de Voz Visual")
        self.canvas = tk.Canvas(root, width=400, height=400)
        self.canvas.pack()
        self.color = "white"
        self.rect = self.canvas.create_rectangle(100, 100, 300, 300, fill=self.color)
        self.angle = 0

    def cambiar_color(self, color):
        self.color = color
        self.canvas.itemconfig(self.rect, fill=color)

    def girar(self):
        self.angle = (self.angle + 30) % 360
        self.canvas.delete(self.rect)
        # Simulación visual de "girar": cambio de color por ángulo
        colores = ["red", "green", "blue", "yellow", "purple", "cyan"]
        color = colores[(self.angle // 60) % len(colores)]
        self.rect = self.canvas.create_rectangle(100, 100, 300, 300, fill=color)

# --- RETROALIMENTACIÓN POR VOZ ---
def hablar(texto):
    engine = pyttsx3.init()
    engine.say(texto)
    engine.runAndWait()

# --- ENVÍO OSC ---
osc_client = udp_client.SimpleUDPClient(OSC_IP, OSC_PORT)
def enviar_osc(tipo, valor):
    osc_path = f"/{tipo.lower()}"
    print(f"Enviando OSC: {osc_path} {valor}")
    osc_client.send_message(osc_path, valor)

# --- LÓGICA PRINCIPAL ---
def ejecutar_comando(tipo, valor, app):
    if tipo == "COLOR":
        app.cambiar_color(valor)
        hablar(f"Cambiando color a {valor}")
        enviar_osc(tipo, valor)
    elif tipo == "ACCION":
        if valor == "rotate":
            app.girar()
            hablar("Girando")
        elif valor == "start":
            hablar("Iniciando")
        elif valor == "stop":
            hablar("Deteniendo")
        enviar_osc(tipo, valor)
    else:
        hablar("No entendí el comando")

def ciclo_voz(app):
    grabar_audio()
    texto = reconocer_audio()
    tipo, valor = buscar_comando(texto)
    if tipo and valor:
        ejecutar_comando(tipo, valor, app)
    else:
        hablar("No se reconoció un comando válido")

def con_hilo(app):
    threading.Thread(target=ciclo_voz, args=(app,)).start()

if __name__ == "__main__":
    root = tk.Tk()
    app = VisualApp(root)
    # Reemplaza esto:
# boton = tk.Button(root, text="Escuchar comando", command=lambda: con_hilo(app), font=("Arial", 16))

# Por esto:
    boton = tk.Button(root, text="Escuchar comando", command=lambda: ciclo_voz(app), font=("Arial", 16))
    boton.pack(pady=20)
    instruccion = tk.Label(root, text="Di: rojo, azul, girar, iniciar, detener", font=("Arial", 12))
    instruccion.pack()
    root.mainloop()