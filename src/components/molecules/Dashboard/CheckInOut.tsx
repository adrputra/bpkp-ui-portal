import { useEffect, useState } from 'react';
import { Button, Divider, Group, Stack, Text, Textarea, Title } from '@mantine/core';
import { useAttendanceStore } from '@/store/attendance';
import { useThemeStore } from '@/store/theme';

export default function CheckInOut() {
  const { isDarkMode, colors } = useThemeStore();
  const { doCheckIn, userAttendance, getTodayAttendance } = useAttendanceStore();
  const [data, setData] = useState<RequestAttendance>({
    remarks: '',
  });

  useEffect(() => {
    getTodayAttendance();
  }, []);

  return (
    <Stack h="100%" align="center" justify="space-between">
      <Group h="100%" w="100%">
        <Stack h="100%" w="100%" justify="space-between">
          <Group justify="center">
            <Stack align="flex-end">
              <Title order={3} fw="bold">
                Check In
              </Title>
              <Text size="md" fw="bold">
                {userAttendance.check_in}
              </Text>
            </Stack>
            <Divider orientation="vertical" size="md" color={isDarkMode ? 'white' : colors[1]} />
            <Stack align="flex-start">
              <Title order={3} fw="bold">
                Check Out
              </Title>
              <Text size="md" fw="bold">
                {userAttendance.check_out}
              </Text>
            </Stack>
          </Group>
          <Stack>
            <Textarea
              label="Remarks"
              name="remarks"
              onChange={() => setData({ remarks: data.remarks })}
            />
            <Group justify='center' grow>
              <Button color="green" onClick={() => doCheckIn(data)} radius="xl" size="md">
                Check In
              </Button>
              <Button color="red" onClick={() => doCheckIn(data)} radius="xl" size="md">
                Check Out
              </Button>
            </Group>
          </Stack>
        </Stack>
      </Group>
    </Stack>
  );
}
