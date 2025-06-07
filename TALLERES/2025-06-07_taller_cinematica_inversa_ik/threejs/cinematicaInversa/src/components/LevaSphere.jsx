
import { useControls } from 'leva';

export default function LevaSphere() {
  const { x, y, z } = useControls({
    x: { value: 3, min: -5, max: 5, step: 0.1 },
    y: { value: 1, min: -5, max: 5, step: 0.1 },
    z: { value: 0, min: -5, max: 5, step: 0.1 },
  });

  return (
    <mesh position={[x, y, z]} castShadow>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color="lightgreen" />
    </mesh>
  );
}

