import { useInstitutionStore } from '@/store/institution';
import { Loader, Select, SelectProps } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface Props extends SelectProps {
  placeholder?: string;
  nothingFoundMessage?: string;
  searchable?: boolean;
}
export default function InstitutionCodeSelection({
  placeholder = 'Select Institution ID',
  nothingFoundMessage = 'Nothing found...',
  searchable = true,
  ...props
}: Props) {
    const { institutionList, getInstitutionList } = useInstitutionStore();
    const [opened, { toggle }] = useDisclosure(false);
      
    const data = institutionList.map((value) => ({
        value: value.id,
        label: value.name,
    }))
  return (
    <Select
      {...props}
      placeholder={placeholder}
      data={data}
      searchable={searchable}
      nothingFoundMessage={nothingFoundMessage}
      onDropdownOpen={getInstitutionList}
      onClick={toggle}
      rightSection={institutionList.length === 0 && opened && <Loader />}
    />
  );
}
