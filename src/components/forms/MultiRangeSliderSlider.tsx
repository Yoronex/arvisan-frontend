import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import {
  useEffect, useRef, useState,
} from 'react';

interface Props {
  position: 'left' | 'right';
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  onPointerUp: (v: number) => void;
}

export default function MultiRangeSliderSlider({
  position, min, max, value, onChange, onPointerUp,
}: Props) {
  const [tooltipOffset, setTooltipOffset] = useState(0);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const progress = ((value - min) / (max - min));
    const offsetX = (progress - 0.5) * (ref.current?.clientWidth ?? 0);
    setTooltipOffset(offsetX);
  }, [max, min, value]);

  return (
    <OverlayTrigger
      overlay={(
        <Tooltip arrowProps={{ style: { visibility: 'hidden' } }}>
          {value === max ? `${max - 1}+` : value}
        </Tooltip>
      )}
      trigger={['hover', 'focus']}
      placement="top"
      popperConfig={{
        modifiers: {
          name: 'offset',
          options: {
            offset: [tooltipOffset, 10],
          },
        },
      }}
    >
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => {
          const v = Number(event.target.value);
          onChange(v);
        }}
        onPointerUp={(event) => {
          // @ts-expect-error value does exist
          const v = Number(event.target.value);
          onPointerUp(v);
        }}
        className={`thumb thumb--${position}`}
      />
    </OverlayTrigger>
  );
}
