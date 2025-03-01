import { Box, Code, Group, Stack, Text } from '@mantine/core';
import Quotes from '@/components/atoms/Quotes';
import { useAttendanceStore } from '@/store/attendance';
import { useMemo } from 'react';

export default function UserStatus() {
  const { userAttendance } = useAttendanceStore();

  const { statusText, statusColor } = useMemo(() => {
    if (userAttendance.check_in === '') {return { statusText: 'Not Checked In', statusColor: 'red' };}
    if (userAttendance.check_out === '') {return { statusText: 'Checked In', statusColor: 'green' };}
    return { statusText: 'Great Work Today!', statusColor: 'blue' };
  }, [userAttendance.check_in, userAttendance.check_out]);

  return (
    <Stack pl={30} h="100%" justify="space-between">
      <Quotes />
      <Box>
        <Text fw={900}>Status :</Text>
        <Code color={statusColor} block>
          <Group justify="center">
            <Text fw={900} fz="lg">
              {statusText}
            </Text>
          </Group>
        </Code>
      </Box>
    </Stack>
  );
}
