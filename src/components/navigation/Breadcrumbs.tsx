import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import WelcomeModal from '../WelcomeModal';
import {
  BreadcrumbsContext, LayerContext, VisualizationHistory,
} from '../../context';
import BreadcrumbItem from './BreadcrumbItem';
import { Breadcrumb } from '../../api';
import BreadcrumbDomain from './BreadcrumbDomain';

export default function Breadcrumbs() {
  const { layers } = useContext(LayerContext);
  const { currentDomain, breadcrumbs } = useContext(BreadcrumbsContext);
  const { currentNodeDepth } = useContext(VisualizationHistory);

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
    </>
  );
}
