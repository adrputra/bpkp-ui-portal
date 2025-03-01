import { useEffect, useState } from 'react';
import { IconCirclePlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Button, Center, Group, Stack, TableData, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import TableBody from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import AddForm from '@/components/organisms/User/AddForm';
import { formatDate } from '@/libs/utils';
import { useUserStore } from '@/store/user';

export default function UserList() {
  const { userList, getUserList, resetUserStore } = useUserStore();
  const [filter, setFilter] = useState<string>('');
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    getUserList();
    return () => {
      resetUserStore();
    };
  }, []);

  const tableData: TableData = {
    head: ['NIP', 'Email', 'Full Name', 'Institution', 'Role', 'Date Created', 'Action'],
    body: userList
      .filter(
        (user) =>
          user.username.toLowerCase().includes(filter.toLowerCase()) ||
          user.email.toLowerCase().includes(filter.toLowerCase()) ||
          user.fullname.toLowerCase().includes(filter.toLowerCase())
      )
      .map((value) => [
        value.username,
        value.email,
        value.fullname,
        <Text fz="sm" style={{ maxWidth: '25vw' }}>
          {value.institution_name}
        </Text>,
        value.role_name,
        formatDate(value.created_at),
        <Group>
          <ActionIcon variant="default" style={{ border: 'none' }}>
            <IconEdit size={20} color="blue" />
          </ActionIcon>
          <ActionIcon variant="default" style={{ border: 'none' }}>
            <IconTrash size={20} color="red" />
          </ActionIcon>
        </Group>,
      ]),
  };

  const ActionButton = () => {
    return (
      <Button leftSection={<IconCirclePlus />} onClick={open}>
        Add
      </Button>
    );
  };

  const onClose = async () => {
    await getUserList();
    close();
  };

  return (
    <Center>
      <Stack p="sm" w="100%">
        <TableHeader title="User List" setFilter={setFilter} ActionButton={<ActionButton />} />
        <TableBody tableData={tableData} />
      </Stack>

      <AddForm open={opened} close={onClose} />
    </Center>
  );
}
