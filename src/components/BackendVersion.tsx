import { useEffect, useState } from 'react';
import { Placeholder } from 'react-bootstrap';
import { GitCommitInfo, RootService } from '../api';

export default function BackendVersion() {
  const [version, setVersion] = useState<GitCommitInfo | null>(null);

  useEffect(() => {
    RootService.getBackendVersion()
      .then((v) => setVersion(v))
      .catch((e) => console.error(e));
  }, []);

  if (version == null) {
    return (
      <Placeholder animation="glow">
        <Placeholder xs={1} />
        {' '}
        <Placeholder xs={2} />
        {' '}
        <Placeholder xs={3} />
      </Placeholder>
    );
  }

  const { tags, shortHash, date: rawDate } = version;
  const date = new Date(rawDate);
  return `Backend: ${tags.length > 0 ? tags.join('-') : 'dev'}-${shortHash} (${date.toLocaleString()})`;
}
