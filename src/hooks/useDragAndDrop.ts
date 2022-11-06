import React, { MutableRefObject, useEffect, useRef } from 'react';

interface useDragAndDropProps {
  ref: MutableRefObject<HTMLDivElement>;
  onChange: () => void;
  maxRef?: MutableRefObject<HTMLDivElement>;
  minRef?: MutableRefObject<HTMLDivElement>;
}

function useDragAndDrop({
  ref,
  onChange,
  maxRef,
  minRef,
}: useDragAndDropProps): void {
  const isClicked = useRef<boolean>(false);

  const coords = useRef<{
    startX: number;
    lastX: number;
  }>({
    startX: 0,
    lastX: 0,
  });

  useEffect(() => {
    if (!ref.current) throw new Error("Element with given ref doesn't exist");

    const container = ref.current.parentElement;
    if (!container) throw new Error('target element must have a parent');

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
    };

    const onMouseUp = (e: MouseEvent) => {
      isClicked.current = false;
      if (coords.current.lastX !== ref.current.offsetLeft) {
        coords.current.lastX = ref.current.offsetLeft;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const max = maxRef ? maxRef.current.offsetLeft : 300 - 16;
      const min = minRef ? minRef.current.offsetLeft : 0;
      const calculatedX =
        e.clientX - coords.current.startX + coords.current.lastX;
      const nextX =
        calculatedX > max ? max : calculatedX < min ? min : calculatedX;

      onChange();
      ref.current.style.left = `${nextX}px`;
    };

    ref.current.addEventListener('mousedown', onMouseDown);
    ref.current.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);
  }, [ref]);
}

export default useDragAndDrop;
