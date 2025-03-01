import { useEffect, useState } from 'react';
import { Button, Divider, Group, Stack, Text, Textarea, Title } from '@mantine/core';
import { useAttendanceStore } from '@/store/attendance';
import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';
import ConfirmationDialogue from '../ConfirmationDialogue';

type AttendanceAction = '' | 'in' | 'out';

export default function CheckInOut() {
  const { isDarkMode, colors } = useThemeStore();
  const { username } = useAuthStore();
  const { doCheckIn, doCheckOut, userAttendance, getTodayAttendance } = useAttendanceStore();
  const [action, setAction] = useState<AttendanceAction>('');
  const [data, setData] = useState<RequestAttendance>({
    username,
    insitution_id: '',
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
                {userAttendance.check_in || '--'}
              </Text>
            </Stack>
            <Divider orientation="vertical" size="md" color={isDarkMode ? 'white' : colors[1]} />
            <Stack align="flex-start">
              <Title order={3} fw="bold">
                Check Out
              </Title>
              <Text size="md" fw="bold">
                {userAttendance.check_out || '--'}
              </Text>
            </Stack>
          </Group>
          <Stack>
            <Textarea
              label="Remarks"
              name="remarks"
              onChange={(e) => setData({ ...data, remarks: e.target.value })}
            />
            <Group justify="center" grow>
              <Button
                color="green"
                disabled={userAttendance.check_in !== ''}
                onClick={() => doCheckIn(data)}
                radius="xl"
                size="md"
              >
                Check In
              </Button>
              <Button
                color="red"
                disabled={userAttendance.check_in === '' || userAttendance.check_out !== ''}
                onClick={() => doCheckOut(data)}
                radius="xl"
                size="md"
              >
                Check Out
              </Button>
            </Group>
          </Stack>
        </Stack>
      </Group>
      <ConfirmationDialogue
        open={action !== ''}
        title={action === 'in' ? 'Check In' : 'Check Out'}
        close={() => {
          setAction('');
          setData({ ...data, remarks: '' });
        }}
        onConfirm={action === 'in' ? () => doCheckIn(data) : () => doCheckOut(data)}
      />
    </Stack>
  );
}
