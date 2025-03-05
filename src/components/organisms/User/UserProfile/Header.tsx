import { Avatar, Box, Group, Image, Stack, Text } from '@mantine/core';
import { useUserStore } from '@/store/user';

export function UserProfileHeaderImage() {
  return (
    <Box>
      <Image
        src="https://images.pexels.com/photos/1323206/pexels-photo-1323206.jpeg?cs=srgb&dl=pexels-mixu-513809-1323206.jpg&fm=jpg"
        fit="cover"
        radius="sm"
        h="40vh"
      />
    </Box>
  );
}

export function UserProfileHeaderInfo() {
  const { userDetail } = useUserStore();

  return (
    <Group justify="flex-start" align="flex-start">
      <Avatar
        size={100}
        name="AB"
        src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1728777600&semt=ais_hybrid-rr-similar"
        color="black"
        opacity="100%"
        style={{ translate: '15% -50%' }}
      />
      <Group ml={20} mt={20} gap="xl">
        <Stack gap="xs">
          <Text size="xl" fw="bold">
            {userDetail.fullname}
          </Text>
          <Text size="sm" fw="bold">{userDetail.role_name} - {userDetail.institution_name}</Text>
        </Stack>
      </Group>
    </Group>
  );
}
