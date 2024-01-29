import { ReactNode, useContext, useState } from 'react';
import {
  Form, Dropdown, DropdownItem, InputGroup, DropdownDivider, Spinner,
} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { DomainContext } from '../../context/DomainContext';
import { VisualizationHistory } from '../../context/VisualizationHistory';

export default function DomainSelector() {
  const [searchKey, setSearchKey] = useState('');
  const { domains, loading, currentDomain } = useContext(DomainContext);

  const { visitNode } = useContext(VisualizationHistory);

  const filteredDomains = domains.filter((d) => {
    const nameSpaces = d.label.replaceAll('_', ' ');
    return d.label.toLowerCase().includes(searchKey) || nameSpaces.toLowerCase().includes(searchKey);
  });

  const handleToggle = (nextShow: boolean) => {
    if (nextShow) return;
    setSearchKey('');
  };

  const renderOptions = (): ReactNode | ReactNode[] => {
    if (loading) return <Spinner />;

    return filteredDomains.map((d) => {
      const searchIndex = d.label.toLowerCase().indexOf(searchKey);
      const beforeString = d.label.substring(0, searchIndex);
      const highlightString = d.label.substring(searchIndex, searchIndex + searchKey.length);
      const afterString = d.label.substring(searchIndex + searchKey.length);
      return (
        <DropdownItem key={d.id} onClick={() => visitNode(d, d)}>
          {beforeString}
          <span className="fw-bold">{highlightString}</span>
          {afterString}
        </DropdownItem>
      );
    });
  };

  return (
    <Dropdown onToggle={handleToggle}>
      <Dropdown.Toggle>{currentDomain ? currentDomain.label : 'Choose domain...'}</Dropdown.Toggle>
      <Dropdown.Menu show className="overflow-x-hidden overflow-y-scroll" style={{ height: '20rem' }}>
        <Dropdown.Header>
          <InputGroup>
            <InputGroup.Text><Search /></InputGroup.Text>
            <Form.Control
              value={searchKey}
              onChange={(event) => setSearchKey(event.target.value.toLowerCase())}
            />
          </InputGroup>
        </Dropdown.Header>
        <DropdownDivider />
        {renderOptions()}
      </Dropdown.Menu>
    </Dropdown>
  );
}
