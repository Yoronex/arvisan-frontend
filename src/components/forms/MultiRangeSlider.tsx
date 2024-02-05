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
  valueLabels?: string[];
  disabled?: [boolean, boolean];
  infinity?: boolean;
}

function MultiRangeSlider({
  values, onChange, min, max: userMax, label, valueLabels, disabled, infinity,
}: Props) {
  const [minVal, userMaxVal] = values;
  const max = infinity ? userMax + 1 : userMax;
  const maxVal = userMaxVal === Number.POSITIVE_INFINITY ? max : userMaxVal;

  const [bottomVal, setBottomVal] = useState(minVal);
  const [topVal, setTopVal] = useState(maxVal);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);

  // If the parent element changes the top/bottom values, we
  // should also update them here
  useEffect(() => {
    if (minVal !== bottomVal) {
      setBottomVal(minVal);
    }
    if (maxVal !== topVal) {
      setTopVal(maxVal);
    }
  }, [minVal, maxVal]);

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

  const getLabel = (v: number): string => {
    if (valueLabels) {
      const index = v - min;
      return valueLabels[index];
    }
    if (infinity) {
      return v === max ? `${userMax}+` : v.toString();
    }
    return v.toString();
  };

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
        disabled={disabled ? disabled[0] : undefined}
        label={getLabel(bottomVal)}
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
        disabled={disabled ? disabled[1] : undefined}
        label={getLabel(topVal)}
      />

      <div className="slider">
        <div className="slider__track" />
        <div
          ref={range}
          className={`slider__range ${disabled && disabled[0] && disabled[1] ? 'disabled' : ''}`}
          style={{ width: `${width}%`, left: `${left}%` }}
        />
        <div className="slider__left-value">{getLabel(minVal)}</div>
        <div className="slider__right-value">{getLabel(maxVal)}</div>
      </div>
    </div>
  );
}

MultiRangeSlider.defaultProps = ({
  label: undefined,
  disabled: undefined,
  valueLabels: undefined,
  infinity: false,
});

export default MultiRangeSlider;
