// shaders/liquidShader.js
export const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 pos = position;
  
  // Efecto de onda líquida mejorado
  float waveX = sin(pos.x * 5.0 + uTime * 2.0) * 0.1;
  float waveY = cos(pos.y * 6.0 + uTime * 1.7) * 0.1;
  pos.z += waveX + waveY;
  
  // Influencia del mouse
  float mouseEffect = smoothstep(0.3, 0.7, length(uMouse - 0.5));
  pos.xy += (uMouse - 0.5) * mouseEffect * 0.2;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  vNormal = normal;
  vPosition = pos;
}
`;

export const fragmentShader = `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  // Patrón de ondas mejorado
  float pattern = sin(vPosition.x * 8.0 + uTime) * 
                cos(vPosition.y * 6.0 + uTime * 1.5) * 
                sin(vPosition.z * 4.0 + uTime * 0.7);
  
  // Mezcla de colores con límites definidos
  vec3 baseColor = mix(uColor1, uColor2, 
    smoothstep(-0.5, 0.5, pattern)
  );
  
  // Efecto de brillo controlado
  float glow = sin(uTime * 3.0) * 0.3 + 0.7;
  glow *= 1.0 - length(vPosition) * 0.1;
  
  // Iluminación básica
  vec3 light = vec3(0.5, 1.0, 0.8);
  float lighting = dot(normalize(vNormal), normalize(light)) * 0.7 + 0.3;
  
  gl_FragColor = vec4(baseColor * lighting + glow * 0.3, 1.0);
}
`;