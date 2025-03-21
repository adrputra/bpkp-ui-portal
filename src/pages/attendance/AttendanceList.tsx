import { act, ChangeEvent, useEffect, useState } from 'react';
import { Badge, Center, Stack, Switch, TableData, Text } from '@mantine/core';
import TableBody from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import { formatDate } from '@/libs/utils';
import { useAttendanceStore } from '@/store/attendance';
import { useAuthStore } from '@/store/auth';
import config from '@root/config.json';

export default function AttendanceList() {
  const [filter, setFilter] = useState<string>('');
  const { attendanceList, getAttendanceList } = useAttendanceStore();
  const [showAll, setShowAll] = useState<boolean>(true);
  const { username, role } = useAuthStore();

  useEffect(() => {
    getAttendanceList();
  }, []);

  const renderStatus = (status: string) => {
    switch (status) {
      case 'Late':
        return (
          <Badge size="sm" color="red">
            Late
          </Badge>
        );
      case 'On Time':
        return (
          <Badge size="sm" color="green">
            On Time
          </Badge>
        );
      case 'Normal':
        return (
          <Badge size="sm" color="green">
            Normal
          </Badge>
        );
      case 'Early':
        return (
          <Badge size="sm" color="red">
            Early
          </Badge>
        );
      default:
        return <></>;
    }
  };

  const tableData: TableData = {
    head: [
      'No.',
      'Name',
      'Check In',
      'Check Out',
      'Remark In',
      'Remark Out',
      'Source In',
      'Source Out',
    ],
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
          {formatDate(item.check_out)} {renderStatus(item.status_out)}
        </Text>,
        item.remark_in,
        item.remark_out,
        item.source_in,
        item.source_out,
      ]),
  };

  const handleShowAll = (e: ChangeEvent<HTMLInputElement>) => {
    setShowAll(e.currentTarget.checked)
    if (showAll) {
      setFilter(username);
    } else {
      setFilter('');
    }
  }

  const ActionButton = () => {
    return (
      <Switch
        checked={showAll}
        onChange={(e) => handleShowAll(e)}
        label="Show All"
      />
    );
  };

  return (
    <Center>
      <Stack p="sm" w="100%">
        <TableHeader
          title="Attendance List"
          setFilter={setFilter}
          ActionButton={config.staff_role_id === role ? <></> : <ActionButton/>}
        />
        <TableBody tableData={tableData} />
      </Stack>
    </Center>
  );
}
