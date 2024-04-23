/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 barrel.glb -t -s -T -k -r 
Files: barrel.glb [22.69KB] > /Users/thib-cs/Work/Perso/project3D/threeJs-challenge-vending-machine/public/models/barrel/barrel-transformed.glb [3.47KB] (85%)
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import {useCubeTexture, useGLTF} from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Circle006: THREE.Mesh
    Circle006_1: THREE.Mesh
  }
  materials: {
    ['mediumMetal.001']: THREE.MeshStandardMaterial
    lightMetal: THREE.MeshStandardMaterial
  }
}

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export function Barrel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('models/barrel/barrel-transformed.glb') as GLTFResult
  const envMap = useCubeTexture(
    ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'],
    {path: '/envmap/cityNight/'}
  );

  const metalMaterial = materials['mediumMetal.001'].clone();
  metalMaterial.envMap = envMap;
  metalMaterial.envMapIntensity = 5;

  const lightMetalMaterial = materials.lightMetal.clone();
  metalMaterial.envMap = envMap;
  metalMaterial.envMapIntensity = 5;

  return (
    <group {...props} dispose={null}>
      <mesh name="Circle006" castShadow receiveShadow geometry={nodes.Circle006.geometry} material={metalMaterial} />
      <mesh name="Circle006_1" castShadow receiveShadow geometry={nodes.Circle006_1.geometry} material={lightMetalMaterial} />
    </group>
  )
}

useGLTF.preload('models/barrel/barrel-transformed.glb')