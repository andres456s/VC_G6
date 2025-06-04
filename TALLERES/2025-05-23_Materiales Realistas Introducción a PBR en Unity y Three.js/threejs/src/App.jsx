import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const App = () => {
    const [roughness, setRoughness] = useState(1);
    const [metalness, setMetalness] = useState(1);
    const [useMap, setUseMap] = useState(true);
    const [useRoughnessMap, setUseRoughnessMap] = useState(true);
    const [useMetalnessMap, setUseMetalnessMap] = useState(true);
    const [useNormalMap, setUseNormalMap] = useState(true);
    const pbrMaterialRef = useRef(null);

    // Guardar texturas en refs para no recargar
    const texturesRef = useRef({});

    useEffect(() => {
        // Crear la escena
        const scene = new THREE.Scene();

        // Crear la cámara
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        // Crear el renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Añadir luces y muro blanco
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambientLight);
        const directionalLight1 = new THREE.DirectionalLight(0xfff8dc, 2.5);
        directionalLight1.position.set(5, 10, 7.5);
        scene.add(directionalLight1);
        const directionalLight2 = new THREE.DirectionalLight(0xffe066, 2.0);
        directionalLight2.position.set(-5, -10, -7.5);
        scene.add(directionalLight2);
        const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight3.position.set(0, 0, 10);
        scene.add(directionalLight3);

        // const wallGeometry = new THREE.PlaneGeometry(10, 6);
        // const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        // const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        // wall.position.z = -2.5;
        // scene.add(wall);

        // Cargar texturas PBR solo una vez
        const loader = new THREE.TextureLoader();
        texturesRef.current.map = loader.load('textures/gold/Foil002_1K-JPG_Color.jpg');
        texturesRef.current.roughnessMap = loader.load('textures/gold/Foil002_1K-JPG_Roughness.jpg');
        texturesRef.current.metalnessMap = loader.load('textures/gold/Foil002_1K-JPG_Metalness.jpg');
        texturesRef.current.normalMap = loader.load('textures/gold/Foil002_1K-JPG_NormalGL.jpg');

        // Esfera con material PBR
        const geometry1 = new THREE.SphereGeometry(0.8, 32, 32);
        const pbrMaterial = new THREE.MeshStandardMaterial({
            map: texturesRef.current.map,
            color: 0xffd700,
            roughnessMap: texturesRef.current.roughnessMap,
            metalnessMap: texturesRef.current.metalnessMap,
            normalMap: texturesRef.current.normalMap,
            roughness,
            metalness
        });
        pbrMaterialRef.current = pbrMaterial;
        const pbrSphere = new THREE.Mesh(geometry1, pbrMaterial);
        pbrSphere.position.x = -1.5;
        scene.add(pbrSphere);

        // Esfera con material básico para comparación
        const geometry2 = new THREE.SphereGeometry(0.8, 32, 32);
        const basicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const basicSphere = new THREE.Mesh(geometry2, basicMaterial);
        basicSphere.position.x = 1.5;
        scene.add(basicSphere);

        // Añadir aristas a la esfera básica
        const edges2 = new THREE.EdgesGeometry(geometry2);
        const lineMaterial2 = new THREE.LineBasicMaterial({ color: 0x0000ff });
        const line2 = new THREE.LineSegments(edges2, lineMaterial2);
        line2.position.x = 1.5;
        scene.add(line2);

        // OrbitControls para mover la escena con el mouse
        const controls = new OrbitControls(camera, renderer.domElement);

        // Render loop
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();

        // Limpieza
        return () => {
            renderer.dispose();
            document.body.removeChild(renderer.domElement);
        };
    }, []);

    // Sincronizar valores de roughness, metalness y mapas en tiempo real
    useEffect(() => {
        if (pbrMaterialRef.current && texturesRef.current) {
            pbrMaterialRef.current.roughness = roughness;
            pbrMaterialRef.current.metalness = metalness;
            pbrMaterialRef.current.map = useMap ? texturesRef.current.map : null;
            pbrMaterialRef.current.roughnessMap = useRoughnessMap ? texturesRef.current.roughnessMap : null;
            pbrMaterialRef.current.metalnessMap = useMetalnessMap ? texturesRef.current.metalnessMap : null;
            pbrMaterialRef.current.normalMap = useNormalMap ? texturesRef.current.normalMap : null;
            pbrMaterialRef.current.needsUpdate = true;
        }
    }, [roughness, metalness, useMap, useRoughnessMap, useMetalnessMap, useNormalMap]);

    return (
        <div style={{
            position: "absolute",
            top: 20,
            left: 20,
            background: "rgba(255,255,255,0.9)",
            padding: 16,
            borderRadius: 8,
            zIndex: 10,
            fontFamily: "sans-serif"
        }}>
            <label>
                Roughness:&nbsp;
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={roughness}
                    onChange={e => setRoughness(Number(e.target.value))}
                />
                &nbsp;{roughness}
            </label>
            <br />
            <label>
                Metalness:&nbsp;
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={metalness}
                    onChange={e => setMetalness(Number(e.target.value))}
                />
                &nbsp;{metalness}
            </label>
            <br />
            <label>
                <input
                    type="checkbox"
                    checked={useMap}
                    onChange={e => setUseMap(e.target.checked)}
                />
                &nbsp;Usar map (color)
            </label>
            <br />
            <label>
                <input
                    type="checkbox"
                    checked={useRoughnessMap}
                    onChange={e => setUseRoughnessMap(e.target.checked)}
                />
                &nbsp;Usar roughnessMap
            </label>
            <br />
            <label>
                <input
                    type="checkbox"
                    checked={useMetalnessMap}
                    onChange={e => setUseMetalnessMap(e.target.checked)}
                />
                &nbsp;Usar metalnessMap
            </label>
            <br />
            <label>
                <input
                    type="checkbox"
                    checked={useNormalMap}
                    onChange={e => setUseNormalMap(e.target.checked)}
                />
                &nbsp;Usar normalMap
            </label>
        </div>
    );
};

export default App;