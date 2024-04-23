import {Canvas} from '@react-three/fiber';
import {
  Box,
  Center, Environment, Html, Loader, Mask, OrbitControls, PerspectiveCamera, ScreenQuad, useGLTF, useTexture,
} from "@react-three/drei";

import Items from "./Items/Items.tsx";
import {Cursor} from "./Helpers/Drag.tsx";
import {Debug, Physics, usePlane} from '@react-three/cannon'
import {useStore} from "../store/store.ts";
import Machine from "./Machine.tsx";
import {SRGBColorSpace} from "three";
import {Suspense, useEffect, useRef} from "react";
import {Bloom, EffectComposer, ToneMapping} from '@react-three/postprocessing';
import {BlurPass, Resizer, BlendFunction, KernelSize, Resolution} from 'postprocessing'

const Street = ({props}: any) => {
  const streetTexture = useTexture("bakingT.png"); // Load the texture

  streetTexture.flipY = false;
  streetTexture.colorSpace = SRGBColorSpace;
  const {nodes} = useGLTF("vendingMachine_scene.glb");
  return <>
    {/** @ts-ignore **/}
    <mesh geometry={nodes.mergeGeo.geometry}>
      <meshBasicMaterial attach={"material"} map={streetTexture}/>
    </mesh>
    {/** @ts-ignore **/}
    <mesh geometry={nodes.streetLamp001.geometry}>
      <meshStandardMaterial color={"white"} emissive={"white"} emissiveIntensity={1.5}/>
    </mesh>
    {/** @ts-ignore **/}
    <mesh geometry={nodes.trashNeon.geometry}>
      <meshStandardMaterial color={"#08B3FF"} emissive={"#08B3FF"} emissiveIntensity={1.5}/>

    </mesh>
    {/** @ts-ignore **/}
    <mesh geometry={nodes.streetSignText.geometry}>
      <meshStandardMaterial color={"#FF4354"} emissive={"#FF4354"} emissiveIntensity={2.5}/>

    </mesh>
    {/** @ts-ignore **/}
    <mesh geometry={nodes.neonOutline.geometry}>
      <meshStandardMaterial color={"#08B3FF"} emissive={"#08B3FF"} emissiveIntensity={1.5}/>

    </mesh>
    {/** @ts-ignore **/}
    <mesh geometry={nodes.neonText.geometry}>
      <meshStandardMaterial color={"#08B3FF"} emissive={"#08B3FF"} emissiveIntensity={0.5}/>
    </mesh>
    {/** @ts-ignore **/}
    <mesh geometry={nodes.panelLight.geometry}>
      <meshStandardMaterial color={"#FF4354"} emissive={"#FF4354"} emissiveIntensity={2.5}/>
    </mesh>
  </>
}


const Scene = () => {
  const {disableOrbitControl}: { disableOrbitControl: boolean } = useStore();
  const musicRef = useRef(new Audio('sound/bg-music.mp3')); // Path to your audio file

  useEffect(() => {
    const playMusic = () => {
      musicRef.current.play().catch(error => console.error('Error playing music:', error));
      musicRef.current.loop = true;
      musicRef.current.volume = 0.2;
      musicRef.current.playbackRate = 0.9;
      window.removeEventListener('click', playMusic);
    };

    window.addEventListener('click', playMusic);

    return () => {
      window.removeEventListener('click', playMusic);
    };
  }, []);
  return (<>
    <Canvas style={{width: "100vw", height: "100vh"}} shadows>
      <Suspense fallback={null}>
        <PerspectiveCamera
          makeDefault // Makes this the default camera for the scene
          position={[0, 6, 20]} // Set the position of the camera
          fov={50} // Field of view
        />
        <EffectComposer>
        <Bloom
          intensity={1.5} // The bloom intensity.
          blurPass={undefined} // A blur pass.
          kernelSize={KernelSize.LARGE} // blur kernel size
          luminanceThreshold={0.8} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
          mipmapBlur={false} // Enables or disables mipmap blur.
          resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
          resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
        />
          <ToneMapping
            blendFunction={BlendFunction.NORMAL} // blend mode
            adaptive={true} // toggle adaptive luminance map usage
            resolution={256} // texture resolution of the luminance map
            middleGrey={0.7} // middle grey factor
            maxLuminance={10.0} // maximum luminance
            averageLuminance={1.6} // average luminance
            adaptationRate={1.0} // luminance adaptation rate
          />
        </EffectComposer>
        <Physics>
          {/*<Debug color="black">*/}
          <OrbitControls enabled={!disableOrbitControl}/>
          <Machine/>
          <Cursor/>
          {/*<Environment preset={"forest"} />*/}
          <Items/>
          <ambientLight intensity={2}></ambientLight>
          <Street/>
          {/*</Debug>*/}
        </Physics>
      </Suspense>
    </Canvas>
    <Loader/>
  </>)
}

export default Scene;