import {  useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import './App.css'

function RawCube({ a = 2 , b = 0, c = 0 }) {
    const { scene } = useThree();
    const meshRef = useRef();
    const geometryRef = useRef();

    useEffect(() => {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        geometryRef.current = geometry;
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(a, b, c);
        meshRef.current = cube;
        scene.add(cube);

        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        const line = new THREE.LineSegments(edges, lineMaterial);
        line.position.copy(cube.position);
        scene.add(line);

        // Limpieza al desmontar
        return () => {
            scene.remove(cube);
            scene.remove(line);
            geometry.dispose();
            material.dispose();
            edges.dispose();
            lineMaterial.dispose();
        };
    }, [scene, a, b, c]);

    // Animación de vértices en cada frame
         useFrame(({ clock }) => {
        const geometry = geometryRef.current;
        if (!geometry) return;
        const posArray = geometry.attributes.position.array;
        const time = clock.getElapsedTime();
        for (let i = 0; i < posArray.length; i += 3) {
            const x = posArray[i];
            const y = posArray[i + 1];
            const z = posArray[i + 2];
            // Deformación más delicada
            posArray[i + 1] = y + 0.01 * Math.sin(x * 5 + z * 5 + time * 2);
        }
        geometry.attributes.position.needsUpdate = true;
    });
    return null;
}

function RawSphere({ a = 2, b = 0, c = 0 }) {
    const { scene } = useThree();
    const meshRef = useRef();
    const lineRef = useRef();
    const geometryRef = useRef();

    useEffect(() => {
        const geometry = new THREE.SphereGeometry(1, 16, 16);
        geometryRef.current = geometry;

        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(a, b, c);
        meshRef.current = sphere;
        scene.add(sphere);

        // const edges = new THREE.EdgesGeometry(geometry);
        // const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        // const line = new THREE.LineSegments(edges, lineMaterial);
        // line.position.copy(sphere.position);
        // lineRef.current = line;
        // scene.add(line);

        // Limpieza al desmontar
        return () => {
            scene.remove(sphere);
            scene.remove(line);
            geometry.dispose();
            material.dispose();
            edges.dispose();
            lineMaterial.dispose();
        };
    }, [scene, a, b, c]);

    // Animación de vértices en cada frame
    useFrame(({ clock }) => {
        const geometry = geometryRef.current;
        if (!geometry) return;
        const posArray = geometry.attributes.position.array;
        const time = clock.getElapsedTime();
        for (let i = 0; i < posArray.length; i += 3) {
            const x = posArray[i];
            const y0 = geometry.parameters.radius * Math.sin(geometry.parameters.phiStart + (i / 3)); // valor base
            const z = posArray[i + 2];
            // Animación: onda en Y dependiente del tiempo
            posArray[i + 1] = y0 + 0.3 * Math.sin(x * 5 + z * 5 + time * 2);
        }
        geometry.attributes.position.needsUpdate = true;
    });

    return null;
}
function FractalTree({ depth = 4, a = 0, b = 0, c = 0, scale = 1 }) {
    if (depth === 0) return null;

    return (
        <>
            <RawCube a={a} b={b} c={c} />
            {/* Rama "atrás" (Z negativo) */}
            <FractalTree
                depth={depth - 1}
                a={a - scale * 1.5}
                b={b}
                c={c + scale * 1.5}
                scale={scale * 0.7}
            />
            {/* Rama "adelante" (Z positivo) */}
            <FractalTree
                depth={depth - 1}
                a={a + scale * 1.5}
                b={b}
                c={c + scale * 1.5}
                scale={scale * 0.7}
            />
        </>
    );
}

// Y en el render:
const gridSize = 5;
const spacing = 2;
const spheres = [];
const cubes = [];

for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
        spheres.push(
            <RawSphere
                key={`sphere-${x}-${y}`}
                a={x * spacing}
                b={1}
                c={y * spacing}
            />
        );
    }
}
for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
        cubes.push(
            <RawCube
                key={`cube-${x}-${y}`}
                a={x * spacing}
                b={1}
                c={y * spacing}
            />
        );
    }
}
const App = () => {
     return (
        <Canvas shadows style={{width: '100vw', height: '100vh'}} dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {/* {spheres} */}
            {/* {cubes} */}
             <FractalTree depth={5} a={0} b={0} c={0} scale={1} />
           
            <OrbitControls />
        </Canvas>
    );
};

export default App