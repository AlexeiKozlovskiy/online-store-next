import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { ISelect } from '@/types/types';
import { customStyles, customTheme } from './selectCustomStyles';

interface IMySelect {
  selectedItem: ISelect | null;
  handleChange: (selectedOption: ISelect | null) => void;
  options: ISelect[];
}

export default function CustomSelect({ selectedItem, handleChange, options }: IMySelect) {
  const id = uuidv4();

  return (
    <Select
      classNamePrefix="react-select"
      className="filters-select"
      value={selectedItem}
      onChange={(e) => handleChange(e)}
      options={options}
      styles={customStyles}
      theme={customTheme}
      id={id}
    />
  );
}
