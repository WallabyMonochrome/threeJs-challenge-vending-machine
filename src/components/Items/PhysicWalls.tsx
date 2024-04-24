import {useBox, usePlane} from "@react-three/cannon";

const PhysicWall = ({}: any) => {
  const [frontSideRef] = usePlane(() => ({position: [-0, 0,-2],   rotation: [Math.PI * 2, 0, 0],}));
  const [leftSideRef] = usePlane(() => ({position: [-12, 0,0],   rotation: [Math.PI * 2, Math.PI * 0.5, 0],}));
  const [rightSideRef] = usePlane(() => ({position: [12, 0,0],   rotation: [Math.PI * 2, -Math.PI * 0.5, 0],}));
  const [backSideRef] = usePlane(() => ({position: [-0, 0,13.5],   rotation: [Math.PI, 0, 0],}));
  const [floorA] = useBox(() => ({position: [0, -1, -0], args: [25, 2, 13]}));
  const [floorB] = useBox(() => ({position: [0, -1.2, 7.2], args: [25, 1, 13]}));
  const [streetLamp] = useBox(() => ({position: [9.6, 4, 5.3], args: [1, 8, 1]}));
  const [streetSign] = useBox(() => ({position: [10, 1, 10], args: [2, 3, 2.2]}));

  return (
    <>
      {/*// @ts-ignore*/}
      <mesh ref={frontSideRef}/>
      {/*// @ts-ignore*/}
      <mesh ref={leftSideRef}/>
      {/*// @ts-ignore*/}
      <mesh ref={rightSideRef}/>
      {/*// @ts-ignore*/}
      <mesh ref={backSideRef}/>
      {/*// @ts-ignore*/}
      <mesh ref={floorA}/>
      {/*// @ts-ignore*/}
      <mesh ref={floorB}/>
      {/*// @ts-ignore*/}
      <mesh ref={streetLamp}/>
      {/*// @ts-ignore*/}
      <mesh ref={streetSign}/>
    </>
  )
    ;
}
export default PhysicWall;