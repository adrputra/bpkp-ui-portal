import { IconLock } from '@tabler/icons-react';
import { Group, Paper, PasswordInput, Stack, Tabs, Text, TextInput } from '@mantine/core';
import GenderSelection from '@/components/atoms/GenderSelection';
import InstitutionCodeSelection from '@/components/atoms/InstitutionCodeSelection';
import ReligionSelection from '@/components/atoms/ReligionSelection';
import RoleInputSelection from '@/components/atoms/RoleInputSelection';
import {
  UserProfileHeaderImage,
  UserProfileHeaderInfo,
} from '@/components/organisms/User/UserProfile/Header';
import { useUserStore } from '@/store/user';

export function UserProfileHeader() {
  return (
    <Paper p="sm" shadow="xl">
      <UserProfileHeaderImage />
      <UserProfileHeaderInfo />
    </Paper>
  );
}

export function UserProfileInfo() {
  const { userDetail } = useUserStore();
  return (
    <Paper p="sm" shadow="xl" mb='xl'>
      <Tabs defaultValue="personal">
        <Tabs.List justify="center">
          <Tabs.Tab value="personal">Personal Information</Tabs.Tab>
          <Tabs.Tab value="summary">Summary</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="personal">
          <Stack my="md" pl='xl'>
            <Group grow align="flex-start">
              <Stack gap={0}>
                <Text size="md">NIP</Text>
                <Text size="md" fw={900}>
                  {userDetail.username}
                </Text>
              </Stack>
              <Stack gap={0}>
                <Text size="md">Email</Text>
                <Text size="md" fw={900}>
                  {userDetail.email}
                </Text>
              </Stack>
            </Group>

            <Group grow align="flex-start">
            <Stack gap={0}>
                <Text size="md">Full Name</Text>
                <Text size="md" fw={900}>
                  {userDetail.fullname}
                </Text>
              </Stack>
              <Stack gap={0}>
                <Text size="md">Short Name</Text>
                <Text size="md" fw={900}>
                  {userDetail.shortname}
                </Text>
              </Stack>
            </Group>
            <Group grow align="flex-start">
            <Stack gap={0}>
                <Text size="md">Role</Text>
                <Text size="md" fw={900}>
                  {userDetail.role_name}
                </Text>
              </Stack>
              <Stack gap={0}>
                <Text size="md">Institution</Text>
                <Text size="md" fw={900}>
                  {userDetail.institution_name}
                </Text>
              </Stack>
            </Group>
            <Group grow align="flex-start">
            <Stack gap={0}>
                <Text size="md">Address</Text>
                <Text size="md" fw={900}>
                  {userDetail.address}
                </Text>
              </Stack>
              <Stack gap={0}>
                <Text size="md">Phone Number</Text>
                <Text size="md" fw={900}>
                  {userDetail.phone_number}
                </Text>
              </Stack>
            </Group>
            <Group grow align="flex-start">
            <Stack gap={0}>
                <Text size="md">Gender</Text>
                <Text size="md" fw={900}>
                  {userDetail.gender}
                </Text>
              </Stack>
              <Stack gap={0}>
                <Text size="md">Religion</Text>
                <Text size="md" fw={900}>
                  {userDetail.religion}
                </Text>
              </Stack>
            </Group>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}
