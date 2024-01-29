import {
  useCallback,
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  Dropdown, FloatingLabel, Form, InputGroup,
} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { VisualizationContext } from '../../../context/VisualizationContext';
import { searchNodes } from '../../../helpers/filter';
import HighlightSearch from './HighlightSearch';
import { NodeData } from '../../../api';
import { NodeHighlightContext } from '../../../context/NodeHighlightContext';

export default function NodeFinder() {
  const { graph } = useContext(VisualizationContext);
  const { highlight } = useContext(NodeHighlightContext);
  const [searchKey, setSearchKey] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectNode = (n: NodeData) => {
    setShowOptions(false);
    setSearchKey(n.label);
    highlight(n);
  };

  const handleClickOrFocus = useCallback((target: Node | null) => {
    if (!ref.current) return;
    setShowOptions(ref.current.contains(target));
  }, [ref]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      handleClickOrFocus(event.target as Node | null);
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, showOptions, handleClickOrFocus, graph]);

  const { nodes } = graph;
  const filteredNodes = searchNodes(nodes.map((n) => n.data), searchKey.toLowerCase());

  return (
    <div ref={ref}>
      <InputGroup>
        <InputGroup.Text><Search /></InputGroup.Text>
        <FloatingLabel label="Search node">
          <Form.Control
            value={searchKey}
            onChange={(event) => {
              setSearchKey(event.target.value);
            }}
          />
        </FloatingLabel>
      </InputGroup>
      <div>
        <Dropdown.Menu show={showOptions}>
          <div className="overflow-x-hidden overflow-y-scroll" style={{ height: '20rem' }}>
            <Dropdown.Header>Found nodes:</Dropdown.Header>
            {filteredNodes.map((n) => (
              <Dropdown.Item key={n.id} onClick={() => selectNode(n)}>
                <HighlightSearch label={n.label} searchKey={searchKey} />
              </Dropdown.Item>
            ))}
          </div>
        </Dropdown.Menu>
      </div>
    </div>
  );
}
