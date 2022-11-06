import React, { useEffect, useRef, useState } from "react";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import {
  checkForValidCharacter,
  getNewXFromRange,
  getNewXFromSet,
  normalize,
} from "../../utils";
import {
  MainContainer,
  RangeContainer,
  RangeController,
  RangeLabel,
  RangeLine,
} from "./Range.styles";

interface rangeType {
  min: number;
  max: number;
}

interface RangeContainer {
  isEditable?: boolean;
  range?: rangeType;
  values?: number[];
}

const minHTMLRangeValue = 0;
const maxHTMLRangeValue = 284;

const Range = ({ isEditable = false, range, values }: RangeContainer) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(Infinity);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftControllerRef = useRef<HTMLDivElement>(null);
  const rightControllerRef = useRef<HTMLDivElement>(null);
  const minLabelRef = useRef<HTMLDivElement>(null);
  const maxLabelRef = useRef<HTMLDivElement>(null);

  const onControllerChange = () => {
    let newScaledPosition1, newScaledPosition2;
    const leftNormalPosition = normalize(
      leftControllerRef.current.offsetLeft,
      minHTMLRangeValue,
      maxHTMLRangeValue
    );
    const rightNormalPosition = normalize(
      rightControllerRef.current.offsetLeft,
      minHTMLRangeValue,
      maxHTMLRangeValue
    );

    if (range) {
      newScaledPosition1 = getNewXFromRange(
        leftNormalPosition,
        range.min,
        range.max
      );
      newScaledPosition2 = getNewXFromRange(
        rightNormalPosition,
        range.min,
        range.max
      );
    } else {
      newScaledPosition1 = getNewXFromSet(leftNormalPosition, values);
      newScaledPosition2 = getNewXFromSet(rightNormalPosition, values);
    }

    setMinValue(newScaledPosition1);
    setMaxValue(newScaledPosition2);
  };

  useDragAndDrop({
    maxRef: rightControllerRef,
    onChange: onControllerChange,
    ref: leftControllerRef,
  });
  useDragAndDrop({
    minRef: leftControllerRef,
    onChange: onControllerChange,
    ref: rightControllerRef,
  });

  useEffect(() => {
    if (range) {
      setMinValue(range.min);
      setMaxValue(range.max);
    } else if (values?.length) {
      setMinValue(values[0]);
      setMaxValue(values[values.length - 1]);
    }
  }, []);

  const handleBlur = (
    e: React.FocusEvent<HTMLDivElement>,
    controllerSide: "left" | "right"
  ) => {
    let newValue = +e.target.innerText;
    if (controllerSide === "left") {
      if (newValue > maxValue) {
        newValue = maxValue;
      } else if (newValue < range.min) {
        newValue = range.min;
      }
      minLabelRef.current.innerText = newValue.toString();
    } else {
      if (newValue < minValue) {
        newValue = minValue;
      } else if (newValue > range.max) {
        newValue = range.max;
      }
      maxLabelRef.current.innerText = newValue.toString();
    }
    const normalizedValue = normalize(newValue, range.min, range.max);
    const newPosition = getNewXFromRange(
      normalizedValue,
      minHTMLRangeValue,
      maxHTMLRangeValue
    );
    if (controllerSide === "left") {
      leftControllerRef.current.style.left = `${newPosition}px`;
    } else {
      rightControllerRef.current.style.left = `${newPosition}px`;
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!checkForValidCharacter(e)) return e.preventDefault();
  };

  return (
    <MainContainer>
      <RangeLabel
        contentEditable={isEditable}
        data-testid="label-left"
        onBlur={(e) => handleBlur(e, "left")}
        onKeyDown={(e) => handleKeyDown(e)}
        ref={minLabelRef}
        suppressContentEditableWarning
      >
        {minValue}
      </RangeLabel>
      <RangeContainer ref={containerRef}>
        <RangeController
          data-testid="range-left"
          ref={leftControllerRef}
          left
        />
        <RangeLine />
        <RangeController
          data-testid="range-right"
          ref={rightControllerRef}
          right
        />
      </RangeContainer>
      <RangeLabel
        contentEditable={isEditable}
        data-testid="label-right"
        onBlur={(e) => handleBlur(e, "right")}
        onKeyDown={(e) => handleKeyDown(e)}
        ref={maxLabelRef}
        suppressContentEditableWarning
      >
        {maxValue}
      </RangeLabel>
    </MainContainer>
  );
};

export default Range;
