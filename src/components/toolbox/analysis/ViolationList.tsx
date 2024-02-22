import React, { ComponentType, useEffect } from 'react';
import {
  Form, ListGroup, ListGroupItem, ModalProps,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import ViolationsGroup from './group';

export interface ViolationModalProps<T> extends ModalProps {
  selectedGroup?: ViolationsGroup<T>;
  onClose: () => void;
}

interface Props<T> {
  groups: ViolationsGroup<T>[];
  header: string;
  Modal: ComponentType<ViolationModalProps<T>>;

  showInVisualization: boolean;
  setShowInVisualization: (visible: boolean) => void;

  groupGreyed?: (g: ViolationsGroup<T>) => boolean;
  groupDisabled?: (g: ViolationsGroup<T>) => boolean;
}

export default function ViolationsList<T>({
  groups, header, Modal,
  showInVisualization, setShowInVisualization,
  groupGreyed, groupDisabled,
}: Props<T>) {
  const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>();
  const selectedGroup = selectedIndex !== undefined ? groups[selectedIndex] : undefined;

  useEffect(() => {
    setSelectedIndex(undefined);
  }, [groups]);

  return (
    <div>
      <h4>{header}</h4>
      <Form>
        <Form.Check
          type="switch"
          label={`Show ${header.toLowerCase()} in visualization`}
          checked={showInVisualization}
          onChange={() => setShowInVisualization(!showInVisualization)}
        />
      </Form>
      <ListGroup className="overflow-y-auto" style={{ maxHeight: '15rem' }}>
        {groups.map((g, index) => {
          const greyed = groupGreyed ? groupGreyed(g) : false;
          const disabled = groupDisabled ? groupDisabled(g) : false;
          return (
            <ListGroupItem
              action
              disabled={disabled}
              key={g.label}
              className="d-flex justify-content-between align-items-center flex-nowrap"
              title={g.label}
              active={index === selectedIndex}
              onClick={() => setSelectedIndex(index)}
            >
              <div
                className="text-truncate"
                style={{ color: greyed ? 'darkgray' : undefined }}
              >
                {g.label}
              </div>
              <FontAwesomeIcon className="ms-2" icon={faArrowUpRightFromSquare} />
            </ListGroupItem>
          );
        })}
      </ListGroup>
      <Modal
        selectedGroup={selectedGroup}
        onClose={() => setSelectedIndex(undefined)}
      />
    </div>
  );
}

ViolationsList.defaultProps = ({
  groupGreyed: undefined,
  groupDisabled: undefined,
});
