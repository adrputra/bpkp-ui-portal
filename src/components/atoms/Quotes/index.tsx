import { useEffect, useState } from 'react';
import { IconQuote } from '@tabler/icons-react';
import { Group, Paper, Text } from '@mantine/core';
import { getRandomQuotes } from '@/api/dashboard';

interface Quotes {
  content: string;
  author: string;
}
export default function Quotes() {
  const [quote, setQuote] = useState<Quotes>({
    content: '',
    author: '',
  });

  const getQuote = async () => {
    await getRandomQuotes().then((res) => {
      setQuote({
        content: res.content,
        author: res.author,
      });
    });
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <Paper withBorder p="sm" radius="md" mah={140}>
      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          Quote Of The Day
        </Text>
        <IconQuote />
      </Group>
      <Text fz="xs" c="dimmed" mt={7}>
        {quote.content} <Text span fz="xs" fw={600}>{` — ${quote.author}`}</Text>
      </Text>
    </Paper>
  );
}
