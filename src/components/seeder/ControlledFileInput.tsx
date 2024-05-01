import { FormControl, FormControlProps } from 'react-bootstrap';
import {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';

interface Props extends Omit<FormControlProps, 'value' | 'onChange' | 'type'> {
  file: File | undefined;
  onChange: (file?: File) => void;
}

export default function ControlledFileInput({ file, onChange, ...props }: Props) {
  const [currentFile, setCurrentFile] = useState<File>();
  const ref = useRef<HTMLInputElement>();

  useEffect(() => {
    if (!file || file === currentFile) return;
    if (ref.current == null) return;

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    ref.current.files = dataTransfer.files;
  }, [file]);

  return (
    <FormControl
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      type="file"
      ref={ref}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        const f = event.target.files ? event.target.files[0] : undefined;
        setCurrentFile(f);
        onChange(f);
      }}
    />
  );
}
