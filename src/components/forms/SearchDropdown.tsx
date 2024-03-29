import {
  Dropdown, FloatingLabel, Form, InputGroup, Spinner,
} from 'react-bootstrap';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HighlightSearch from '../toolbox/navigator/HighlightSearch';
import { Option, searchNodes } from '../../helpers/filter';

interface Props {
  options: Option[];
  onSelect: (option: Option) => void;
  label: string;

  remoteSearch?: boolean;
  onSearchKeyChange?: (key: string) => void;
  loading?: boolean;
  nrOptions?: number;
}

export default function SearchDropdown({
  options, onSelect, label,
  remoteSearch, onSearchKeyChange, loading, nrOptions,
}: Props) {
  const [searchKey, setSearchKey] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const textBoxRef = useRef<HTMLInputElement>(null);

  const handleClickOrFocus = useCallback((target: Node | null) => {
    if (!ref.current) return;
    setShowOptions(ref.current.contains(target));
  }, [ref]);

  const filteredOptions = remoteSearch ? options : searchNodes(options, searchKey);

  const selectOption = (option: Option) => {
    setShowOptions(false);
    setSearchKey(option.label);
    onSelect(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      handleClickOrFocus(event.target as Node | null);
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, showOptions, handleClickOrFocus, options]);

  return (
    <div ref={ref} className="position-relative">
      <InputGroup>
        <InputGroup.Text>
          {loading ? <Spinner size="sm" />
            : <FontAwesomeIcon icon={faMagnifyingGlass} />}
        </InputGroup.Text>
        <FloatingLabel label={label}>
          <Form.Control
            value={searchKey}
            onChange={(event) => {
              const search = event.target.value;
              setSearchKey(search);
              if (onSearchKeyChange) onSearchKeyChange(search);
            }}
            ref={textBoxRef}
            placeholder={label}
          />
          <button
            type="button"
            aria-label={`Clear ${label.toLowerCase()}`}
            className="border-0 position-absolute top-50 translate-middle-y end-0 me-2 d-flex justify-content-center align-items-center bg-transparent text-secondary"
            style={{
              width: '1.25rem', height: '1.25rem', fontSize: '1.25rem',
            }}
            onClick={() => {
              setSearchKey('');
              textBoxRef.current?.focus();
            }}
            title="Clear"
            disabled={searchKey.length === 0}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        </FloatingLabel>
      </InputGroup>
      <div>
        <Dropdown.Menu show={showOptions}>
          <div className="overflow-x-hidden overflow-y-scroll" style={{ height: '20rem', width: ref.current?.clientWidth }}>
            <Dropdown.Header>Found nodes:</Dropdown.Header>
            {filteredOptions.map((o) => (
              <Dropdown.Item key={o.id} onClick={() => selectOption(o)} disabled={loading}>
                <HighlightSearch label={o.label} searchKey={searchKey} />
              </Dropdown.Item>
            ))}
            {nrOptions !== undefined && nrOptions > options.length && (
              <Dropdown.Header>
                ...and
                {' '}
                {nrOptions - options.length}
                {' '}
                more matches.
              </Dropdown.Header>
            )}
          </div>
        </Dropdown.Menu>
      </div>
    </div>
  );
}

SearchDropdown.defaultProps = ({
  remoteSearch: false,
  onSearchKeyChange: undefined,
  loading: false,
  nrOptions: undefined,
});
