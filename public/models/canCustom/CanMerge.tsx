import {useGLTF} from "@react-three/drei";
import React from "react";

export const CanMerge = (props: any) => {
  const {nodes} = useGLTF('models/canCustom/can_merged.glb')
  console.log("Node", nodes);
  return (
    <>
        <mesh {...props} dispose={null} name="Circle" geometry={nodes.can_merged.geometry}>
          {props.material}
        </mesh>
    </>)
}