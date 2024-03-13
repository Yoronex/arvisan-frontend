import {
  Dropdown, Form, InputGroup, NavDropdown, Spinner,
} from 'react-bootstrap';
import { ReactNode, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbsContext } from '../../../context/BreadcrumbsContext';
import { VisualizationHistory } from '../../../context/VisualizationHistory';
import HighlightSearch from './HighlightSearch';
import { searchNodes } from '../../../helpers/filter';
import { NodeData } from '../../../api';

interface Props {
  searchKey: string;
  setSearchKey: (key: string) => void;
  DropdownComponent: typeof Dropdown | typeof NavDropdown;
}

export default function DomainSelectorOptions({
  searchKey, setSearchKey, DropdownComponent,
}: Props) {
  const { domains, loading } = useContext(BreadcrumbsContext);
  const { currentNodeId, visitNode } = useContext(VisualizationHistory);

  const filteredDomains = searchNodes(domains, searchKey);

  const onSelect = (data: NodeData) => {
    visitNode({ type: 'backend', data, timestamp: new Date() });
  };

  const renderOptions = (): ReactNode | ReactNode[] => {
    if (loading) return <Spinner />;

    return filteredDomains.map((d) => (
      <DropdownComponent.Item
        key={d.id}
        onClick={() => onSelect(d)}
        active={d.id === currentNodeId}
      >
        <HighlightSearch label={d.label} searchKey={searchKey} />
      </DropdownComponent.Item>
    ));
  };

  return (
    <>
      <DropdownComponent.Header>
        Select domain
      </DropdownComponent.Header>
      <DropdownComponent.Header>
        <InputGroup>
          <InputGroup.Text><FontAwesomeIcon icon={faMagnifyingGlass} /></InputGroup.Text>
          <Form.Control
            value={searchKey}
            onChange={(event) => setSearchKey(event.target.value)}
          />
        </InputGroup>
      </DropdownComponent.Header>
      <DropdownComponent.Divider />
      {renderOptions()}
    </>
  );
}
