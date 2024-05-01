import { Button, ButtonProps, Spinner } from 'react-bootstrap';

interface Props extends ButtonProps {
  loading?: boolean;
}

export default function LoadingButton({ loading, children, ...props }: Props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Button disabled={loading} {...props}>
      {loading ? (
        <>
          <Spinner animation="border" size="sm" className="me-1" />
          Loading...
        </>
      ) : children}
    </Button>
  );
}

LoadingButton.defaultProps = ({
  loading: false,
});
