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
  disabled?: boolean;
}

export default function MultiRangeSliderSlider({
  position, min, max, value, onChange, onPointerUp, disabled,
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
          // @ts-expect-error Name "offset" is correct according to PopperJS documentation https://popper.js.org/docs/v2/modifiers/offset/
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
          if (disabled) return;
          const v = Number(event.target.value);
          onChange(v);
        }}
        onPointerUp={(event) => {
          if (disabled) return;
          // @ts-expect-error value does exist
          const v = Number(event.target.value);
          onPointerUp(v);
        }}
        className={`thumb thumb--${position}`}
        disabled={disabled}
      />
    </OverlayTrigger>
  );
}
