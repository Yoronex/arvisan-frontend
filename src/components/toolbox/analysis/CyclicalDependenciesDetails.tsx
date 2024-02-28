import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { DependencyCycle, DependencyCycleRender } from '../../../api';
import { GraphContext, GraphHighlightContext } from '../../../context';

interface Props {
  cyclicalDependencies: DependencyCycleRender[];
  onClose?: () => void;
}

export default function CyclicalDependenciesDetails({ cyclicalDependencies, onClose }: Props) {
  const { graph } = useContext(GraphContext);
  const { highlightEdges } = useContext(GraphHighlightContext);

  const cyclicalDepVisible = (d: DependencyCycle) => {
    const edges = d.path;
    return edges.every((e1) => graph.edges.find((e2) => e2.data.id.includes(e1.id)));
  };

  const onHighlight = (d: DependencyCycleRender) => {
    highlightEdges(d.path);
    if (onClose) onClose();
  };

  const renderDepCycle = (cyclicalDependency: DependencyCycleRender) => (
    <div>
      <h5 className="d-flex flex-wrap align-items-center gap-2">
        <Button
          title="Highlight this cyclical dependency"
          onClick={() => onHighlight(cyclicalDependency)}
        >
          <FontAwesomeIcon icon={faBinoculars} size="sm" />
        </Button>
        <div>Rendered dependency:</div>
        <div className="">
          {cyclicalDependency.node.label}
        </div>
        {cyclicalDependency.path.map((c) => (
          <>
            <FontAwesomeIcon icon={faArrowRightLong} />
            <div className="">{c.targetNode?.label}</div>
          </>
        ))}
      </h5>
      {!cyclicalDepVisible(cyclicalDependency) && (
        <div style={{ color: 'red' }}>
          NOTE: This path is currently not visible in the rendered graph.
          Please adjust the visualization settings to make it visible.
          You probably only have to increase the
          {' '}
          <span className="fst-italic">dependency length</span>
          .
        </div>
      )}
      Actual dependencies:
      <div>
        <ul>
          {cyclicalDependency.actualCycles.map((c) => (
            <li
              className="mb-2"
              key={`${c.node.id}--${c.path.map((p) => p.id).join('-')}`}
            >
              Path of length
              {' '}
              {c.length}
              {' '}
              from/to
              {' '}
              <span className="fw-bold">{c.node.label}</span>
              <ol>
                <li style={{ listStyleType: 'none' }}>{c.node.label}</li>
                {c.path.map((e, i) => (
                  <li value={i + 1} key={e.id}>{e.targetNode?.label}</li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  if (cyclicalDependencies.length === 0) {
    return (
      <span className="fst-italic">
        No cyclical dependencies were found.
      </span>
    );
  }

  return cyclicalDependencies.map((d, i) => {
    if (i === 0) return renderDepCycle(d);
    return (
      <>
        <hr />
        {renderDepCycle(d)}
      </>
    );
  });
}

CyclicalDependenciesDetails.defaultProps = ({
  onClose: undefined,
});
