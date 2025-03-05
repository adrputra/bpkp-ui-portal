import { Center, Stack } from '@mantine/core';
import { UserProfileHeader, UserProfileInfo } from '@/components/template/UserProfile';
import { useUserStore } from '@/store/user';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function UserProfile() {
  const { getUserDetail } = useUserStore();
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    getUserDetail(id!, navigate);
  }, [])
  return (
    <Center>
      <Stack p="sm" w="100%">
        <UserProfileHeader />
        <UserProfileInfo />
      </Stack>
    </Center>
  );
}
