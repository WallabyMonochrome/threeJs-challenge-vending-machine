import {Html} from "@react-three/drei";
import Start from "./FlowScreen/Start.tsx";
import SelectionItem from "./FlowScreen/SelectionItem.tsx";
import { useStore } from '../../store/store.ts';

const TouchScreen = () => {
  const { isMachineStarted } = useStore();

  return (<>
      <Html key={"az"} occlude={"blending"} distanceFactor={0.59} transform>
        {isMachineStarted &&  <SelectionItem />}
        {!isMachineStarted &&  <Start />}
      </Html>
    </>
  )
}

export default TouchScreen;