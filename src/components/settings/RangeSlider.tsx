interface Props {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  label?: string;
}

export default function RangeSlider({
  value, onChange, min, max, label,
}: Props) {
  return (
    <div className="w-100">
      <div>
        {label && (<label htmlFor="range-slider" className="form-label m-0">{label}</label>)}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        id="range-slider"
        className="w-100"
      />
      <div className="flex justify-content-between" style={{ marginTop: '-0.5rem' }}>
        {value}
      </div>
    </div>
  );
}

RangeSlider.defaultProps = ({
  label: undefined,
});
