import {Canvas, useThree} from '@react-three/fiber';
import {
  Loader, OrbitControls, PerspectiveCamera, useGLTF, useTexture,
} from "@react-three/drei";

import Items from "./Items/Items.tsx";
import {Cursor} from "./Helpers/Drag.tsx";
import { Physics} from '@react-three/cannon'
import {useStore} from "../store/store.ts";
import Machine from "./Machine.tsx";
import {SRGBColorSpace, Vector3} from "three";
import {Suspense, useEffect, useRef, useState} from "react";
import {Bloom, EffectComposer, ToneMapping} from '@react-three/postprocessing';
import {BlendFunction, KernelSize, Resolution} from 'postprocessing'
import Tooltip from './Helpers/Tooltip.tsx';
import CyberButtonUI from "./CyberButtonUI/CyberButtonUI.tsx";
// import {Perf} from "r3f-perf";


const Street = () => {
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
    {/** @ts-ignore **/}
    <mesh geometry={nodes.trashSignNeon.geometry}>
      <meshStandardMaterial color={"#FF4354"} emissive={"#FF4354"} emissiveIntensity={2.5}/>
    </mesh>
    {/** @ts-ignore **/}
    <mesh geometry={nodes.trashSignNeon.geometry}>
      <meshStandardMaterial color={"#FF4354"} emissive={"#FF4354"} emissiveIntensity={2.5}/>
    </mesh>
    {/** @ts-ignore **/}
    <mesh geometry={nodes.arrows.geometry}>
      <meshStandardMaterial color={"#08B3FF"} emissive={"#08B3FF"} emissiveIntensity={1.5}/>
    </mesh>
  </>
}

const OrbitControlsCustom = ({disableOrbitControl}: {disableOrbitControl: boolean}) => {
  const { camera } = useThree();
  const orbitRef: any = useRef(null);
  useEffect(() => {
    if (orbitRef.current) {
      // Set the new target to focus on
      const newTarget = new Vector3(0, 2.5, 0);
      orbitRef.current.target = newTarget;
      // Update the camera to look at the new target
      camera.lookAt(newTarget);
      // Update controls to apply the new target
      orbitRef.current.update();
    }
  }, [camera]);
  return (
    <OrbitControls
    ref={orbitRef}
    makeDefault={true}
    enabled={!disableOrbitControl}
    maxAzimuthAngle={Math.PI / 3}  // Limits rotation to 45 degrees to the right
    minAzimuthAngle={-Math.PI / 3} // Limits rotation to 45 degrees to the left
    maxPolarAngle={Math.PI / 2.2}    // Prevents the camera from dipping below the horizon
    minPolarAngle={Math.PI / 4.5}    // Prevents the camera from going too high
    maxDistance={40}
    minDistance={10}
  />)
}

const Scene = () => {
  const {disableOrbitControl, resetItem}: { disableOrbitControl: boolean, resetItem: Function } = useStore();
  const [resetKey, setResetKey] = useState(0);
  const musicRef = useRef(new Audio('sound/bg-music.mp3'));


  useEffect(() => {
    const playMusic = () => {
      musicRef.current.play().catch(error => console.error('Error playing music:', error));
      musicRef.current.loop = true;
      musicRef.current.volume = 0.2;
      musicRef.current.playbackRate = 1;
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
          makeDefault
          position={[0, 8, 20]} // Set the position of the camera
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
            middleGrey={0.8} // middle grey factor
            maxLuminance={10.0} // maximum luminance
            averageLuminance={1.6} // average luminance
            adaptationRate={1.0} // luminance adaptation rate
          />
        </EffectComposer>
        <Physics>

          {/*<Perf/>*/}
          {/*<Debug color="black">*/}
          <OrbitControlsCustom disableOrbitControl={disableOrbitControl} />
          <Machine/>
          <Cursor/>
          <Items key={resetKey}/>
          <ambientLight intensity={2}></ambientLight>
          <Street/>

          {/*</Debug>*/}
        </Physics>
      </Suspense>
    </Canvas>
    <Tooltip  resetComponent={<CyberButtonUI onClick={() => {
      resetItem();
      setResetKey(resetKey + 1);
    }}>Reset</CyberButtonUI>}>
      <div>
        <div >Use the Z/W and S key to adjust the item height.</div>
      </div>
    </Tooltip>
    <Loader/>
  </>)
}

export default Scene;