import { useEffect, useState } from 'react';
import { IconCirclePlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Button, Center, Group, Stack, TableData } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import DeleteDialogue from '@/components/molecules/DeleteDialogue';
import TableBody from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import { useInstitutionStore } from '@/store/institution';
import AddForm from '@/components/organisms/Institution/AddForm';

export default function InstitutionList() {
  const [filter, setFilter] = useState<string>('');
  const [addFormOpened, { open: openAddForm, close: closeAddForm }] = useDisclosure(false);
  const [deleteFormOpened, { open: openDeleteForm, close: closeDeleteForm }] = useDisclosure(false);

  const { institutionList, getInstitutionList, resetInstitutionStore } = useInstitutionStore();

  useEffect(() => {
    getInstitutionList();
      return () => {
        resetInstitutionStore();
      };
    }, []);

  const tableData: TableData = {
    head: ['ID', 'Name', 'Address', 'Phone Number', 'Email', 'Action'],
    body: institutionList
      .filter((value) => value.name.toLowerCase().includes(filter))
      .map((value) => [
        value.id,
        value.name,
        value.address,
        value.phone_number,
        value.email,
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
      <Button leftSection={<IconCirclePlus />} onClick={openAddForm}>
        Add
      </Button>
    );
  };

  const handleDelete = (id: string) => {
    openDeleteForm();
  };

  const onCloseDeleteForm = () => {
    closeDeleteForm();
  };

  const onConfirm = async () => {
    onCloseDeleteForm();
  };

  return (
    <Center>
      <Stack p="sm" w="100%">
        <TableHeader title="Institution List" setFilter={setFilter} ActionButton={<ActionButton />} />
        <TableBody tableData={tableData} />
      </Stack>
      <AddForm open={addFormOpened} close={closeAddForm} />
      <DeleteDialogue
        open={deleteFormOpened}
        close={onCloseDeleteForm}
        title="Delete Institution"
        message="Are you sure you want to delete this institution?"
        onConfirm={onConfirm}
      />
    </Center>
  );
}
