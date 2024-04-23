import {useBox, useCylinder} from "@react-three/cannon";
import {Cardboard} from "../../../public/models/cardboard/Cardboard.tsx";

const PhysicCardboard = ({id, initialPosition}: any) => {
  const [ref] = useBox(() => ({
    mass: 0.7,
    position: initialPosition,
    rotation:[0, 0, 0],
    args: [1.7, 1, 1.7],
    material: {
      friction: 0.5,
    }
  }));
  // const bind = useDragConstraint(ref)

  return (
    <mesh key={id} scale={0.8}  ref={ref} >
      <Cardboard position={[0,-0.6, 0]}  />
    </mesh>
  );
}
export default PhysicCardboard;