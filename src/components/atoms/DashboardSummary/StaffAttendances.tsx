import { IconGraph } from '@tabler/icons-react';
import { Group, Paper, Text } from '@mantine/core';

export default function StaffAttendances() {
  return (
    <Paper p="md" shadow="md" w="100%">
      <Group justify="space-between">
        <Text size="xs" c="dimmed" fw={900}>
          Attendances
        </Text>
        <IconGraph size={22} stroke={1.5} />
      </Group>
      <Group align="flex-end" gap="xs" mt={25}>
        <Text size="xl" fw={700} style={{ lineHeight: 1 }}>
          4/22
        </Text>
        <Text
          c="teal"
          fz="sm"
          fw={500}
          style={{ display: 'flex', alignItems: 'center', lineHeight: 1 }}
        >
          <span>3%</span>
          {/* <DiffIcon size={16} stroke={1.5} /> */}
        </Text>
      </Group>
    </Paper>
  );
}
