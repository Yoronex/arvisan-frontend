import React, { ComponentType, useEffect } from 'react';
import {
  Form, ListGroup, ListGroupItem, ModalProps,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import ViolationsGroup from './group';
import IntermediateCheckbox from '../../IntermediateCheckbox';
import { VisibilityOptions } from '../../../helpers/enums';

export interface ViolationModalProps<T> extends ModalProps {
  selectedGroup?: ViolationsGroup<T>;
  onClose: () => void;
}

interface Props<T> {
  groups: ViolationsGroup<T>[];
  header: string;
  Modal: ComponentType<ViolationModalProps<T>>;

  showInVisualization: VisibilityOptions;
  setShowInVisualization: (visible: VisibilityOptions) => void;

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

  const onCheckClick = () => {
    let newValue: VisibilityOptions;
    if (showInVisualization === VisibilityOptions.HIGHLIGHTED) {
      newValue = VisibilityOptions.VISIBLE;
    } else if (showInVisualization === VisibilityOptions.VISIBLE) {
      newValue = VisibilityOptions.INVISIBLE;
    } else {
      newValue = VisibilityOptions.HIGHLIGHTED;
    }
    setShowInVisualization(newValue);
  };

  return (
    <div>
      <h4>{header}</h4>
      <Form>
        <IntermediateCheckbox
          label={`Show ${header.toLowerCase()} in visualization`}
          checked={showInVisualization === VisibilityOptions.HIGHLIGHTED}
          indeterminate={showInVisualization === VisibilityOptions.VISIBLE}
          onChange={onCheckClick}
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
