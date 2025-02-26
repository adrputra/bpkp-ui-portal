import { Avatar, Box, Grid, Paper, Stack } from '@mantine/core';
import CheckInOut from '@/components/molecules/Dashboard/CheckInOut';
import UserInfo from '@/components/molecules/Dashboard/UserInfo';
import UserStatus from '@/components/molecules/Dashboard/UserStatus';

export default function UserDashboard() {
  return (
    <>
      <Paper p="md" shadow="md" w="100%">
        <Box>
          <Grid>
            <Grid.Col span={2}>
              <Stack p={10}>
                <Avatar
                  h={200}
                  w={200}
                  src="https://images.pexels.com/photos/1323206/pexels-photo-1323206.jpeg?cs=srgb&dl=pexels-mixu-513809-1323206.jpg&fm=jpg"
                />
              </Stack>
            </Grid.Col>
            <Grid.Col span={3}>
              <UserInfo />
            </Grid.Col>
            <Grid.Col span={4}>
              <CheckInOut />
            </Grid.Col>
            <Grid.Col span={3}>
              <UserStatus />
            </Grid.Col>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}
