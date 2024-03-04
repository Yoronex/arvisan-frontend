import cytoscape from 'cytoscape';
import { GraphColoringMode } from './enums';

// From https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)#--version-2-hex--
// eslint-disable-next-line import/prefer-default-export
export function shadeHexColor(color: string, percent: number) {
  const f = parseInt(color.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;
  // eslint-disable-next-line no-bitwise
  const R = f >> 16;
  // eslint-disable-next-line no-bitwise,no-mixed-operators
  const G = f >> 8 & 0x00FF;
  // eslint-disable-next-line no-bitwise
  const B = f & 0x0000FF;
  return `#${(0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1)}`;
}

export interface IColoringModeSettings {
  name: string;
  rangeFunction?: (nodes: cytoscape.NodeCollection) => [number, number];
  colorFunction: (node: cytoscape.NodeSingular, range: [number, number]) => string;
}

function getNrIncomingDeps(node: cytoscape.NodeSingular): number {
  // const children = node.children().filter((ele) => ele.isNode()) as cytoscape.NodeCollection;
  // if (children.length > 0) {
  //   return children.reduce((total, child) => total + getNrIncomingDeps(child), 0);
  // }
  return node.incomers().filter((ele) => ele.isEdge())
    .reduce((val, edge) => val + Number(edge.data('properties.weight')), 0);
}
function getNrOutgoingDeps(node: cytoscape.NodeSingular): number {
  // const children = node.children().filter((ele) => ele.isNode()) as cytoscape.NodeCollection;
  // if (children.length > 0) {
  //   return children.reduce((total, child) => total + getNrOutgoingDeps(child), 0);
  // }
  return node.outgoers().filter((ele) => ele.isEdge())
    .reduce((val, edge) => val + Number(edge.data('properties.weight')), 0);
}
function getIncomingOutgoingRatio(node: cytoscape.NodeSingular): number {
  const incoming = getNrIncomingDeps(node);
  const outgoing = getNrOutgoingDeps(node);
  return outgoing !== 0 ? incoming / outgoing : 0;
}

/**
 * Parse an Hex color string to its rgb values
 * @param hex
 */
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : {
    r: 0,
    g: 0,
    b: 0,
  };
}

/**
 * Get a hex color that is
 * @param ratio color to pick on the gradient. In range [0, 1]
 * @param firstHexColor First (lowest) hex color in the gradient
 * @param secondHexColor Second hex color in the gradient
 * @param remainingHexColors Optional extra colors in the gradient
 */
export function getRatioColor(
  ratio: number,
  firstHexColor: string,
  secondHexColor: string,
  ...remainingHexColors: string[]
): string {
  const colors = [firstHexColor, secondHexColor, ...remainingHexColors]
    .filter((c) => c !== undefined);
  const absoluteRatio = ratio * (colors.length - 1);

  let colorIndex = Math.floor(absoluteRatio);
  if (colorIndex === colors.length - 1) {
    colorIndex -= 1;
  }

  const firstColor = hexToRgb(colors[colorIndex]);
  const secondColor = hexToRgb(colors[colorIndex + 1]);

  const red = Math.round(firstColor.r * (1 - ratio) + secondColor.r * (ratio));
  const green = Math.round(firstColor.g * (1 - ratio) + secondColor.g * (ratio));
  const blue = Math.round(firstColor.b * (1 - ratio) + secondColor.b * (ratio));

  return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
}

export const ColoringModeColors: Map<GraphColoringMode, string[]> = new Map([
  [GraphColoringMode.STRUCTURE, []],
  [GraphColoringMode.INCOMING_DEPENDENCIES, ['#2081f9', '#f99820']],
  [GraphColoringMode.OUTGOING_DEPENDENCIES, ['#2081f9', '#f99820']],
  [GraphColoringMode.INCOMING_OUTGOING_DEPS_RATIO, ['#2081f9', '#f99820']],
]);

export const ColoringModeOptions: Map<GraphColoringMode, IColoringModeSettings> = new Map([
  [GraphColoringMode.STRUCTURE, {
    name: 'Structure',
    colorFunction: (node: cytoscape.NodeSingular) => {
      const hexColor = node.data('properties.color') as string;
      if (!hexColor) return '';
      const depth = Number(node.data('properties.depth'));
      const alpha = (4 - depth) * 0.15;
      return shadeHexColor(hexColor, alpha);
    },
  }],
  [GraphColoringMode.INCOMING_DEPENDENCIES, {
    name: 'Incoming dependencies',
    rangeFunction: (nodes: cytoscape.NodeCollection) => {
      let min = Number.POSITIVE_INFINITY;
      let max = Number.NEGATIVE_INFINITY;

      nodes.forEach((node) => {
        const value = getNrIncomingDeps(node);
        min = Math.min(min, value);
        max = Math.max(max, value);
      });

      return [min, max];
    },
    colorFunction: (node: cytoscape.NodeSingular, range: [number, number]) => {
      const [min, max] = range;
      const incomingDeps = getNrIncomingDeps(node);
      const [firstColor, secondColor, restColors] = ColoringModeColors
        .get(GraphColoringMode.INCOMING_DEPENDENCIES) || [];

      return getRatioColor((incomingDeps - min) / (max - min), firstColor, secondColor, restColors);
    },
  }],
  [GraphColoringMode.OUTGOING_DEPENDENCIES, {
    name: 'Outgoing dependencies',
    rangeFunction: (nodes: cytoscape.NodeCollection) => {
      let min = Number.POSITIVE_INFINITY;
      let max = Number.NEGATIVE_INFINITY;

      nodes.forEach((node) => {
        const value = getNrOutgoingDeps(node);
        min = Math.min(min, value);
        max = Math.max(max, value);
      });

      return [min, max];
    },
    colorFunction: (node: cytoscape.NodeSingular, range: [number, number]) => {
      const [min, max] = range;
      const incomingDeps = getNrOutgoingDeps(node);
      const [firstColor, secondColor, restColors] = ColoringModeColors
        .get(GraphColoringMode.OUTGOING_DEPENDENCIES) || [];
      return getRatioColor((incomingDeps - min) / (max - min), firstColor, secondColor, restColors);
    },
  }],
  [GraphColoringMode.INCOMING_OUTGOING_DEPS_RATIO, {
    name: 'Dependency ratio',
    hexColors: ['#2081f9', '#f99820'],
    rangeFunction: (nodes: cytoscape.NodeCollection) => {
      let min = Number.POSITIVE_INFINITY;
      let max = Number.NEGATIVE_INFINITY;

      nodes.forEach((node) => {
        const value = getIncomingOutgoingRatio(node);
        min = Math.min(min, value);
        max = Math.max(max, value);
      });

      return [min, max];
    },
    colorFunction: (node: cytoscape.NodeSingular, range: [number, number]) => {
      const [min, max] = range;
      const incomingDeps = getIncomingOutgoingRatio(node);
      const [firstColor, secondColor, restColors] = ColoringModeColors
        .get(GraphColoringMode.INCOMING_OUTGOING_DEPS_RATIO) || [];
      return getRatioColor((incomingDeps - min) / (max - min), firstColor, secondColor, restColors);
    },
  }],
]);
