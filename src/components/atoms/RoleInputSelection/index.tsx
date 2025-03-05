import { useEffect, useState } from 'react';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';
import { Loader, Select, SelectProps } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRoleStore } from '@/store/role';

interface Props extends SelectProps {
  placeholder?: string;
  nothingFoundMessage?: string;
  searchable?: boolean;
  form?: any;
}

export default function RoleInputSelection({
  placeholder = 'Pick value',
  nothingFoundMessage = 'Nothing found...',
  searchable = true,
  form,
  ...props
}: Props) {
  const { roleList, getRoleList } = useRoleStore();
  const [opened, { toggle }] = useDisclosure(false);
  const [selectedRole, setSelectedRole] = useState<string | null | undefined>(props.defaultValue);

  const data = roleList.map((item) => ({
    value: item.id,
    label: item.role_name,
  }));

  useEffect(() => {
    if (roleList.length === 0) {
      getRoleList();
    }
    if (props.defaultValue && roleList.length > 0) {
      setSelectedRole(props.defaultValue);
    }
  }, [roleList]);

  return (
    <Select
      {...props}
      placeholder={placeholder}
      data={data}
      searchable={searchable}
      nothingFoundMessage={nothingFoundMessage}
      onClick={toggle}
      value={selectedRole}
      onChange={(value, option) => {
        if (props.onChange) {
          props.onChange(value, option);
        } else {
          setSelectedRole(value);
          form.setFieldValue(props.name, value);
        }
      }}
      rightSection={data.length === 0 && opened && <Loader />}
    />
  );
}
