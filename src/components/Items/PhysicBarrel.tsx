import {useCylinder} from "@react-three/cannon";
import {Barrel} from "../../../public/models/barrel/Barrel.tsx";

const PhysicBarrel = ({id, initialPosition}: any) => {
  const [ref] = useCylinder(() => ({
    mass: 0.7,
    position: initialPosition,
    rotation:[0, 0, 0],
    args: [0.9, 0.9, 2.6, 8],
    material: {
      friction: 0.5,
    }
  }));
  // const bind = useDragConstraint(ref)

  return (
      <mesh key={id} scale={1}
  // @ts-ignore
            ref={ref} >
      <Barrel position={[0,-1.3, 0]}  />
    </mesh>
  );
}
export default PhysicBarrel;