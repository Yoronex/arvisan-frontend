import { Button, Form } from 'react-bootstrap';
import ControlledFileInput from './ControlledFileInput';

interface Props {
  files: (File | undefined)[];
  setFiles: (files: (File | undefined)[]) => void;
  label: string;
}

export default function MultiFileSelect({ files, setFiles, label }: Props) {
  const addFile = () => {
    setFiles(files.concat([undefined]));
  };

  const updateFile = (file: File | undefined, index: number) => {
    const filesCopy = [...files];
    filesCopy[index] = file;
    setFiles(filesCopy);
  };

  const deleteFile = (index: number) => {
    const filesCopy = [...files];
    filesCopy.splice(index, 1);
    setFiles(filesCopy);
  };

  return (
    <Form.Group className="d-flex flex-column">
      <Form.Label htmlFor={`upload-${label}`}>{label}</Form.Label>
      {files.map((f, i) => (
        <div
          key={`${label}-${f?.name ?? i}`}
          className="d-flex flex-row gap-1 mb-1"
        >
          <ControlledFileInput
            file={f}
            onChange={(newF) => updateFile(newF, i)}
            className="flex-grow-1"
            required
          />
          <Button variant="danger" onClick={() => deleteFile(i)}>-</Button>
        </div>
      ))}
      <div>
        <Button onClick={addFile}>Add file</Button>
      </div>
    </Form.Group>
  );
}
