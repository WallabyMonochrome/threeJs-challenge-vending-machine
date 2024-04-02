import {useMemo} from 'react';
import {Canvas} from '@react-three/fiber';
import {
  Center, Loader, OrbitControls,
} from "@react-three/drei";
import vertex from "./shaders/planet/vertex.glsl";
import fragment from "./shaders/planet/fragment.glsl";
import {ShaderMaterial} from "three";

function ShaderSphere() {
  const shaderMaterial = useMemo(() => new ShaderMaterial({
    vertexShader: vertex, fragmentShader: fragment, uniforms: {},
  }), []);

  // useFrame((state, delta) => {
  // });

  return (<mesh>
    <sphereGeometry args={[3, 64, 64]}/>
    <primitive object={shaderMaterial} attach="material"/>
  </mesh>);
}

const Experience = () => {

  return (<>
    <Canvas shadows>
      <OrbitControls/>
      <Center>
        <ShaderSphere/>
      </Center>
    </Canvas>
    <Loader/>
  </>);
};
export default Experience;