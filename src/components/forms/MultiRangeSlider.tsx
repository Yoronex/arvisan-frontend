/**
 * Inspired by https://stackblitz.com/edit/multi-range-slider?file=src%2Fstyle.css
 */

import {
  useCallback, useEffect, useState, useRef,
} from 'react';
import './MultiRangeSlider.css';
import MultiRangeSliderSlider from './MultiRangeSliderSlider';

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

  const [bottomVal, setBottomVal] = useState(minVal);
  const [topVal, setTopVal] = useState(maxVal);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);

  const updateSetting = (range: { min?: number, max?: number }) => {
    let newTop = range.max ?? maxVal;
    if (newTop === max) newTop = Number.POSITIVE_INFINITY;
    onChange([range.min ?? minVal, newTop]);
  };

  const bottomValRef = useRef(min);
  const topValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(bottomVal);
    const maxPercent = getPercent(topValRef.current);

    if (range.current) {
      setLeft(minPercent);
      setWidth(maxPercent - minPercent);
    }
  }, [bottomVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(bottomValRef.current);
    const maxPercent = getPercent(topVal);

    if (range.current) {
      setWidth(maxPercent - minPercent);
    }
  }, [topVal, getPercent]);

  return (
    <div className="w-100">
      <div>
        {label && (<label htmlFor="multi-range-bottom" className="form-label">{label}</label>)}
      </div>
      <MultiRangeSliderSlider
        position="left"
        min={min}
        max={max}
        value={bottomVal}
        onChange={(v) => {
          const value = Math.min(v, maxVal);
          setBottomVal(value);
          bottomValRef.current = value;
        }}
        onPointerUp={(v) => {
          updateSetting({ min: v });
        }}
      />
      <MultiRangeSliderSlider
        position="right"
        min={min}
        max={max}
        value={topVal}
        onChange={(v) => {
          const value = Math.max(v, minVal);
          setTopVal(value);
          topValRef.current = value;
        }}
        onPointerUp={(v) => {
          updateSetting({ max: v });
        }}
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
