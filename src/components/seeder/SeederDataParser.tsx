import { FormEvent, useState } from 'react';
import { Variant } from 'react-bootstrap/types';
import { Alert, Collapse, Form } from 'react-bootstrap';
import * as JSZip from 'jszip';
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

  const noUndefined = (files: (File | undefined)[]) => files.every((f) => f !== undefined);

  const execute = async (seedDatabase: boolean) => {
    const res = await GraphService.parseGraph({
      formData: {
        structureFiles: structureFiles as File[],
        dependencyFiles: dependencyFiles as File[],
        detailsFiles: detailsFiles as File[],
        integrationFiles: integrationFiles as File[],
        includeModuleLayerLayer: includeLayer ? 'true' : 'false',
        anonymize: anonymize ? 'true' : 'false',
      },
    }) as unknown as Blob;

    if (seedDatabase) {
      const zip = await JSZip.loadAsync(res);
      const nodes = zip.file('nodes.csv');
      const relationships = zip.file('relationships.csv');
      if (!nodes || !relationships) {
        throw new Error('nodes.csv or relationships.csv not found in the intermediate response. Try to not immediately import the data, but first download it.');
      }
      const nodesBlob = await nodes.async('blob');
      const relationshipsBlob = await relationships.async('blob');

      await GraphService.importGraph({
        formData: {
          nodes: nodesBlob,
          relationships: relationshipsBlob,
        },
      });
      setResult({ variant: 'success', message: 'Graph successfully imported. Reloading the page to use the new dataset...' });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      const zipUrl = URL.createObjectURL(res);
      const tempLink = document.createElement('a');
      document.body.appendChild(tempLink);
      tempLink.href = zipUrl;
      tempLink.setAttribute('download', 'output.zip');
      tempLink.click();
      document.body.removeChild(tempLink);
      setResult({ variant: 'success', message: 'Graph successfully parsed.' });
    }
  };

  const handleSubmit = (event: FormEvent, seedDatabase = false) => {
    event.preventDefault();
    event.stopPropagation();

    if (loading) return;
    setResult(undefined);

    if (noUndefined(structureFiles) && noUndefined(dependencyFiles)) {
      setLoading(true);
      execute(seedDatabase)
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
      <p className="fst-italic">
        Use this form to parse raw datasets to the Arvisan format. You can either download the
        output as a.zip file, or directly import the parser output into Arvisan. Please look at the
        {' '}
        <a href="https://github.com/Yoronex/arvisan-input-parser/blob/master/docs/data-sources/README.md">
          data sources documentation
        </a>
        {' '}
        to find which data should be used for which field, and where these datasets can be found.
        Note that all datasets are optional, but make sure you remove their corresponding file input
        fields.
      </p>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <MultiFileSelect files={dependencyFiles} setFiles={setDependencyFiles} label="Dependency files" />
        <MultiFileSelect files={detailsFiles} setFiles={setDetailsFiles} label="Module details files" />
        <MultiFileSelect files={structureFiles} setFiles={setStructureFiles} label="Structure files" />
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
            label="Anonymize the resulting graph"
          />
        </div>
        <div className="d-flex flex-row gap-2">
          <LoadingButton type="submit" loading={loading}>Parse & download</LoadingButton>
          <LoadingButton
            onClick={(e) => handleSubmit(e, true)}
            loading={loading}
          >
            Parse & seed
          </LoadingButton>
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
