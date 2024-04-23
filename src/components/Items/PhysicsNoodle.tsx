import {useCylinder} from "@react-three/cannon";
import {useDragConstraint} from "../Helpers/Drag.tsx";
import {Noodle} from "../../../public/models/noodles/Noodles.tsx";

const PhysicNoodle = ({id, initialPosition}: any) => {
  const [ref] = useCylinder(() => ({
    mass: 1,
    position: initialPosition,
    rotation:[Math.PI / 2, 0, Math.PI / 2],
    args: [0.2, 0.2, 0.4, 8],
    material: {
      friction: 0.1,
    }
  }));
  const bind = useDragConstraint(ref)

  return (
    <mesh key={id} scale={1}
      // @ts-ignore
          ref={ref} {...bind}>
      <Noodle position={[0,-0.2, 0]}  />
    </mesh>
  );
}
export default PhysicNoodle;