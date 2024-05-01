import {
  Alert, Collapse, Form,
} from 'react-bootstrap';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Variant } from 'react-bootstrap/types';
import { ApiError, GraphService } from '../../api';
import LoadingButton from '../forms/LoadingButton';

export default function SeederDataImporter() {
  const [validated, setValidated] = useState(false);
  const [nodesFile, setNodesFile] = useState<File | undefined>();
  const [edgesFile, setEdgesFile] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ variant: Variant, message: string }>();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (loading) return;

    setResult(undefined);

    if (nodesFile && edgesFile) {
      setLoading(true);
      GraphService.importGraph({
        formData: {
          nodes: nodesFile,
          relationships: edgesFile,
        },
      }).then(() => {
        setResult({ variant: 'success', message: 'Graph successfully imported. Reloading the page to use the new dataset...' });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }).catch((e: ApiError) => {
        setResult({ variant: 'danger', message: `Could not import dataset: ${e.message}` });
      }).finally(() => setLoading(false));
    }

    setValidated(true);
  };

  return (
    <div>
      <h5>Data importer</h5>
      <p className="fst-italic">Use this form to import parsed datasets directly in the database.</p>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="upload-nodes-file">Nodes file</Form.Label>
          <Form.Control
            required
            type="file"
            id="upload-nodes-file"
            accept=".csv,application/csv"
            value={nodesFile ? [nodesFile.name] : []}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setNodesFile(e.target.files ? e.target.files[0] : undefined);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="upload-edges-file">Relationships file</Form.Label>
          <Form.Control
            required
            type="file"
            id="upload-edges-file"
            accept=".csv,application/csv"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEdgesFile(e.target.files ? e.target.files[0] : undefined);
            }}
          />
        </Form.Group>
        <LoadingButton type="submit" loading={loading}>Submit</LoadingButton>
        <Collapse in={!!result}>
          <div className="mt-3">
            <Alert variant={result?.variant}>{result?.message}</Alert>
          </div>
        </Collapse>
      </Form>
    </div>
  );
}
