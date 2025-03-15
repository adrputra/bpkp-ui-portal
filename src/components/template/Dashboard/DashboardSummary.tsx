import { IconGraph } from '@tabler/icons-react';
import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import StaffAttendances from '@/components/atoms/DashboardSummary/StaffAttendances';
import TotalStaff from '@/components/atoms/DashboardSummary/TotalStaff';

export default function DashboardSummary() {
  return (
    <SimpleGrid cols={4}>
      <StaffAttendances />
      <TotalStaff />
    </SimpleGrid>
  );
}
