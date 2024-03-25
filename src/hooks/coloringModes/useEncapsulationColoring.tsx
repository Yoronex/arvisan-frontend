import { useMemo } from 'react';
import cytoscape from 'cytoscape';
import { DEFAULT_NODE_COLOR_RATIO, getRatioColor, IRatioColoring } from '../../helpers/color';
import { getInboundEncapsulation, getOutboundEncapsulation } from '../../helpers/metrics';

export const encapsulationColors = DEFAULT_NODE_COLOR_RATIO;

export default function useEncapsulationColoring(): { colorings: IRatioColoring[] } {
  const colors = encapsulationColors;
  const rangeFunction = () => [0, 1] as [number, number];

  const colorings: IRatioColoring[] = useMemo(() => ([{
    name: 'Inbound encapsulation',
    type: 'ratio',
    colors,
    rangeFunction,
    colorFunction: (node: cytoscape.NodeSingular) => {
      const profile = node.data('properties.dependencyProfile');
      const encapsulation = getInboundEncapsulation(profile);

      const [firstColor, secondColor, ...restColors] = colors;
      return getRatioColor(encapsulation, firstColor, secondColor, ...restColors);
    },
  }, {
    name: 'Outbound encapsulation',
    type: 'ratio',
    colors,
    rangeFunction,
    colorFunction: (node: cytoscape.NodeSingular) => {
      const profile = node.data('properties.dependencyProfile');
      const encapsulation = getOutboundEncapsulation(profile);

      const [firstColor, secondColor, ...restColors] = colors;
      return getRatioColor(encapsulation, firstColor, secondColor, ...restColors);
    },
  }]), [colors]);

  return { colorings };
}
