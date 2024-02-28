import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { GraphHighlightContext } from '../../../context';
import { LayerViolation } from '../../../api';

interface Props {
  violations: LayerViolation[];
  onHighlight?: () => void;
}

export default function SubLayerViolationsDetails({ violations, onHighlight }: Props) {
  const { highlightEdges } = useContext(GraphHighlightContext);

  const handleHighlight = (d: LayerViolation) => {
    highlightEdges([d]);
    if (onHighlight) onHighlight();
  };

  const renderSublayerViolation = (violation: LayerViolation) => (
    <div>
      <h5 className="d-flex flex-wrap align-items-center gap-2">
        <Button
          title="Show this cyclical dependency in visualization"
          onClick={() => handleHighlight(violation)}
        >
          <FontAwesomeIcon icon={faBinoculars} size="sm" />
        </Button>
        <div>Rendered dependency:</div>
        <div className="">
          {violation.sourceNode?.label}
          {' '}
          <FontAwesomeIcon icon={faArrowRightLong} />
          {' '}
          {violation.targetNode?.label}
        </div>
      </h5>
      Actual dependencies:
      <div>
        <ul>
          {violation.actualEdges.map((c) => (
            <li
              className="mb-2"
              key={`${c.source}-${c.target}`}
            >
              {c.sourceNode.label}
              {' '}
              <FontAwesomeIcon icon={faArrowRightLong} />
              {' '}
              {c.targetNode.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  if (violations.length === 0) {
    return (
      <span className="fst-italic">
        No sublayer violations were found.
      </span>
    );
  }

  return violations.map((l, i) => {
    if (i === 0) return renderSublayerViolation(l);
    return (
      <>
        <hr />
        {renderSublayerViolation(l)}
      </>
    );
  });
}

SubLayerViolationsDetails.defaultProps = ({
  onHighlight: undefined,
});
