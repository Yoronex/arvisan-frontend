import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import WelcomeModal from '../WelcomeModal';
import {
  BreadcrumbsContext, GraphContext, LayerContext, VisualizationHistory,
} from '../../context';
import BreadcrumbItem from './BreadcrumbItem';
import { Breadcrumb, GraphLayer } from '../../api';
import BreadcrumbDomain from './BreadcrumbDomain';

export default function Breadcrumbs() {
  const { layers } = useContext(LayerContext);
  const { currentDomain, breadcrumbs } = useContext(BreadcrumbsContext);
  const { currentNodeId, currentNodeDepth } = useContext(VisualizationHistory);
  const { graph, getParents, settings } = useContext(GraphContext);
  const { layerDepth } = settings;

  // Determine how many extra "breadcrumbs" need to be added based on the
  const nrDeeperLayers = Math.max(0, Math.min(
    currentNodeDepth + layerDepth,
    layers.length - 1,
  ) - currentNodeDepth);
  const deeperLayerIndices = nrDeeperLayers
    ? new Array(nrDeeperLayers).fill(0).map((x, i) => currentNodeDepth + i + 1)
    : [];

  const renderBreadcrumbItem = (breadcrumb: Breadcrumb, index: number) => {
    // Layer is same index as parent, because the top layer is not included in
    // the breadcrumbs(as this has its own endpoint and is cached in memory).
    const { label: parentLayerName } = layers[index];
    const parentItemName = breadcrumbs[index - 1]?.name ?? currentDomain?.label ?? '???';

    return (
      <BreadcrumbItem
        key={breadcrumb.id}
        active={index === currentNodeDepth - 1}
        parentLayerName={parentLayerName}
        parentItemName={parentItemName}
        options={breadcrumb.options}
        layerLabel={breadcrumb.layerLabel}
        id={breadcrumb.id}
        name={breadcrumb.name}
      />
    );
  };

  const renderDeeperLayer = (layer: GraphLayer, index: number) => {
    let parentItemName = '';
    if (index === 0) {
      parentItemName = breadcrumbs[breadcrumbs.length - 1]?.name ?? currentDomain?.label ?? '???';
    }
    const options = graph.nodes
      .filter((n) => n.data.properties.layer.toLowerCase().includes(layer.label.toLowerCase()))
      .filter((n) => {
        const parentsIds = getParents(n.data).map((n2) => n2.id);
        if (currentNodeId === undefined) return false;
        return parentsIds.includes(currentNodeId);
      })
      .map((n) => n.data);
    return (
      <BreadcrumbItem
        key={layer.label}
        parentLayerName={layer.parentLabel ?? '???'}
        parentItemName={parentItemName}
        options={options}
        layerLabel={layer.label}
      />
    );
  };

  const separator = (<FontAwesomeIcon icon={faAngleRight} className="mx-1" />);

  return (
    <>
      <WelcomeModal />
      {separator}
      <BreadcrumbDomain />
      {breadcrumbs.map((b, i) => ((
        <>
          {separator}
          {renderBreadcrumbItem(b, i)}
        </>
      )))}
      {deeperLayerIndices.map((index, i) => ((
        <>
          {separator}
          {renderDeeperLayer(layers[index], i)}
        </>
      )))}
    </>
  );
}
