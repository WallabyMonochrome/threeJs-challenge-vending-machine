import {Environment, PerspectiveCamera, Plane, RenderTexture, Text, useGLTF} from "@react-three/drei";
import ItemDisplay from "./ItemDisplay/ItemDisplay.tsx";
import TextDisplay from "./TextDisplay/TextDisplay.tsx";
import {useRef} from "react";



const MachineScreen = ({screenObject}: any) => {
  const textureRendeRef: any = useRef();


  return (
    <>
      <primitive object={screenObject}>
        <meshStandardMaterial>
          <RenderTexture ref={textureRendeRef} attach="map" anisotropy={16}>
            <PerspectiveCamera manual makeDefault aspect={1 / 1} position={[0, 0, 10]}/>
            <ItemDisplay />
            <TextDisplay />
          </RenderTexture>
        </meshStandardMaterial>
      </primitive>
    </>)
}

export default MachineScreen;