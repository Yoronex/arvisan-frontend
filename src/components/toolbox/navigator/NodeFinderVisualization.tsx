import { useContext } from 'react';
import { GraphContext, GraphHighlightContext } from '../../../context';
import { Option } from '../../../helpers/filter';
import SearchDropdown from '../../forms/SearchDropdown';

export default function NodeFinderVisualization() {
  const { graph } = useContext(GraphContext);
  const { highlightNodes } = useContext(GraphHighlightContext);
  const { nodes } = graph;

  const selectOption = (option: Option) => {
    const node = nodes.find((n) => n.data.id === option.id);
    if (!node) return;
    highlightNodes([node.data]);
  };

  const options = nodes.map((n): Option => ({ id: n.data.id, label: n.data.properties.fullName }));

  return (<SearchDropdown options={options} onSelect={selectOption} label="Search node to highlight" />);
}
