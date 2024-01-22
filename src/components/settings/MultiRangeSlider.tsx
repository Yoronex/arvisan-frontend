/**
 * Inspired by https://stackblitz.com/edit/multi-range-slider?file=src%2Fstyle.css
 */

import {
  useCallback, useEffect, useState, useRef,
} from 'react';
import './MultiRangeSlider.css';

interface Props {
  values: [number, number];
  onChange: (v: [number, number]) => void;
  min: number;
  max: number;
  label?: string;
}

function MultiRangeSlider({
  values, onChange, min, max: userMax, label,
}: Props) {
  const [minVal, userMaxVal] = values;
  const max = userMax + 1;
  const maxVal = userMaxVal === Number.POSITIVE_INFINITY ? max : userMaxVal;

  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);

  const setMinVal = (newValue: number) => {
    onChange([newValue, maxVal]);
  };
  const setMaxVal = (newValue: number) => {
    if (newValue === max) {
      onChange([minVal, Number.POSITIVE_INFINITY]);
    } else {
      onChange([minVal, newValue]);
    }
  };

  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      setLeft(minPercent);
      setWidth(maxPercent - minPercent);
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      setWidth(maxPercent - minPercent);
    }
  }, [maxVal, getPercent]);

  return (
    <div className="w-100">
      <div>
        {label && (<label htmlFor="multi-range-bottom" className="form-label">{label}</label>)}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: (minVal > max - 100 && '5') || undefined }}
        id="multi-range-bottom"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" style={{ width: `${width}%`, left: `${left}%` }} />
        <div className="slider__left-value">{minVal}</div>
        <div className="slider__right-value">{maxVal === max ? `${userMax}+` : maxVal}</div>
      </div>
    </div>
  );
}

MultiRangeSlider.defaultProps = ({
  label: undefined,
});

export default MultiRangeSlider;
