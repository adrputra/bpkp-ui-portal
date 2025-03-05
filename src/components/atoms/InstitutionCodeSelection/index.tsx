import { useEffect, useState } from 'react';
import { Loader, Select, SelectProps } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useInstitutionStore } from '@/store/institution';

interface Props extends SelectProps {
  placeholder?: string;
  nothingFoundMessage?: string;
  searchable?: boolean;
  form?: any;
}
export default function InstitutionCodeSelection({
  placeholder = 'Select Institution ID',
  nothingFoundMessage = 'Nothing found...',
  searchable = true,
  form,
  ...props
}: Props) {
  const { institutionList, getInstitutionList } = useInstitutionStore();
  const [opened, { toggle }] = useDisclosure(false);
  const [selectedInstitution, setSelectedInstitution] = useState<string | null | undefined>(
    props.defaultValue
  );

  const data = institutionList.map((value) => ({
    value: value.id,
    label: value.name,
  }));

  useEffect(() => {
    if (institutionList.length === 0) {
      getInstitutionList();
    }
    if (props.defaultValue && institutionList.length > 0) {
      setSelectedInstitution(props.defaultValue);
    }
  }, [institutionList]);

  return (
    <Select
      {...props}
      placeholder={placeholder}
      data={data}
      searchable={searchable}
      nothingFoundMessage={nothingFoundMessage}
      onClick={toggle}
      value={selectedInstitution}
      onChange={(value) => {
        setSelectedInstitution(value);
        form.setFieldValue(props.name, value);
      }}
      rightSection={institutionList.length === 0 && opened && <Loader />}
    />
  );
}
