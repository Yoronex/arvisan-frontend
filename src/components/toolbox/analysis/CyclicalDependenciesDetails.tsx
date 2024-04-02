import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useContext, useMemo } from 'react';
import { DependencyCycle, DependencyCycleRender } from '../../../api';
import { GraphContext, GraphHighlightContext } from '../../../context';
import { nodeToString } from '../../../helpers/node';

interface Props {
  cyclicalDependencies: DependencyCycleRender[];
  onHighlight?: () => void;
}

export default function CyclicalDependenciesDetails({
  cyclicalDependencies: cdeps, onHighlight,
}: Props) {
  const { graph } = useContext(GraphContext);
  const { highlightEdges } = useContext(GraphHighlightContext);

  const cyclicalDepVisible = useCallback((d: DependencyCycle) => {
    const edges = d.path;
    return edges.every((e1) => graph.edges.find((e2) => e2.data.id.includes(e1.id)));
  }, [graph.edges]);

  const cyclicalDependencies = useMemo(() => {
    const cyclDeps = [...cdeps];
    return cyclDeps.sort((a, b) => {
      const aVisible = cyclicalDepVisible(a);
      const bVisible = cyclicalDepVisible(b);
      if (aVisible && !bVisible) return -1;
      if (!aVisible && bVisible) return 1;
      return 0;
    });
  }, [cdeps, cyclicalDepVisible]);

  const handleHighlight = (d: DependencyCycleRender) => {
    highlightEdges(d.path);
    if (onHighlight) onHighlight();
  };

  const renderDepCycle = (cyclicalDependency: DependencyCycleRender) => (
    <div>
      <h5 className="d-flex flex-wrap align-items-center gap-2">
        <Button
          title="Show this cyclical dependency in visualization"
          onClick={() => handleHighlight(cyclicalDependency)}
          disabled={!cyclicalDepVisible(cyclicalDependency)}
        >
          <FontAwesomeIcon icon={faBinoculars} size="sm" />
        </Button>
        <div>Rendered dependency:</div>
        <div className="">
          {nodeToString(cyclicalDependency.node)}
        </div>
        {cyclicalDependency.path.map((c) => (
          <>
            <FontAwesomeIcon icon={faArrowRightLong} />
            <div className="">{nodeToString(c.targetNode)}</div>
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
              <span className="fw-bold">{nodeToString(c.node)}</span>
              <ol>
                <li style={{ listStyleType: 'none' }}>{nodeToString(c.node)}</li>
                {c.path.map((e, i) => (
                  <li value={i + 1} key={e.id}>{nodeToString(e.targetNode)}</li>
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
  onHighlight: undefined,
});
