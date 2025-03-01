import { Button, Group, Modal, Text } from '@mantine/core';
import { IconAlertHexagonFilled } from '@tabler/icons-react';

interface Props {
  open: boolean;
  close: () => void;
  title?: string;
  icon?: React.ReactNode;
  message?: string | React.ReactNode;
  onConfirm: () => void;
}

export default function ConfirmationDialogue({
  open,
  close,
  title = 'Delete',
  icon = <IconAlertHexagonFilled color='warning' />,
  message = 'Are you sure?',
  onConfirm,
}: Props) {
  const Title = () => {
    return (
      <Group align='center'>
        {icon}
        <Text size="xl" fw={900}>{title}</Text>
      </Group>
    );
  };

  return (
    <Modal
      opened={open}
      onClose={close}
      title={<Title />}
      centered
      closeOnClickOutside={false}
      keepMounted={false}
    >
      <Text>{message}</Text>
      <Group justify="flex-end" mt="md">
        <Button variant="outline" onClick={close}>
          Cancel
        </Button>
        <Button color="red" onClick={onConfirm}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
}
