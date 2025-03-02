import { sendRequestGET } from '@/libs/sendRequest';

export const getRandomQuotes = async () => {
  try {
    console.info('[REQ RANDOM QUOTES]');
    const response = await sendRequestGET('https://api.quotable.io/random', {});
    console.info('[RES RANDOM QUOTES]', response);
    return response;
  } catch (error) {
    console.error('[ERROR RANDOM QUOTES]',error);
  }
};
