import { useContext } from 'react';
import { GraphContext } from '../../../context/GraphContext';
import { Option } from '../../../helpers/filter';
import { NodeHighlightContext } from '../../../context/NodeHighlightContext';
import SearchDropdown from '../../forms/SearchDropdown';

export default function NodeFinder() {
  const { graph } = useContext(GraphContext);
  const { highlight } = useContext(NodeHighlightContext);
  const { nodes } = graph;

  const selectOption = (option: Option) => {
    const node = nodes.find((n) => n.data.id === option.id);
    if (!node) return;
    highlight(node.data);
  };

  const options = nodes.map((n): Option => ({ id: n.data.id, label: n.data.label }));

  return (<SearchDropdown options={options} onSelect={selectOption} label="Search node" />);
}
