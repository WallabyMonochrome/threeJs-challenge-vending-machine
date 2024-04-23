import {useCylinder} from "@react-three/cannon";
import {useDragConstraint} from "../Helpers/Drag.tsx";
import {Noodle} from "../../../public/models/noodles/Noodles.tsx";
import {Tire} from "../../../public/models/tire/Tire.tsx";

const PhysicTire = ({id, initialPosition}: any) => {
  const [ref] = useCylinder(() => ({
    mass: 0.7,
    position: initialPosition,
    rotation:[0, 0, 0],
    args: [1.3, 1.3, 0.6, 8],
    material: {
      friction: 0.5,
    }
  }));
  // const bind = useDragConstraint(ref)

  return (
    <mesh key={id} scale={2}  ref={ref} >
      <Tire position={[0,-0.2, 0]}  />
    </mesh>
  );
}
export default PhysicTire;