import {useCylinder} from "@react-three/cannon";
import {useDragConstraint} from "../Helpers/Drag.tsx";
import { Can } from "../../../public/models/canCustom/Can.tsx";

const PhysicCan = ({id, initialPosition}: any) => {
  const [ref] = useCylinder(() => ({
    mass: 1,
    position: initialPosition,
    rotation:[Math.PI / 2, 0, Math.PI / 2],
    args: [0.1, 0.11, 0.3, 12], // args: [radiusTop, radiusBottom, height, numSegments]
    material: {
      friction: 0.1,
    }
  }));
  const bind = useDragConstraint(ref)

  return (
    <mesh key={id} scale={1}  ref={ref} {...bind}>
      <Can position={[0,-0.18, 0]}  />
    </mesh>
  );
}
export default PhysicCan;