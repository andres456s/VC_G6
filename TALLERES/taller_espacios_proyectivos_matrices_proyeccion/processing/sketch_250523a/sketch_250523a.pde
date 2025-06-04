boolean usePerspective = true;

void setup() {
  size(800, 600, P3D);
  noStroke();
}

void draw() {
  background(240);
  
  // Cambiar tipo de cámara
  if (usePerspective) {
    perspective();  // cámara con efecto de profundidad
  } else {
    ortho();        // cámara ortográfica (sin perspectiva)
  }
  
  // Posicionar cámara (puedes usar orbitControl si usas PeasyCam)
  camera(width/2.0, height/2.0, 500,  width/2.0, height/2.0, 0,  0, 1, 0);
  
  // Luz
  lights();
  
  // Dibujar objetos a diferentes profundidades (eje Z)
  pushMatrix();
  translate(width/2 - 150, height/2, 0);
  fill(255, 100, 100);
  box(50);
  popMatrix();

  pushMatrix();
  translate(width/2, height/2, -100);
  fill(100, 100, 255);
  sphere(40);
  popMatrix();

  pushMatrix();
  translate(width/2 + 150, height/2, -200);
  fill(100, 255, 100);
  cone(30, 60);
  popMatrix();
  
  // Mostrar texto
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Cámara: " + (usePerspective ? "Perspectiva (p)" : "Ortográfica (o)"), 10, 10);
}

void keyPressed() {
  if (key == 'p') usePerspective = true;
  if (key == 'o') usePerspective = false;
}

// Cone no está en Processing por defecto, lo implementamos:
void cone(float r, float h) {
  int detail = 24;
  float angle;
  beginShape(TRIANGLE_FAN);
  vertex(0, -h/2, 0);  // Top
  for (int i = 0; i <= detail; i++) {
    angle = TWO_PI * i / detail;
    vertex(r*cos(angle), h/2, r*sin(angle));
  }
  endShape();
  
  // Base
  beginShape(TRIANGLE_FAN);
  vertex(0, h/2, 0);  // Center
  for (int i = 0; i <= detail; i++) {
    angle = TWO_PI * i / detail;
    vertex(r*cos(angle), h/2, r*sin(angle));
  }
  endShape();
}
