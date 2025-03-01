import RunningClock from "@/components/atoms/RunningClock";
import { useAuthStore } from "@/store/auth";
import { Stack, Box, Title, Text } from "@mantine/core";

export default function UserInfo() {
  const { shortname, role_name, institutionName } = useAuthStore();
  return (
    <Stack pl={30} h="100%" justify="space-between">
      <Box>
        <Title order={1} fw="bold" mb='sm'>
          Hi, {shortname}
        </Title>
        <Text size="md" fw={600}>
          {role_name}
        </Text>
        <Text size="sm">
          {institutionName}
        </Text>
      </Box>
      <RunningClock size={50} />
    </Stack>
  );
}
