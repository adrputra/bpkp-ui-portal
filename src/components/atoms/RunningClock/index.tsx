import { useEffect, useState } from 'react';
import { Stack, Title, Text } from '@mantine/core';

interface Props {
  size?: number;
}
export default function RunningClock({ size = 20 }: Props) {
  const [time, setTime] = useState(new Date());

  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",  // Full weekday name (e.g., "Tuesday")
    day: "2-digit",   // Two-digit day (e.g., "25")
    month: "long",    // Full month name (e.g., "February")
    year: "numeric",  // Full year (e.g., "2025")
    timeZone: "Asia/Bangkok", // Ensures GMT+7 timezone
  }).format(time);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Stack gap={0}>
      <Text fz='md'>{formattedDate}</Text>
      <Title size={size}>{time.toLocaleTimeString('en-US', { hour12: false, timeZone: "Asia/Bangkok" })}</Title>
    </Stack>
  );
}
