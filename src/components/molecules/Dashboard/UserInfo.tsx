import RunningClock from "@/components/atoms/RunningClock";
import { Stack, Box, Title, Text } from "@mantine/core";

export default function UserInfo() {
  return (
    <Stack pl={30} h="100%" justify="space-between">
      <Box>
        <Title order={1} fw="bold">
          Hi, User
        </Title>
        <Text size="md" fw="bold">
          Staff
        </Text>
        <Text size="md" fw="bold">
          Unit
        </Text>
      </Box>
      <RunningClock size={50} />
    </Stack>
  );
}
