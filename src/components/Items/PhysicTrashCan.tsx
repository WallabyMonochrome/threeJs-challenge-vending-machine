import {useBox, useCylinder} from "@react-three/cannon";
import {useDragConstraint} from "../Helpers/Drag.tsx";
import {Cola} from "../../../public/models/cola/Cola.tsx";
import {useRef} from "react";

const PhysicTrashCan = ({}: any) => {
  const sound = useRef(new Audio('/sound/trashsound.mp3')); // Path to your collision sound

  const [leftSideRef] = useBox(() => ({position: [-6.2, 1.4, -0.9], args: [0.15, 3, 2.5], rotation: [0, 0, -Math.PI * 0.04]}));
  const [rightSideRef] =  useBox(() => ({position: [-3.9, 1.4, -0.9], args: [0.15, 3, 2.5], rotation: [0, 0, Math.PI * 0.04]}));
  const [frontSideRef] = useBox(() => ({position: [-4.9, 1.4, 0.45], args: [0.15, 3, 2], rotation: [ 0,  -Math.PI * 0.5, Math.PI * 0.04]}));
  const [topSideRef] = useBox(() => ({position: [-5, 2.5, -0.7], args: [0.15, 1.7, 1.7], rotation: [ 0,  0, Math.PI / 2],
    isTrigger: true,
    onCollide: () => {
      sound.current.play(); // Play sound on collision
      sound.current.volume = 0.3; // Play sound on collision
    }
  }));

  return (
    <>
      <mesh ref={leftSideRef}/>
      <mesh ref={rightSideRef}/>
      <mesh ref={frontSideRef}/>
      <mesh ref={topSideRef}/>
    </>
  )
    ;
}
export default PhysicTrashCan;