import {
  Form, InputGroup, NavDropdown, Spinner,
} from 'react-bootstrap';
import { ReactNode, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbsContext, VisualizationHistory } from '../../context';
import { searchNodes } from '../../helpers/filter';
import { NodeData } from '../../api';
import HighlightSearch from '../toolbox/navigator/HighlightSearch';

export default function BreadcrumbDomain() {
  const [searchKey, setSearchKey] = useState('');
  const {
    currentDomain, domains, loading,
  } = useContext(BreadcrumbsContext);
  const { currentNodeId, visitNode } = useContext(VisualizationHistory);

  const handleToggle = (nextShow: boolean) => {
    if (nextShow) return;
    setSearchKey('');
  };

  const filteredDomains = searchNodes(domains, searchKey);

  const onSelect = (data: NodeData) => {
    visitNode({ type: 'backend', data, timestamp: new Date() });
  };

  const renderOptions = (): ReactNode | ReactNode[] => {
    if (loading) return <Spinner />;

    return filteredDomains.map((d) => (
      <NavDropdown.Item
        key={d.id}
        onClick={() => onSelect(d)}
        active={d.id === currentNodeId}
      >
        <HighlightSearch label={d.label} searchKey={searchKey} />
      </NavDropdown.Item>
    ));
  };

  return (
    <NavDropdown
      title={currentDomain ? currentDomain.name : 'Choose domain'}
      active={currentDomain != null && currentNodeId === currentDomain.id}
      onToggle={handleToggle}
    >
      <div style={{ maxHeight: '50dvh' }} className="overflow-y-scroll overflow-x-hidden">
        <NavDropdown.Header>
          Select domain
        </NavDropdown.Header>
        <NavDropdown.Header>
          <InputGroup>
            <InputGroup.Text><FontAwesomeIcon icon={faMagnifyingGlass} /></InputGroup.Text>
            <Form.Control
              value={searchKey}
              onChange={(event) => setSearchKey(event.target.value)}
            />
          </InputGroup>
        </NavDropdown.Header>
        <NavDropdown.Divider />
        {renderOptions()}
      </div>
    </NavDropdown>
  );
}
