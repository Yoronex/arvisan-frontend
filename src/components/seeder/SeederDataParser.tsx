import { FormEvent, useState } from 'react';
import { Variant } from 'react-bootstrap/types';
import { Alert, Collapse, Form } from 'react-bootstrap';
import MultiFileSelect from './MultiFileSelect';
import { ApiError, GraphService } from '../../api';
import LoadingButton from '../forms/LoadingButton';

export default function SeederDataParser() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ variant: Variant, message: string }>();

  const [structureFiles, setStructureFiles] = useState<(File | undefined)[]>([undefined]);
  const [dependencyFiles, setDependencyFiles] = useState<(File | undefined)[]>([undefined]);
  const [detailsFiles, setDetailsFiles] = useState<(File | undefined)[]>([undefined]);
  const [integrationFiles, setIntegrationFiles] = useState<(File | undefined)[]>([undefined]);
  const [includeLayer, setIncludeLayer] = useState(false);
  const [anonymize, setAnonymize] = useState(false);
  const [alsoImmediateImport, setAlsoImmediatelyImport] = useState(false);

  const noUndefined = (files: (File | undefined)[]) => files.every((f) => f !== undefined);

  const execute = async () => {
    const res = await GraphService.parseGraph({
      formData: {
        structureFiles: structureFiles as File[],
        dependencyFiles: dependencyFiles as File[],
        detailsFiles: detailsFiles as File[],
        integrationFiles: integrationFiles as File[],
        includeModuleLayerLayer: includeLayer ? 'true' : 'false',
        anonymize: anonymize ? 'true' : 'false',
      },
    });
    const blob = new Blob([res], {
      type: 'application/zip',
    });
    const zipUrl = URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.href = zipUrl;
    tempLink.setAttribute('download', 'output.zip');
    tempLink.click();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (loading) return;
    setResult(undefined);

    if (noUndefined(structureFiles) && noUndefined(dependencyFiles)) {
      setLoading(true);
      execute()
        .then(() => {})
        .catch((e: ApiError) => {
          setResult({ variant: 'danger', message: e.message });
        })
        .finally(() => setLoading(false));
    }

    setValidated(true);
  };

  return (
    <div>
      <h5>Data parser</h5>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="d-flex flex-column gap-2">
        <MultiFileSelect files={structureFiles} setFiles={setStructureFiles} label="Structure files" />
        <MultiFileSelect files={dependencyFiles} setFiles={setDependencyFiles} label="Dependency files" />
        <MultiFileSelect files={detailsFiles} setFiles={setDetailsFiles} label="Module details files" />
        <MultiFileSelect files={integrationFiles} setFiles={setIntegrationFiles} label="Integration files" />
        <div className="my-2">
          <Form.Check
            id="include-layer"
            checked={includeLayer}
            onChange={(e) => setIncludeLayer(e.target.checked)}
            label={'Include the "layer"-layer between the Application and the Sublayer layers'}
          />
          <Form.Check
            id="anonymize"
            checked={anonymize}
            onChange={(e) => setAnonymize(e.target.checked)}
            label="Anonymize the dataset."
          />
          <Form.Check
            id="also-import"
            checked={alsoImmediateImport}
            onChange={(e) => setAlsoImmediatelyImport(e.target.checked)}
            label="After parsing the input data, import this data into the database instead of downloading it."
            disabled
          />
        </div>
        <div>
          <LoadingButton type="submit" loading={loading}>Submit</LoadingButton>
        </div>
        <Collapse in={!!result}>
          <div className="mt-3">
            <Alert variant={result?.variant}>{result?.message}</Alert>
          </div>
        </Collapse>
      </Form>
    </div>
  );
}
