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
  keepBarLeft?: boolean;
}

function MultiRangeSlider({
  values, onChange, min, max: userMax, label, valueLabels, disabled, infinity, keepBarLeft,
}: Props) {
  const [minVal, userMaxVal] = values;
  const max = infinity ? userMax + 1 : userMax;
  const maxVal = userMaxVal === Number.POSITIVE_INFINITY ? max : userMaxVal;

  const [bottomVal, setBottomVal] = useState(minVal);
  const [topVal, setTopVal] = useState(maxVal);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);

  const bottomValRef = useRef(min);
  const topValRef = useRef(max);
  const rangeTrackRef = useRef(null);

  const updateBottomVal = (v: number) => {
    const value = Math.min(v, maxVal);
    setBottomVal(value);
    bottomValRef.current = value;
  };
  const updateTopVal = (v: number) => {
    const value = Math.max(v, minVal);
    setTopVal(value);
    topValRef.current = value;
  };

  // If the parent element changes the top/bottom values, we
  // should also update them here
  useEffect(() => {
    if (minVal !== bottomVal) {
      updateBottomVal(minVal);
    }
    if (maxVal !== topVal) {
      updateTopVal(maxVal);
    }
  }, [minVal, maxVal]);

  const updateSetting = (range: { min?: number, max?: number }) => {
    let newTop = range.max ?? maxVal;
    if (newTop === userMax + 1) newTop = Number.POSITIVE_INFINITY;
    onChange([range.min ?? minVal, newTop]);
  };

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  const setSliderTrack = (minPercent: number, maxPercent: number) => {
    if (keepBarLeft) {
      setLeft(0);
      setWidth(maxPercent);
    } else {
      setLeft(minPercent);
      setWidth(maxPercent - minPercent);
    }
  };

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(bottomVal);
    const maxPercent = getPercent(topValRef.current);

    if (rangeTrackRef.current) {
      setSliderTrack(minPercent, maxPercent);
    }
  }, [bottomVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(bottomValRef.current);
    const maxPercent = getPercent(topVal);

    if (rangeTrackRef.current) {
      setSliderTrack(minPercent, maxPercent);
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
        onChange={updateBottomVal}
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
        onChange={updateTopVal}
        onPointerUp={(v) => {
          updateSetting({ max: v });
        }}
        disabled={disabled ? disabled[1] : undefined}
        label={getLabel(topVal)}
      />

      <div className="slider">
        <div className="slider__track" />
        <div
          ref={rangeTrackRef}
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
  keepBarLeft: false,
});

export default MultiRangeSlider;
