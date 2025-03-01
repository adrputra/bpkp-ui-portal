import { Button, Modal, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useInstitutionStore } from '@/store/institution';

interface Props {
  open: boolean;
  close: () => void;
}

export default function AddForm({ open, close }: Props) {
  const [loading, setLoading] = useDisclosure(false);
  const { addInstitution } = useInstitutionStore();
  const form = useForm<RequestNewInstitution>({
    name: 'CreateNewInstitution',
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      address: '',
      phone_number: '',
      email: '',
    },
    validate: {
      phone_number: (value) =>
        /^\d{5,13}$/.test(value) ? null : 'Please enter a valid phone number',
      email: (value) =>
        /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : 'Please enter a valid email address',
    },
  });

  const handleSubmit = async (request: RequestNewInstitution) => {
    setLoading.open();

    await addInstitution(request).finally(() => {
      setLoading.close();
      form.reset();
      close();
    });
  };

  return (
    <Modal
      opened={open}
      onClose={close}
      title="Add New Institution"
      centered
      closeOnClickOutside={false}
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack my="md">
          <TextInput
            withAsterisk
            required
            label="Name"
            name="name"
            {...form.getInputProps('name')}
          />
          <Textarea
            withAsterisk
            required
            label="Address"
            name="address"
            {...form.getInputProps('address')}
          />
          <TextInput
            withAsterisk
            required
            label="Phone Number"
            name="phone_number"
            {...form.getInputProps('phone_number')}
          />
          <TextInput
            withAsterisk
            required
            label="Email"
            name="email"
            {...form.getInputProps('email')}
          />
        </Stack>

        <Button fullWidth type="submit" mt="xl" loading={loading} loaderProps={{ type: 'dots' }}>
          Create
        </Button>
      </form>
    </Modal>
  );
}
