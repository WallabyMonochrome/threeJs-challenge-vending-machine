import MachineScreen from "./MachineScreen/MachineScreen.tsx";
import TouchScreen from "./TouchScreen/TouchScreen.tsx";
import {useGLTF} from "@react-three/drei";
import {useBox} from "@react-three/cannon";
import {useEffect} from "react";
import GUI from 'lil-gui';

const gui = new GUI();

const myObject = {
  myNumber: 1
};
const Machine = () => {
  const {scene, nodes} = useGLTF("vendingMachine.glb");
  const [leftSideRef] = useBox(() => ({ position: [-1.9, 3.2, 0], args: [0.5, 6.5, 1.7] }));
  const [rightSideRef] = useBox(() => ({ position: [1.3, 3.2, 0], args: [0.5, 6.5, 1.7] }));
  const [bottomRef] = useBox(() => ({ position: [-0.3, 0.7, 0], args: [3.5, 1, 1.8], rotation: [Math.PI* 0.1, 0, 0] }));
  const [topRef] = useBox(() => ({ position: [-0.3, 4.2, 0], args: [3.5, 5, 1.8] }));
  const [backRef] = useBox(() => ({ position: [-0.25, 1, -0.3], args: [3.5, 1.5, 1] }));

  // useEffect(() => {
  //   if (nodes.Cube.material) {
  //     nodes.Cube.material.transparent = true;
  //     nodes.Cube.material.opacity = 1;
  //   }
  // }, [nodes]);
  return(
    <>
      <mesh ref={leftSideRef}/>
      <mesh ref={rightSideRef}/>
      <mesh ref={bottomRef}/>
      <mesh ref={topRef}/>
      <mesh ref={backRef}/>

      {/*<primitive object={nodes.clapette}></primitive>*/}
      {/*<primitive object={nodes.Scene}></primitive>*/}
      <MachineScreen screenObject={nodes.screen}/>
      <group position={[0.62, 3.34, 1]} rotation-x={-0.09} zIndexRange={[-1, 0]}>
        <TouchScreen/>
      </group>
    </>)
}

export default Machine;