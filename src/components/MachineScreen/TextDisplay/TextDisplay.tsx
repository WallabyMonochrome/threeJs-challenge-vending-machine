import {Plane, useTexture} from "@react-three/drei";
import {ShaderMaterial, SRGBColorSpace} from "three";
import vertexScreen from "../../../shaders/screen/vertex.glsl";
import fragmentScreen from "../../../shaders/screen/fragment.glsl";
import {useFrame} from "@react-three/fiber";

const TextDisplay = () => {
  const texture = useTexture("machineMascotte_v1.3.png"); // Load the texture
  texture.flipY = false;
  texture.colorSpace = SRGBColorSpace;
  const createShaderScreen = () => {
    const uniforms = {
      uTime: {value: 0.0},
      uTexture: {value: texture},
    };
    return new ShaderMaterial({
      vertexShader: vertexScreen,
      fragmentShader: fragmentScreen,
      uniforms,
    });
  };

  const shaderScreen: ShaderMaterial = createShaderScreen();
  useFrame(({clock}: any, ) => {
    shaderScreen.uniforms.uTime.value = clock.getElapsedTime();
  });
  return (<>
    <group position={[0, -3.5, 0]}>
    </group>
    {/*Background*/}
    <Plane position={[3.5, -2.1, 0]} args={[8, 5.3]}>
      <primitive object={shaderScreen}/>
    </Plane>
  </>)
}

export default TextDisplay;