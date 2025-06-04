// Requiere la librería oscP5
import oscP5.*;
import netP5.*;

OscP5 oscP5;

color currentColor = color(255,255,255);
boolean girando = false;
float angulo = 0;
boolean iniciado = false;

void setup() {
  size(500, 500);
  oscP5 = new OscP5(this, 8000); // Puerto debe coincidir con el del script Python
  background(currentColor);
  textAlign(CENTER, CENTER);
  textSize(32);
}

void draw() {
  background(currentColor);
  pushMatrix();
  translate(width/2, height/2);
  if (girando) {
    angulo += 0.05;
    rotate(angulo);
  }
  fill(150);
  rectMode(CENTER);
  rect(0, 0, 200, 200);
  popMatrix();

  // Estado
  fill(0);
  if (iniciado) {
    text("INICIADO", width/2, 60);
  }
}

// Recibe mensajes OSC desde Python
void oscEvent(OscMessage theOscMessage) {
  String addr = theOscMessage.addrPattern();
  if (addr.equals("/color")) {
    String colorName = theOscMessage.get(0).stringValue();
    if (colorName.equals("red"))    currentColor = color(255,0,0);
    if (colorName.equals("blue"))   currentColor = color(0,0,255);
    if (colorName.equals("green"))  currentColor = color(0,255,0);
    if (colorName.equals("yellow")) currentColor = color(255,255,0);
    if (colorName.equals("purple")) currentColor = color(200,0,255);
    if (colorName.equals("cyan"))   currentColor = color(0,255,255);
  }
  if (addr.equals("/accion")) {
    String accion = theOscMessage.get(0).stringValue();
    if (accion.equals("rotate")) girando = !girando;
    if (accion.equals("start")) iniciado = true;
    if (accion.equals("stop")) iniciado = false;
  }
}
