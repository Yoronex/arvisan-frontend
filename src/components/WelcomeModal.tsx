import { useContext, useState } from 'react';
import {
  Button, Modal, NavLink, Placeholder, Table,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { VisualizationHistory, BreadcrumbsContext } from '../context';
import BackendVersion from './BackendVersion';

export default function WelcomeModal() {
  const { currentNode, visitNode } = useContext(VisualizationHistory);
  const { loading, domains } = useContext(BreadcrumbsContext);

  const [show, setShow] = useState(currentNode == null);
  const sortedDomains = domains
    .sort((d1, d2) => d2.nrOutgoingDependencies - d1.nrOutgoingDependencies);

  const handleClose = () => {
    if (currentNode == null) return;
    setShow(false);
  };

  const getDomainTableRows = () => {
    if (loading) {
      return [20, 18, 17, 21, 15].map((x) => (
        <Placeholder as="tr" key={x} animation="glow">
          <td aria-label="loading"><Placeholder style={{ width: `${x}rem` }} /></td>
          <td aria-label="loading"><Placeholder xs={2} /></td>
          <td aria-label="loading"><Placeholder xs={2} /></td>
          <td aria-label="loading"><Placeholder xs={2} /></td>
          <td aria-label="loading"><Placeholder style={{ width: '2rem' }} /></td>
        </Placeholder>
      ));
    }
    if (!sortedDomains) return null;

    return sortedDomains.map((d) => {
      const click = () => {
        visitNode({ type: 'backend', data: d, timestamp: new Date() });
        setShow(false);
      };
      return (
        <tr
          key={d.id}
        >
          <td><button type="button" onClick={click} title={`Select ${d.label}`} className="border-0 bg-transparent">{d.label}</button></td>
          <td><button type="button" onClick={click} title={`Select ${d.label}`} className="border-0 bg-transparent">{d.nrOutgoingDependencies}</button></td>
          <td><button type="button" onClick={click} title={`Select ${d.label}`} className="border-0 bg-transparent">{d.nrIncomingDependencies}</button></td>
          <td><button type="button" onClick={click} title={`Select ${d.label}`} className="border-0 bg-transparent">{d.nrInternalDependencies}</button></td>
          <td><Button onClick={click} size="sm" title={`Select ${d.label}`}>Select</Button></td>
        </tr>
      );
    });
  };

  const getDomainTable = () => (
    <Table striped>
      <thead className="fw-bold">
        <tr>
          <td>Name</td>
          <td># Outgoing Dependencies</td>
          <td># Incoming Dependencies</td>
          <td># Inner dependencies</td>
          <td aria-label="Select" />
        </tr>
      </thead>
      <tbody>
        {getDomainTableRows()}
      </tbody>
    </Table>
  );

  const getFrontendVersion = () => {
    const { shortHash, tags, date: rawDate } = LAST_COMMIT_INFO;
    const date = new Date(rawDate);
    return `Frontend: ${tags.length > 0 ? tags.join('-') : 'dev'}-${shortHash} (${date.toLocaleString()})`;
  };

  return (
    <>
      <NavLink
        onClick={() => setShow(true)}
        title="Open domain overview"
      >
        Overview
      </NavLink>

      <Modal show={show} size="xl" onHide={handleClose}>
        <Modal.Header closeButton={currentNode != null}>
          <div>
            <Modal.Title>
              Welcome to the Vopak Architecture Visualizer & Analyzer
            </Modal.Title>
            <p className="mb-0"><BackendVersion /></p>
            <p className="mb-0">{getFrontendVersion()}</p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p>
            This tool allows you to visualize Vopak&apos;s software architecture
            and landscape using a graph visualization. Then, you can use the built-in analysis
            tools to find dependency violations within the generated view.
          </p>
          <h4>Tips</h4>
          <ul>
            <li>
              Use the toolbox on the left to navigate through
              the architecture in the &#34;Navigation&#34; pane.
              Here, you can also find where you are in the architecture landscape.
            </li>
            <li>
              Adjust the visualization by changing parameters
              in the &#34;Visualization&#34; menu of the toolbox.
            </li>
            <li>
              You can move through the visualization by dragging
              over the beige background or by zooming in and out.
            </li>
            <li>
              If a timeout occurs, try to make your graph smaller.
              To prevent crashes, queries can take up at most 5 seconds of query time.
            </li>
            <li>
              Nodes cannot be moved around, unless you explicitly
              enable this in the top-right &#34;Settings&#34; (
              <FontAwesomeIcon icon={faGear} />
              ) menu.
            </li>
            <li>
              To get more information about a node or edge, you can
              click it using the left mouse button.
            </li>
            <li>
              To select a node (i.e. choose that node as the starting
              point for generating a new visualization), either click the
              &#34;select this node&#34; button in the node&apos;s details
              menu or right-click it.
            </li>
            <li>
              In the &#34;Analysis&#34; tab in the toolbox, you can choose to hide groups
              of edges from the visualization. You can also highlight them, which colors
              these edges red (default).
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
