import { useContext, useState } from 'react';
import {
  Button, Modal, NavLink, Spinner, Table,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { VisualizationHistory } from '../context/VisualizationHistory';
import { DomainContext } from '../context/DomainContext';

export default function WelcomeModal() {
  const { currentNode, visitNode } = useContext(VisualizationHistory);
  const { loading, domains, updateDomain } = useContext(DomainContext);

  const [show, setShow] = useState(currentNode == null);
  const sortedDomains = domains.sort((d1, d2) => d2.nrDependencies - d1.nrDependencies);

  const handleClose = () => {
    if (currentNode == null) return;
    setShow(false);
  };

  const getDomainTable = () => {
    if (loading) return <Spinner />;

    return (
      <Table striped>
        <thead className="fw-bold">
          <tr>
            <td>Name</td>
            <td># Dependencies</td>
            <td># Dependents</td>
            <td># Inner dependencies</td>
            <td aria-label="Select" />
          </tr>
        </thead>
        <tbody>
          {sortedDomains.map((d) => {
            const click = () => {
              visitNode({ type: 'backend', data: d, timestamp: new Date() });
              updateDomain(d);
              setShow(false);
            };
            return (
              <tr
                key={d.id}
              >
                <td><button type="button" onClick={click} title={`Select ${d.label}`} className="border-0 bg-transparent">{d.label}</button></td>
                <td><button type="button" onClick={click} title={`Select ${d.label}`} className="border-0 bg-transparent">{d.nrDependencies}</button></td>
                <td><button type="button" onClick={click} title={`Select ${d.label}`} className="border-0 bg-transparent">{d.nrDependents}</button></td>
                <td><button type="button" onClick={click} title={`Select ${d.label}`} className="border-0 bg-transparent">{d.nrInternalDependencies}</button></td>
                <td><Button onClick={click} size="sm" title={`Select ${d.label}`}>Select</Button></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  const { shortHash, tags, date: rawDate } = LAST_COMMIT_INFO;
  const date = new Date(rawDate);

  return (
    <>
      <NavLink onClick={() => setShow(true)}>Overview</NavLink>

      <Modal show={show} size="xl" onHide={handleClose}>
        <Modal.Header closeButton={currentNode != null}>
          <div>
            <Modal.Title>
              Welcome to the Vopak Architecture Visualizer & Analyzer
            </Modal.Title>
            <p className="mb-0">
              {shortHash}
              {tags.length > 0 ? `-${tags.join('-')}` : ''}
              {' '}
              (
              {date.toLocaleString()}
              )
            </p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p>
            This tool allows you to visualize Vopak's software architecture
            and landscape using a graph visualization. Then, you can use the built-in analysis
            tools to find dependency violations within the generated view.
          </p>
          <h4>Tips</h4>
          <ul>
            <li>Use the toolbox on the left to navigate through the architecture in the "Navigate" pane.</li>
            <li>Adjust the visualization by changing parameters in the "Visualization" menu of the toolbox.</li>
            <li>You can move through the visualization by dragging over the beige background or by zooming in and out.</li>
            <li>If a timeout occurs, try to make your graph smaller. To prevent crashes, queries can take up at most 5 seconds of query time.</li>
            <li>
              Nodes cannot be moved around, unless you explicitly enable this in the top-right "Settings" (
              <FontAwesomeIcon icon={faGear} />
              ) menu.
            </li>
          </ul>
          <h4>
            Select domain
          </h4>
          <p>To begin visualizing, choose a functional domain as a starting point:</p>
          <div>
            {getDomainTable()}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
