import {useBox, useCylinder, usePlane} from "@react-three/cannon";
import {useDragConstraint} from "../Helpers/Drag.tsx";
import {Cola} from "../../../public/models/cola/Cola.tsx";

const PhysicWall = ({}: any) => {
  const [frontSideRef] = usePlane(() => ({position: [-0, 0,-2],   rotation: [Math.PI * 2, 0, 0],}));
  const [leftSideRef] = usePlane(() => ({position: [-12, 0,0],   rotation: [Math.PI * 2, Math.PI * 0.5, 0],}));
  const [rightSideRef] = usePlane(() => ({position: [12, 0,0],   rotation: [Math.PI * 2, -Math.PI * 0.5, 0],}));
  const [backSideRef] = usePlane(() => ({position: [-0, 0,13.5],   rotation: [Math.PI, 0, 0],}));
  const [floorA] = useBox(() => ({position: [0, -0.4, -0.2], args: [25, 1, 13]}));
  const [floorB] = useBox(() => ({position: [0, -1.2, 7.2], args: [25, 1, 13]}));
  const [streetLamp] = useBox(() => ({position: [9.6, 4, 5.3], args: [1, 8, 1]}));
  const [streetSign] = useBox(() => ({position: [10, 1, 10], args: [2, 3, 2.2]}));

  return (
    <>
      <mesh ref={frontSideRef}/>
      <mesh ref={leftSideRef}/>
      <mesh ref={rightSideRef}/>
      <mesh ref={backSideRef}/>
      <mesh ref={floorA}/>
      <mesh ref={floorB}/>
      <mesh ref={streetLamp}/>
    </>
  )
    ;
}
export default PhysicWall;