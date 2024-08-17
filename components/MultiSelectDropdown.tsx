import Select, { MultiValue, ActionMeta } from 'react-select';

export interface Option {
  value: string;
  label: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  onChange: (selected: MultiValue<Option>, actionMeta: ActionMeta<Option>) => void;
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options, onChange }) => {

  const control = (base: any) => ({
          ...base,
          borderColor: '#d1d5db',
          boxShadow: 'none',
          '&:hover': {
            borderColor: '#9ca3af',
          },
  })
   const multiValue = (base: any) => ({
          ...base,
          backgroundColor: '#e5e7eb',
          color: '#374151',
   })
     const multiValueLabel = (base: any) => ({
          ...base,
          backgroundColor: '#e5e7eb',
          color: '#374151',
        })
  return (
    <Select
      isMulti
      options={options}
      onChange={onChange}
      className="w-full max-w-lg mb-6"
      classNamePrefix="select"
      styles={{
        control,
        multiValue,
        multiValueLabel
      }}
    />
  );
};
