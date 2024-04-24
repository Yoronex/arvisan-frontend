import {
  useContext, useEffect, useMemo, useState,
} from 'react';
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
      .catch((e) => console.error(e))
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

  const options = useMemo(() => {
    const ops = nodes.map((n): Option => ({ id: n.data.id, label: n.data.properties.fullName }));

    // Option might have the same label (for example, an application with the same
    // name as its domain). We should first find the duplicates to fix this.
    const seenLabels = new Set<string>();
    const duplicateLabels = new Set<string>();
    ops.forEach((option) => {
      if (seenLabels.has(option.label)) {
        duplicateLabels.add(option.label);
      } else {
        seenLabels.add(option.label);
      }
    });

    return ops.map((option) => {
      // If this label is not a duplicate, simply return the original option
      if (!duplicateLabels.has(option.label)) return option;
      // Otherwise, find the corresponding node
      const node = nodes.find((n) => n.data.id === option.id)!;
      return {
        id: node.data.id,
        // Add the layer in brackets to the option name
        label: `${node.data.properties.fullName} (${node.data.properties.layer})`,
      };
    });
  }, [nodes]);

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
