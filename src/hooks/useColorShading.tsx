import { useCallback, useContext } from 'react';
import cytoscape from 'cytoscape';
import { LayerContext } from '../context/LayerContext';
import { shadeHexColor } from '../helpers/color';

export default function useColorShading() {
  const { layers } = useContext(LayerContext);

  /**
   * Given a node and its base hex color, shade it based on the depth of the node in the tree.
   * @param node
   * @param hexColor
   */
  const shadeColorByDepth = useCallback((node: cytoscape.NodeSingular, hexColor: string) => {
    const depth = Number(node.data('properties.depth'));
    const alpha = (layers.length - depth) * 0.15;
    return shadeHexColor(hexColor, alpha);
  }, [layers.length]);

  return { shadeColorByDepth };
}
