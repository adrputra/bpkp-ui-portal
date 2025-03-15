import { IconUserFilled, IconUsers } from '@tabler/icons-react';
import { Group, Paper, Text } from '@mantine/core';
import { useAuthStore } from '@/store/auth';

export default function TotalStaff() {
  const { institutionName } = useAuthStore();
  return (
    <Paper p="md" shadow="md" w="100%">
      <Group justify="space-between">
        <Text size="xs" c="dimmed" fw={900} w='80%'>
          Total Staff - {institutionName}
        </Text>
        <IconUsers size={22} stroke={1.5} />
      </Group>
      <Group align="center" gap="xs" mt={25}>
        <Text size="xl" fw={700} style={{ lineHeight: 1 }}>
          5 
        </Text>
        <Text
          c="teal"
          fz="sm"
          fw={500}
          style={{ display: 'flex', alignItems: 'center', lineHeight: 1 }}
        >
          {<IconUserFilled />}
          {/* <DiffIcon size={16} stroke={1.5} /> */}
        </Text>
      </Group>
    </Paper>
  );
}
