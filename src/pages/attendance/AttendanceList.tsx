import { useEffect, useState } from 'react';
import { Badge, Center, Stack, TableData, Text } from '@mantine/core';
import TableBody from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import { formatDate } from '@/libs/utils';
import { useAttendanceStore } from '@/store/attendance';

export default function AttendanceList() {
  const [filter, setFilter] = useState<string>('');
  const { attendanceList, getAttendanceList } = useAttendanceStore();

  useEffect(() => {
    getAttendanceList();
  }, []);

  const renderStatus = (status: string) => {
    if (status === 'Late') {
      return (
        <Badge size="sm" color="red">
          Late
        </Badge>
      );
    }
    return (
      <Badge size="sm" color="green">
        On Time
      </Badge>
    );
  };

  const tableData: TableData = {
    head: ['No.', 'Name', 'Check In', 'Check Out', 'Remark In', 'Remark Out', 'Source In', 'Source Out'],
    body: attendanceList
      .filter(
        (item) =>
          item.fullname.toLowerCase().includes(filter.toLowerCase()) ||
          item.username.toLowerCase().includes(filter.toLowerCase())
      )
      .map((item, index) => [
        index + 1,
        item.fullname,
        <Text size="sm">
          {formatDate(item.check_in)} {renderStatus(item.status_in)}
        </Text>,
        <Text size="sm">
          {formatDate(item.check_out)} {renderStatus(item.status_in)}
        </Text>,
        item.remark_in,
        item.remark_out,
        item.source_in,
        item.source_out,
      ]),
  };

  return (
    <Center>
      <Stack p="sm" w="100%">
        <TableHeader title="Attendance List" setFilter={setFilter} />
        <TableBody tableData={tableData} />
      </Stack>
    </Center>
  );
}
