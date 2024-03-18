import { useContext } from 'react';
import { LayerContext, GraphSettingsContext, VisualizationHistory } from '../../../context';
import MultiRangeSlider from '../../forms/MultiRangeSlider';

export default function GraphLayerDepth() {
  const { settings, updateSettings } = useContext(GraphSettingsContext);
  const { layerDepth } = settings;
  const { layers, loading } = useContext(LayerContext);
  const { currentNodeDepth } = useContext(VisualizationHistory);

  const sliderValue = Math.min(currentNodeDepth + layerDepth, layers.length - 1);

  const setLayerDepth = (value: number) => {
    updateSettings({
      ...settings,
      layerDepth: Math.max(0, value - currentNodeDepth),
    });
  };

  return (
    <MultiRangeSlider
      values={[currentNodeDepth, sliderValue]}
      onChange={([, top]) => setLayerDepth(top)}
      min={0}
      max={layers.length - 1}
      label="Layer depth"
      disabled={[true, loading]}
      valueLabels={layers.map((l) => l.label)}
      keepBarLeft
      markerValue={currentNodeDepth}
    />
  );
}
