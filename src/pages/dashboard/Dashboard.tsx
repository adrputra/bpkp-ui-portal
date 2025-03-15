import { useEffect, useState } from 'react';
import config from '@root/config.json';
import endpoint from '@root/endpoint.json';
import * as jose from 'jose';
import { Paper, Stack } from '@mantine/core';
import { metabaseSSO } from '@/api/dashboard';
import DashboardSummary from '@/components/template/Dashboard/DashboardSummary';
import UserDashboard from '@/components/template/Dashboard/UserDashboard';

export default function Dashboard() {
  const [metabaseIFrame, setMetabaseIFrame] = useState('');
  const getMetabaseIFrame = async () => {
    const res = await metabaseSSO();
    if (res.code === 200) {
      setMetabaseIFrame(res.data);
    }
  };

  useEffect(() => {
    getMetabaseIFrame();
  }, []);

  return (
    <Stack>
      <UserDashboard />
      <DashboardSummary />
      <Paper p="md" shadow="md" w="100%">
        <iframe src={metabaseIFrame} frameBorder="0" width="100%" height="800px"></iframe>
      </Paper>
    </Stack>
  );
}
