import { NavDropdown } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import WelcomeModal from '../WelcomeModal';
import DomainSelectorOptions from '../toolbox/navigator/DomainSelectorOptions';
import { BreadcrumbsContext, LayerContext } from '../../context';
import BreadcrumbItem from './BreadcrumbItem';
import { Breadcrumb } from '../../api';

export default function Breadcrumbs() {
  const [searchKey, setSearchKey] = useState('');

  const { layers } = useContext(LayerContext);
  const { currentDomain, breadcrumbs } = useContext(BreadcrumbsContext);

  const handleToggle = (nextShow: boolean) => {
    if (nextShow) return;
    setSearchKey('');
  };

  const renderBreadcrumbItem = (breadcrumb: Breadcrumb, index: number) => {
    // Layer is same index as parent, because the top layer is not included in
    // the breadcrumbs(as this has its own endpoint and is cached in memory).
    const { label: parentLayerName } = layers[index];
    const parentItemName = breadcrumbs[index - 1]?.name ?? currentDomain?.label ?? '???';

    return (
      <BreadcrumbItem
        key={breadcrumb.id}
        breadcrumb={breadcrumb}
        active={index === breadcrumbs.length - 1}
        parentLayerName={parentLayerName}
        parentItemName={parentItemName}
      />
    );
  };

  const separator = (<FontAwesomeIcon icon={faAngleRight} className="mx-1" />);

  return (
    <>
      <WelcomeModal />
      {separator}
      <NavDropdown
        title={currentDomain ? currentDomain.label : 'Choose domain'}
        active={currentDomain != null && breadcrumbs.length === 0}
        onToggle={handleToggle}
      >
        <div style={{ maxHeight: '50dvh' }} className="overflow-y-scroll overflow-x-hidden">
          <DomainSelectorOptions
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            DropdownComponent={NavDropdown}
          />
        </div>
      </NavDropdown>
      {breadcrumbs.map((b, i) => ((
        <>
          {separator}
          {renderBreadcrumbItem(b, i)}
        </>
      )))}
    </>
  );
}
