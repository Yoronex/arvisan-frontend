interface Props {
  color: string;
}

export default function ColorBox({ color }: Props) {
  return (
    <div
      className="d-inline-block border "
      style={{ height: '1rem', width: '1rem', backgroundColor: color }}
    />
  );
}
