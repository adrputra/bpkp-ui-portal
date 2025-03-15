import { MultiSelect } from '@mantine/core';

interface Props {
  value: string[];
  setValue: (value: string[]) => void;
  multiple?: boolean;
}
export default function NFCBlockNumber({ value, setValue, multiple = false }: Props) {
  const availableBlock = [
    '4',
    '5',
    '6',
    '8',
    '9',
    '10',
    '12',
    '13',
    '14',
    '16',
    '17',
    '18',
    '20',
    '21',
    '22',
    '24',
    '25',
    '26',
    '28',
    '29',
    '30',
    '32',
    '33',
    '34',
    '36',
    '37',
    '38',
    '40',
    '41',
    '42',
    '44',
    '45',
    '46',
    '48',
    '49',
    '50',
    '52',
    '53',
    '54',
    '56',
    '57',
    '58',
    '60',
    '61',
    '62',
  ];

  const handleSelectChange = (values: string[]) => {
    if (values.includes('select-all')) {
      // If "Select All" is selected, check if all items are already selected
      if (value.length === availableBlock.length) {
        // Deselect all if all are currently selected
        setValue([]);
      } else {
        // Select all items
        setValue(availableBlock);
      }
    } else {
      // Regular selection logic
      setValue(values);
    }
  };

  
  return (
    <MultiSelect
      label={multiple ? 'Block Numbers' : 'Block Number (Select one)'}
      data={multiple ? [{ value: 'select-all', label: 'Select All' }, ...availableBlock] : availableBlock}
      value={value}
      onChange={handleSelectChange}
      hidePickedOptions={multiple}
      clearable
      searchable
      withAsterisk
      maxValues={multiple ? 64 : 1}
    />
  );
}
