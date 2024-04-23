import {useCylinder} from "@react-three/cannon";
import {useDragConstraint} from "../Helpers/Drag.tsx";
import {Cola} from "../../../public/models/cola/Cola.tsx";

const PhysicCola = ({id, initialPosition}: any) => {
  const [ref] = useCylinder(() => ({
    mass: 1,
    position: initialPosition,
    rotation:[Math.PI / 2, 0, Math.PI / 2],
    args: [0.2, 0.2, 0.75, 8],
    material: {
      friction: 0.1,
    }
  }));
  const bind = useDragConstraint(ref)

  return (
    <mesh key={id} scale={1}  ref={ref} {...bind}>
      <Cola position={[0,-0.4, 0]}  />
    </mesh>
  );
}
export default PhysicCola;