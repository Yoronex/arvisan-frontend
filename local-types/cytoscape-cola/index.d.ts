import cytoscape, { BoundingBox12, BoundingBoxWH } from 'cytoscape';

declare const cytoscapeCola: cytoscape.Ext;
export = cytoscapeCola;
export as namespace cytoscapeCola;

/**
 * From https://github.com/cytoscape/cytoscape.js-cola?tab=readme-ov-file#api
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare
declare namespace cytoscapeCola {
  interface ColaLayoutOptions extends cytoscape.BaseLayoutOptions {
    name: 'cola';
    animate?: boolean;
    refresh?: number;
    maxSimulationTime?: number;
    ungrabifyWhileSimulating?: boolean;
    fit?: boolean;
    padding?: number;
    boundingBox?: BoundingBox12 | BoundingBoxWH | undefined;
    nodeDimensionsIncludeLabels?: boolean;

    randomize?: boolean;
    avoidOverlap?: boolean;
    handleDisconnected?: boolean;
    convergenceThreshold?: number;
    nodeSpacing?: (node: cytoscape.NodeSingular) => number;
    // flow: any;
    // alignment: any;
    // gapInequalities: any;
    centerGraph?: boolean;

    edgeLength?: (edge: cytoscape.EdgeSingular) => number;
    edgeSymDiffLength?: (edge: cytoscape.EdgeSingular) => number;
    edgeJaccardLength?: (edge: cytoscape.EdgeSingular) => number;
  }
}
