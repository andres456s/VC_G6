const container = document.getElementById("container");


const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
  -640 / 2, 640 / 2, 480 / 2, -480 / 2, 0.1, 1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
container.appendChild(renderer.domElement);


const loader = new THREE.TextureLoader();
loader.load("resultados/deteccion.png", (texture) => {
  const background = new THREE.Mesh(
    new THREE.PlaneGeometry(640, 480),
    new THREE.MeshBasicMaterial({ map: texture })
  );
  scene.add(background);
});


fetch("resultados/deteccion.json")
  .then(res => res.json())
  .then(data => {
    data.objects.forEach(obj => {
      const color = obj.class === "person" ? 0xff0000 : 0x00ff00;


      const geometry = new THREE.BoxGeometry(obj.w, obj.h, 1);
      const material = new THREE.MeshBasicMaterial({ color, wireframe: true });
      const box = new THREE.Mesh(geometry, material);
      box.position.set(obj.x + obj.w / 2 - 320, -(obj.y + obj.h / 2 - 240), 1);
      scene.add(box);


      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.color = "white";
      div.style.fontSize = "12px";
      div.innerText = `${obj.class} (${obj.confidence})`;
      document.body.appendChild(div);

      const updateTextPosition = () => {
        const vector = new THREE.Vector3();
        vector.set(
          obj.x + obj.w / 2 - 320,
          -(obj.y + obj.h / 2 - 240),
          1
        );
        vector.project(camera);
        const x = (vector.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
        const y = ( -vector.y * 0.5 + 0.5) * renderer.domElement.clientHeight;
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
      };

      renderer.setAnimationLoop(() => {
        updateTextPosition();
        renderer.render(scene, camera);
      });
    });
  });


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
