import { useContext, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { DomainContext } from '../../../context/DomainContext';
import DomainSelectorOptions from './DomainSelectorOptions';

export default function DomainSelector() {
  const [searchKey, setSearchKey] = useState('');
  const { currentDomain } = useContext(DomainContext);

  const handleToggle = (nextShow: boolean) => {
    if (nextShow) return;
    setSearchKey('');
  };

  return (
    <Dropdown onToggle={handleToggle} title="Choose domain..." className="w-100">
      <Dropdown.Toggle className="w-100">{currentDomain ? currentDomain.label : 'Choose domain...'}</Dropdown.Toggle>
      <Dropdown.Menu show className="overflow-x-hidden overflow-y-scroll" style={{ height: '20rem' }}>
        <DomainSelectorOptions
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          DropdownComponent={Dropdown}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
}
