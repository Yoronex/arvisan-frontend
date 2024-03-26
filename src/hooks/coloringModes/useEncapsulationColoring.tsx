import { useMemo } from 'react';
import cytoscape from 'cytoscape';
import { DEFAULT_NODE_COLOR_RATIO, getRatioColor, IRatioColoring } from '../../helpers/color';
import { getInboundEncapsulation, getOutboundEncapsulation } from '../../helpers/metrics';
import { NodeData } from '../../api';

export const encapsulationColors = DEFAULT_NODE_COLOR_RATIO;

export default function useEncapsulationColoring(): { colorings: IRatioColoring[] } {
  const colors = encapsulationColors;
  const rangeFunction = () => [0, 1] as [number, number];

  const getDependencyProfile = (node: cytoscape.NodeSingular) => node.data('properties.dependencyProfile') as NodeData['properties']['dependencyProfile'];

  const colorings: IRatioColoring[] = useMemo(() => ([{
    name: 'Inbound encapsulation',
    nodeDetailsTitle: 'Inbound encapsulation',
    nodeDetailsValue(node: cytoscape.NodeSingular) {
      const profile = getDependencyProfile(node);
      return getInboundEncapsulation(profile);
    },
    type: 'ratio',
    colors,
    rangeFunction,
    colorFunction(node: cytoscape.NodeSingular) {
      const profile = getDependencyProfile(node);
      const encapsulation = getInboundEncapsulation(profile);

      const [firstColor, secondColor, ...restColors] = colors;
      return getRatioColor(encapsulation, firstColor, secondColor, ...restColors);
    },
  }, {
    name: 'Outbound encapsulation',
    nodeDetailsTitle: 'Outbound encapsulation',
    nodeDetailsValue(node: cytoscape.NodeSingular) {
      const profile = getDependencyProfile(node);
      return getOutboundEncapsulation(profile);
    },
    type: 'ratio',
    colors,
    rangeFunction,
    colorFunction(node: cytoscape.NodeSingular) {
      const profile = getDependencyProfile(node);
      const encapsulation = getOutboundEncapsulation(profile);

      const [firstColor, secondColor, ...restColors] = colors;
      return getRatioColor(encapsulation, firstColor, secondColor, ...restColors);
    },
  }]), [colors]);

  return { colorings };
}
