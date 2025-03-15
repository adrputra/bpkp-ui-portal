import { sendRequestGET } from '@/libs/sendRequest';
import endpoint from '@root/endpoint.json';

export const getRandomQuotes = async () => {
  try {
    console.info('[REQ RANDOM QUOTES]');
    const response = await sendRequestGET('https://api.quotable.io/random', {});
    console.info('[RES RANDOM QUOTES]', response);
    return response;
  } catch (error) {
    console.error('[ERROR RANDOM QUOTES]', error);
  }
};

export const metabaseSSO = async () => {
  try {
    console.info('[REQ METABASE SSO]');
    const response = await sendRequestGET(`${endpoint.publicURL}${endpoint.metabase}`, {});
    console.info('[RES METABASE SSO]', response);
    return response;
  } catch (error) {
    console.error('[ERROR METABASE SSO]', error);
  }
}