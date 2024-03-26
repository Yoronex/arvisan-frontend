import cytoscape from 'cytoscape';

interface Props {
  node: cytoscape.NodeSingular;
}

// @ts-expect-error node not used currently, but might be in the future
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HoverDetailsNodeParent({ node }: Props) {
  return null;
}
