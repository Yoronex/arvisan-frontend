/* eslint-disable */
import { Form, FormCheckProps } from 'react-bootstrap';

interface Props extends Omit<FormCheckProps, 'type'> {
  indeterminate: boolean;
}

export default function IntermediateCheckbox({ indeterminate, ...props }: Props) {
  const setCheckboxRef = (checkbox: HTMLInputElement | null) => {
    if (checkbox) {
      checkbox.indeterminate = indeterminate;
    }
  };

  return (
    <Form.Check
      onChange={() => {}}
      {...props}
      type="checkbox"
      ref={setCheckboxRef}
    />
  );
}
