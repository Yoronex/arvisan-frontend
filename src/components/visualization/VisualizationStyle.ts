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
    'text-wrap': 'wrap',
  },
}, {
  selector: 'edge',
  css: {
    'target-arrow-shape': 'triangle',
    'target-arrow-color': 'black',
    'source-arrow-color': 'black',
    'line-fill': 'linear-gradient',
    'line-gradient-stop-colors': ['red', 'black'],
    'line-gradient-stop-positions': [0, 100],
    'curve-style': 'bezier',
    width: 1.5,
    'control-point-step-size': 200,
    'loop-sweep': '90deg',
  },
}, {
  selector: 'node[properties.selected = "true"]',
  css: {
    'border-color': '#ff0000',
    'border-width': 4,
  },
}];

export default stylesheet;
