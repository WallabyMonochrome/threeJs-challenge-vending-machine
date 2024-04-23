import {useGLTF} from "@react-three/drei";

export const CanMerge = (props: any) => {
  const {nodes} = useGLTF('models/canCustom/can_merged.glb')
  console.log("Node", nodes);
  return (
    <>
      {/*// @ts-ignore*/}
      <mesh {...props} dispose={null} name="Circle" geometry={nodes.can_merged.geometry}>
        {props.material}
      </mesh>
    </>)
}