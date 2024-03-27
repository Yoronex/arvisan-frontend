import { useContext, useEffect, useState } from 'react';
import { VisualizationHistory } from '../../../context';
import { Option } from '../../../helpers/filter';
import SearchDropdown from '../../forms/SearchDropdown';
import { GraphService, Node } from '../../../api';

interface Props {
  loading?: boolean;
  onSelect?: () => void;
}

export default function NodeFinderDatabase({ loading: parentLoading, onSelect }: Props) {
  const { visitNode } = useContext(VisualizationHistory);
  const [loading, setLoading] = useState(false);
  const [refreshTimeout, setRefreshTimeout] = useState<NodeJS.Timeout | undefined>();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [totalNrFoundNodes, setTotalNrFoundNodes] = useState<number>();

  const refreshNodes = (key: string) => {
    setLoading(true);
    setRefreshTimeout(undefined);
    GraphService.getNodes({ name: key })
      .then(({ count, records }) => {
        setNodes(records);
        setTotalNrFoundNodes(count);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    refreshNodes('');

    return () => {
      if (refreshTimeout) clearTimeout(refreshTimeout);
    };
  }, []);

  const onSearchKey = (key: string) => {
    if (refreshTimeout) {
      clearTimeout(refreshTimeout);
    }
    setRefreshTimeout(setTimeout(() => refreshNodes(key), 300));
  };

  const options = nodes.map((n): Option => ({ id: n.data.id, label: n.data.properties.fullName }));

  const selectOption = (option: Option) => {
    const node = nodes.find((n) => n.data.id === option.id);
    if (!node) return;
    visitNode({ type: 'backend', timestamp: new Date(), data: node.data });
    if (onSelect) onSelect();
  };

  return (
    <SearchDropdown
      options={options}
      onSelect={selectOption}
      label="Search node to select"
      onSearchKeyChange={onSearchKey}
      loading={loading || parentLoading}
      nrOptions={totalNrFoundNodes}
    />
  );
}

NodeFinderDatabase.defaultProps = ({
  loading: false,
  onSelect: undefined,
});
