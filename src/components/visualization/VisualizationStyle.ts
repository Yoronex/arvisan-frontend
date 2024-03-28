import cytoscape from 'cytoscape';

const stylesheet: cytoscape.Stylesheet[] = [{
  selector: 'node',
  css: {
    height: 'label',
    width: 'label',
    'padding-top': '16',
    'border-color': 'black',
    'background-color': 'data(properties.color)',
    'border-width': 1,
    shape: 'round-rectangle',
    label: 'data(label)',
    'text-valign': 'center',
    'text-wrap': 'ellipsis',
  },
}, {
  selector: 'node:parent',
  css: {
    'text-valign': 'top',
    'font-size': '24',
  },
}, {
  selector: 'edge',
  css: {
    'target-arrow-shape': 'triangle',
    'target-arrow-color': 'black',
    'source-arrow-color': 'gray',
    'line-fill': 'linear-gradient',
    'line-gradient-stop-colors': ['gray', 'black'],
    'line-gradient-stop-positions': [0, 100],
    'curve-style': 'bezier',
    width: 1.5,
    'control-point-step-size': 200,
    'loop-sweep': '90deg',
  },
}, {
  selector: 'edge.violation, edge[properties.violation = "true"]',
  css: {
    'line-gradient-stop-colors': ['#FF8888', '#FF0000'],
    'target-arrow-color': '#FF0000',
    'source-arrow-color': '#FF8888',
  },
}, {
  selector: 'node[properties.selected = "true"]',
  css: {
    'border-color': '#ff0000',
    'border-width': 4,
  },
}, {
  selector: 'edge.hidden',
  css: {
    visibility: 'hidden',
  },
}];

export default stylesheet;
