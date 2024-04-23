/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 tire.glb -t -s -T -k -r 
Files: tire.glb [21.41KB] > /Users/thib-cs/Work/Perso/project3D/threeJs-challenge-vending-machine/public/models/tire/tire-transformed.glb [2.55KB] (88%)
*/

import * as THREE from 'three'
import {useCubeTexture, useGLTF} from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    tire: THREE.Mesh
  }
  materials: {
    ['rubber.001']: THREE.MeshStandardMaterial
  }
}


export function Tire(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('models/tire/tire-transformed.glb') as GLTFResult
  const envMap = useCubeTexture(
    ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'],
    {path: '/envmap/cityNight/'}
  );

  const rubberMaterial = materials['rubber.001'].clone();
  rubberMaterial.envMap = envMap;
  rubberMaterial.envMapIntensity = 5;


  return (
    <group {...props} dispose={null}>
      <mesh name="tire" castShadow receiveShadow geometry={nodes.tire.geometry} material={rubberMaterial} />
    </group>
  )
}

useGLTF.preload('models/tire/tire-transformed.glb')
