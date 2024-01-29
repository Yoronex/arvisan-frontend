import {
  Dropdown, Form, InputGroup, NavDropdown, Spinner,
} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { ReactNode, useContext } from 'react';
import { DomainContext } from '../../../context/DomainContext';
import { VisualizationHistory } from '../../../context/VisualizationHistory';
import HighlightSearch from './HighlightSearch';
import { searchNodes } from '../../../helpers/filter';

interface Props {
  searchKey: string;
  setSearchKey: (key: string) => void;
  DropdownComponent: typeof Dropdown | typeof NavDropdown;
}

export default function DomainSelectorOptions({
  searchKey, setSearchKey, DropdownComponent,
}: Props) {
  const { domains, loading } = useContext(DomainContext);
  const { currentNode, visitNode } = useContext(VisualizationHistory);

  const filteredDomains = searchNodes(domains, searchKey);

  const renderOptions = (): ReactNode | ReactNode[] => {
    if (loading) return <Spinner />;

    return filteredDomains.map((d) => (
      <DropdownComponent.Item
        key={d.id}
        onClick={() => visitNode(d, d)}
        active={d.id === currentNode?.id}
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
          <InputGroup.Text><Search /></InputGroup.Text>
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
