import { useState } from 'react';
import { Button, Paper, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import UserInputSelection from '@/components/atoms/UserInputSelection';
import ScanTagModal from '@/components/molecules/NFC/ScanTagModal';
import { useNFCStore } from '@/store/nfc';
import { useUserStore } from '@/store/user';

export default function WriteTagUser() {
  const [loading, setLoading] = useDisclosure(false);
  const [selected, setSelected] = useState<string>('');
  const { nfcDeviceLastConnection, writeNFCUser } = useNFCStore();
  const { userList } = useUserStore();

  const isButtonDisabled = Date.now() - new Date(nfcDeviceLastConnection).getTime() > 3600 * 1000;
  const handleWrite = async () => {
    const request = userList.find((value) => value.username === selected);
    if (!request) return;
    setLoading.open();
    await writeNFCUser(request).finally(() => {
      setLoading.close();
    });
  };

  return (
    <Paper p="md" shadow="xl">
      <Text size="xl" fw="bold">
        Write NFC Tag User
      </Text>
      <Stack mt="md" gap="md" h="80%" justify="space-between">
        <UserInputSelection
          value={selected}
          onChange={(_, option) => setSelected(option.value)}
          withAsterisk
          required
          label="Username"
          nothingFoundMessage="User not found"
        />
        <Button disabled={isButtonDisabled} onClick={handleWrite}>
          Write
        </Button>
      </Stack>
      {loading && <ScanTagModal open={loading} close={setLoading.close} />}
    </Paper>
  );
}
