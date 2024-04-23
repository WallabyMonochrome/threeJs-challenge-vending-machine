import {useCylinder} from "@react-three/cannon";
import {useDragConstraint} from "../Helpers/Drag.tsx";
import {BottleCustom} from "../../../public/models/bottleCustom/Bottle_custom.tsx";
import {useRef} from "react";

const PhysicBottle = ({id, initialPosition}: any) => {

  const [ref] = useCylinder(() => ({
    mass: 1,
    position: initialPosition,
    rotation:[Math.PI / 2, 0, Math.PI / 2],
    args: [0.2, 0.2, 1.1, 8],
    material: {
      friction: 0.1,
    },
  }));
  const bind = useDragConstraint(ref)

  return (
      <mesh key={id} scale={1}  ref={ref} {...bind}>
        <BottleCustom position={[0,-0.6, 0]}  />
      </mesh>
  );
}
export default PhysicBottle;