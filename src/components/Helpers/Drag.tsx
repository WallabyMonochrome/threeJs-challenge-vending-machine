import React, {createRef, useCallback, useEffect, useRef, useState} from 'react';
import {useFrame, useThree} from "@react-three/fiber";
import {usePointToPointConstraint, useSphere} from "@react-three/cannon";
import {useStore} from "../../store/store.ts";
import { Vector3 } from 'three';

  const cursorRef: any = createRef();

function useDragConstraint(child: any) {
const { setDisableOrbitControl }: {setDisableOrbitControl: Function} = useStore();
  const [, , api] = usePointToPointConstraint(cursorRef, child, { pivotA: [0, 0, 0], pivotB: [0, 0, 0] })
  useEffect(() => void api.disable(), [])
  const onPointerUp = useCallback((e: any) => {
    document.body.style.cursor = 'grab'
    setDisableOrbitControl(false);
    e.target.releasePointerCapture(e.pointerId)
    api.disable()
  }, [])
  const onPointerDown = useCallback((e: any) => {
    document.body.style.cursor = 'grabbing'
    e.stopPropagation()
    setDisableOrbitControl(true);
    e.target.setPointerCapture(e.pointerId)
    api.enable()
  }, [])
  return { onPointerUp, onPointerDown }
}

function Cursor() {
  const { camera, viewport } = useThree();
  const [, api] = useSphere(() => ({
    collisionFilterMask: 0,
    type: 'Kinematic',
    mass: 0,
    args: [0.5],
  }), cursorRef);

  return useFrame((state) => {
    // Get the 2D mouse position in normalized device coordinates
    const { x, y } = state.mouse;

    const vec = new Vector3(x, y, 4.5); // The 0.5 here is a guess for the depth; adjust as needed
    vec.unproject(camera);

    // Determine where this vector intersects the plane of the floor (y = 0)
    const dir = vec.sub(camera.position).normalize();
    const distance = -camera.position.y / dir.y;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));

    let constrainedZ = Math.min(12, pos.z);
    constrainedZ = Math.max(-1, constrainedZ);
    let constrainedX = Math.min(12, pos.x);
    constrainedX = Math.max(-11, constrainedX);
    // Update the sphere position
    api.position.set(constrainedX, 3.2, constrainedZ);
  });
}

export { Cursor, cursorRef, useDragConstraint};