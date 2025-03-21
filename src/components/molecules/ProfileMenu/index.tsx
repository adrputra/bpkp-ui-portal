import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Menu, rem } from '@mantine/core';
import { useAuthStore } from '@/store/auth';
import { useNavigate } from 'react-router-dom';

export default function ProfileMenuMolecule() {
  const { username, clearAuth } = useAuthStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Box style={{ cursor: 'pointer' }}>
          <Avatar radius="xl" />
        </Box>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{t("Application")}</Menu.Label>
        <Menu.Item leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />} onClick={() => navigate(`/profile/${username}`)}>
          {t("User Profile")}
        </Menu.Item>
        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
          {t("Settings")}
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
          onClick={clearAuth}
        >
          {t("Logout")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
