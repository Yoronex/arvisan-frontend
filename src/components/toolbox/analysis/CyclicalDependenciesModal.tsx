import { Modal } from 'react-bootstrap';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { DependencyCycle, DependencyCycleRender } from '../../../api';
import { GraphContext } from '../../../context';

interface Props {
  cyclicalDependencies?: DependencyCycleRender[];
  onClose: () => void;
  label?: string,
}

export default function CyclicalDependenciesModal({ cyclicalDependencies, onClose, label }: Props) {
  const { graph } = useContext(GraphContext);

  const cyclicalDepVisible = (d: DependencyCycle) => {
    const edges = d.path;
    return edges.every((e1) => graph.edges.find((e2) => e2.data.id.includes(e1.id)));
  };

  const renderDepCycle = (cyclicalDependency: DependencyCycleRender) => (
    <div>
      <h5 className="d-flex flex-wrap align-items-center gap-2">
        <div>Rendered dependency:</div>
        <div className="">
          {cyclicalDependency.node.label}
        </div>
        {cyclicalDependency.path.map((c) => (
          <>
            <FontAwesomeIcon icon={faArrowRightLong} />
            <div className="">{c.targetNode.label}</div>
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
                  <li value={i + 1} key={e.id}>{e.targetNode.label}</li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const modalContent = () => {
    if (!cyclicalDependencies) return null;
    return cyclicalDependencies.map((d, i) => {
      if (i === 0) return renderDepCycle(d);
      return (
        <>
          <hr />
          {renderDepCycle(d)}
        </>
      );
    });
  };

  const open = !!cyclicalDependencies;

  return (
    <Modal show={open} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          Cyclical dependency details of
          {' '}
          {label}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalContent()}
      </Modal.Body>
    </Modal>
  );
}

CyclicalDependenciesModal.defaultProps = ({
  cyclicalDependencies: undefined,
  label: '',
});
