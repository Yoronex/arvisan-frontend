interface Props {
  label: string;
  searchKey: string;
}

export default function HighlightSearch({ label, searchKey }: Props) {
  const key = searchKey.toLowerCase().replace(' ', '_');
  const searchIndex = label.toLowerCase().indexOf(key);
  const beforeString = label.substring(0, searchIndex);
  const highlightString = label.substring(searchIndex, searchIndex + key.length);
  const afterString = label.substring(searchIndex + key.length);

  return (
    <>
      {beforeString}
      <span className="fw-bold">{highlightString}</span>
      {afterString}
    </>
  );
}
