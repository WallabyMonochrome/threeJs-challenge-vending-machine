import {Environment, Plane, Text} from "@react-three/drei";
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {suspend} from "suspend-react";
import {Color} from "three";
import {useStore} from "../../../store/store.ts";


const bebas: any = import('../../../../public/fonts/Orbitron/Orbitron-vf.ttf')

const ItemDisplay = () => {
  const {getCurrentItem} = useStore();
  const itemRef: any = useRef();


  useFrame((_state: any, delta) => {
    if (itemRef.current) {
      itemRef.current.rotation.y += delta; // Increase the Z rotation based on the time elapsed since the last frame
    }
  });
  const ItemComponent = getCurrentItem().base;
  const {title, lineA, lineB, size} = getCurrentItem();


  let color = new Color("#FF21E9");
  color = color.multiplyScalar(1.5);
  return (
    <>
      {/*Left Part*/}
      <Environment preset={"city"}/>
      <ambientLight intensity={2.5}/>
      <group position={[-2.5, 1, 0]}>
        <Text position={[-1.8, -4.7, 0]} anchorX="left"
          // @ts-ignore
              anchorY="middle" rotation={[Math.PI, 0, 0]} font={suspend(bebas).default} fontSize={0.4}
              color={color}
              outlineBlur={'60%'}
              outlineOpacity={0.35}
              outlineColor={color}

        >
          {title}
        </Text>
        <mesh ref={itemRef}>
          <ItemComponent scale={size} rotation={[Math.PI, Math.PI * 2, Math.PI * 2.1]}/>
        </mesh>
        <Plane scale={1} position={[-1, 0, -1.8]} args={[8, 11]}>
          <meshBasicMaterial color={"black"}/>
        </Plane>
        <Text position={[-1.8, 1.7, 0]} anchorX="left"
          // @ts-ignore
              anchorY="middle" rotation={[Math.PI, 0, 0]} font={suspend(bebas).default} fontSize={0.4}
              color={color}
              outlineBlur={'60%'}
              outlineOpacity={0.35}
              outlineColor={color}


        >
          {lineA}
        </Text>
        <Text position={[-1.8, 2.5, 0]} anchorX="left"
          // @ts-ignore
              anchorY="middle" rotation={[Math.PI, 0, 0]} font={suspend(bebas).default} fontSize={0.4}
              color={color}
              outlineBlur={'60%'}
              outlineOpacity={0.35}
              outlineColor={color}
        >
          {lineB}
        </Text>
      </group>
    </>
  )
}

export default ItemDisplay;