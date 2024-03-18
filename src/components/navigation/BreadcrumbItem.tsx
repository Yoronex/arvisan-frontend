import { Form, InputGroup, NavDropdown } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb, NodeData } from '../../api';
import HighlightSearch from '../toolbox/navigator/HighlightSearch';
import { VisualizationHistory } from '../../context';
import { searchNodes } from '../../helpers/filter';

interface Props {
  breadcrumb: Breadcrumb;
  parentLayerName: string;
  parentItemName: string;
  active?: boolean;
}

export default function BreadcrumbItem({
  breadcrumb, parentLayerName, parentItemName, active,
}: Props) {
  const [searchKey, setSearchKey] = useState('');
  const { visitNode } = useContext(VisualizationHistory);

  const handleToggle = (nextShow: boolean) => {
    if (nextShow) return;
    setSearchKey('');
  };

  const filteredOptions = searchNodes(breadcrumb.options, searchKey);

  const getOption = (option: NodeData) => ((
    <NavDropdown.Item
      key={option.id}
      active={breadcrumb.id === option.id}
      onClick={() => {
        visitNode({ type: 'backend', data: option, timestamp: new Date() });
      }}
      title={option.label}
    >
      <HighlightSearch label={option.label} searchKey={searchKey} />
    </NavDropdown.Item>
  ));

  return (
    <NavDropdown
      title={breadcrumb.name ?? `${breadcrumb.layerLabel}s`}
      active={active}
      onToggle={handleToggle}
    >
      <div style={{ maxHeight: '50dvh', minWidth: '15rem' }} className="overflow-y-scroll overflow-x-hidden">
        <NavDropdown.Header>
          Select
          {' '}
          {breadcrumb.layerLabel.toLowerCase()}
          {' from '}
          {`${parentLayerName.toLowerCase()} ${parentItemName}`}
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
        {filteredOptions.map((o) => getOption(o))}
      </div>
    </NavDropdown>
  );
}

BreadcrumbItem.defaultProps = ({
  active: false,
});
