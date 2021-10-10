import { useState, useCallback } from 'react';
import './App.css';
import { Select, Modal } from './components';
import { fakeApi } from '@lib';
const LIST_LIMIT = 10;

type ValueType = {
  id: number;
  name: string;
}

const TypedSelect = Select<ValueType>();

function App() {
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<ValueType[] | null>(null);
  const [options, setOptions] = useState<ValueType[] | []>([]);
  const [filteredOptions, setFilteredOptions] = useState<ValueType[] | [] | null>(null)

  const getData = useCallback(() => {
    let newPage = options.length/LIST_LIMIT + 1;

    if (newPage) {
      if ((newPage > 1 && filteredOptions ? filteredOptions.length >= 10 : options.length >= 10) || newPage === 1) {
        fakeApi<ValueType>({ page: newPage }).then((array: { list: ValueType[] }) => {
          setOptions(options => ([...options, ...array.list]));
        });
      }
    }
  }, [filteredOptions, options.length]);

  const handleSearch = (searchValue: string) => {
    setFilteredOptions(options.filter((option) => option.name.includes(searchValue)))
  }

  const handleClose = useCallback(() => {
    setOptions([]);
  }, [setOptions])

  const handleDelete = (deletedItem: ValueType) => {
    if (value) {
      value.length > 1 ? setValue(value.filter((item) => item.id !== deletedItem.id)) : setValue(null);
    }
  }

  return (
    <div className="App">
      <div style={{ width: '30%' }}>
        <span>Select:</span>
        <TypedSelect
          onOpen={getData}
          onClose={handleClose}
          onEndReached={getData}
          options={filteredOptions ? filteredOptions : options}
          endpoint="/list"
          value={value}
          onChange={(newItem) => setValue(value ? [...value, newItem] : [newItem])} 
          onClear={() => { setValue(null); }}
          onDeleteItem={handleDelete}
          onSearch={handleSearch}
        />
        <button onClick={() => setVisible(true)}>Open modal</button>
        <Modal closeModal={() => setVisible(false)} open={visible}>
          <div>Test Message</div>
        </Modal>
      </div>
    </div>
  );
}

export default App;
