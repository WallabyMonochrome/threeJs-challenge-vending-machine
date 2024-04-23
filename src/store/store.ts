// src/store/useStore.ts
import create from 'zustand';
import PhysicBottle from "../components/Items/PhysicBottle.tsx";
import PhysicCan from "../components/Items/PhysicCan.tsx";
import {Can} from "../../public/models/canCustom/Can.tsx";
import {BottleCustom} from "../../public/models/bottleCustom/Bottle_custom.tsx";
import PhysicNoodle from "../components/Items/PhysicsNoodle.tsx";
import {Noodle} from "../../public/models/noodles/Noodles.tsx";
import PhysicCola from "../components/Items/PhysicCola.tsx";
import {Cola} from "../../public/models/cola/Cola.tsx";
import {CanMerge} from "../../public/models/canCustom/CanMerge.tsx";

type State = {
  disableOrbitControl: boolean;
  isMachineStarted: boolean;
  moneyBalance: number;
  currentItem: number;
  itemsLength: number;
  purchasedItems: string[];
  setDisableOrbitControl: (disable: boolean) => void;
  buyItem: () => void;
  start: () => void;
  logOff: () => void;
  nextItem: () => void;
  previousItem: () => void;
  getCurrentItem: () => any;
};


const itemMapping: any = {
  3: { physic: PhysicCola, base: Cola, size: 4, title: "Atomic Cola", lineA:"Radioactive !", lineB: "55 E$" },
  2: { physic: PhysicNoodle, base: Noodle, size: 3, title: "Yummy Noodles", lineA:"40 calories !", lineB: "2 E$" },
  1: { physic: PhysicBottle, base: BottleCustom, size: 3, title: "Neon Vodka", lineA:"Not for kid!", lineB: "99 E$" },
  0: { physic: PhysicCan, base: Can, baseMerge: CanMerge, title: "Cyber Can", size: 6, lineA:"Energize !", lineB: "19 E$" }
}

export const useStore = create<State>((set, get) => ({
  purchasedItems: [],
  disableOrbitControl: false,
  isMachineStarted: false,
  moneyBalance: 10000,
  itemsLength: Object.keys(itemMapping).length,
  currentItem: 0,
  start: () => set({ isMachineStarted: true }),
  getCurrentItem: () => {
    const current = get().currentItem;
    return itemMapping[current] || PhysicBottle;
  },
  buyItem: () => set((state: any) => ({
    purchasedItems: [...state.purchasedItems, state.currentItem],
  })),

  logOff: () => set({
    isMachineStarted: false,
    moneyBalance: 10000,  // You can reset to initial value or keep it as it is.
    currentItem: 0
  }),

  setDisableOrbitControl: (disable: boolean) => set({
    disableOrbitControl: disable,
  }),

  nextItem: () => set((state) => ({
    currentItem: Math.min(state.currentItem + 1, Object.keys(itemMapping).length - 1)
  })),

  previousItem: () => set((state) => ({
    currentItem: Math.max(0, state.currentItem - 1)  // Prevents the currentItem from going negative
  }))
}));