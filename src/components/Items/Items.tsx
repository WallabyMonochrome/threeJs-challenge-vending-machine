import {useEffect, useState} from "react";
import {useStore} from "../../store/store.ts";
import PhysicTrashCan from "./PhysicTrashCan.tsx";
import PhysicWall from "./PhysicWalls.tsx";
import PhysicTire from "./PhysicTire.tsx";
import PhysicBarrel from "./PhysicBarrel.tsx";
import PhysicCardboard from "./PhysicsCardboard.tsx";

const generateRandomSpawnLocation = () => {
  return Math.random() * 1.5 - 1;
};

const SPAWN_LOCATION: any = [0, 1.3, 0]
const Items = () => {
  const {purchasedItems, getCurrentItem} = useStore();
  const [bottles, setBottles]: any = useState([]);
  useEffect(() => {
    if (purchasedItems.length > 0) {
      const ItemComponent = getCurrentItem().physic;
      const randomXPosition = generateRandomSpawnLocation();
      SPAWN_LOCATION[0] = randomXPosition;
      if (ItemComponent) {
        const newBottle = <ItemComponent key={Date.now()} initialPosition={SPAWN_LOCATION} id={Date.now()}/>;
        setBottles((prevBottles: any) => [...prevBottles, newBottle]);
      }
    }
  }, [purchasedItems]);

  const baseTiresPosition = [
    [6, 2, 3], [6.2, 3, 3], [5.8, 4, 3], [6, 5, 3]
  ];
  const baseBarrelsPosition = [
    [-8, 2, 7.6]
  ]
  let baseCardboardsPosition = [
    [6 - 3, 3, 10], [8 - 3, 2, 10], [4-3, 2, 10],
    [7 - 3, 4, 10], [5 - 3, 4, 10],
    [6 - 3, 6, 10], [6 - 3, 8, 10]

  ]

  function calculateCentroid(points: any) {
    const sum = points.reduce((acc: any, val: any) => [acc[0] + val[0], acc[1] + val[1], acc[2] + val[2]], [0, 0, 0]);
    return sum.map((s: any) => s / points.length);
  }

  function rotateY(point: any, angle: any, centroid: any) {
    const rad = angle * (Math.PI / 180);
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    // Translate point to origin
    const translated = [point[0] - centroid[0], point[1] - centroid[1], point[2] - centroid[2]];

    // Rotate point
    const rotated = [
      cos * translated[0] + sin * translated[2],
      translated[1],
      -sin * translated[0] + cos * translated[2]
    ];

    // Translate point back
    return [
      rotated[0] + centroid[0],
      rotated[1] + centroid[1],
      rotated[2] + centroid[2]
    ];
  }

// Calculate centroid
  const centroid = calculateCentroid(baseCardboardsPosition);

// Rotate all points as a group
  const angle = 160; // angle in degrees
  baseCardboardsPosition = baseCardboardsPosition.map(point => rotateY(point, angle, centroid));


  return (
    <>
      <PhysicTrashCan/>
      <PhysicWall/>
      {baseTiresPosition.map((pos: number[], key) => (
        <PhysicTire key={key} initialPosition={pos}/>
      ))}
      {baseBarrelsPosition.map((pos: number[], key) => (
        <PhysicBarrel key={key} initialPosition={pos}/>
      ))}
      {baseCardboardsPosition.map((pos: number[], key) => (
        <PhysicCardboard key={key} initialPosition={pos}/>
      ))}
      {bottles}
    </>
  );

}

export default Items;