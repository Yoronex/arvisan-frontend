import { useContext } from 'react';
import { LayerContext, GraphContext, VisualizationHistory } from '../../../context';
import MultiRangeSlider from '../../forms/MultiRangeSlider';

export default function GraphLayerDepth() {
  const { settings, updateSettings } = useContext(GraphContext);
  const { layerDepth } = settings;
  const { layers, loading } = useContext(LayerContext);
  const { currentNode } = useContext(VisualizationHistory);

  let currentDepth = 0;
  let layer: string | undefined;
  if (currentNode?.type === 'cytoscape') {
    layer = currentNode.data.data('properties.layer') as string;
  } else if (currentNode?.type === 'backend') {
    layer = currentNode.data.properties.layer;
  }
  if (layer !== undefined) {
    currentDepth = layers.findIndex((l) => layer!.includes(l.label));
  }
  const sliderValue = Math.min(currentDepth + layerDepth, layers.length - 1);

  const setLayerDepth = (value: number) => {
    updateSettings({
      ...settings,
      layerDepth: Math.max(0, value - currentDepth),
    });
  };

  return (
    <MultiRangeSlider
      values={[currentDepth, sliderValue]}
      onChange={([, top]) => setLayerDepth(top)}
      min={0}
      max={layers.length - 1}
      label="Layer depth"
      disabled={[true, loading]}
      valueLabels={layers.map((l) => l.label)}
      keepBarLeft
      markerValue={currentDepth}
    />
  );
}
