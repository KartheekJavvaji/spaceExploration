import axios from 'axios';
import { serialize } from './action-utils';

const ROOT_URL=`http://127.0.0.1:3001`;

export const IMAGE_OF_THE_DAY=`IMAGE_OF_THE_DAY`;

export function fetchAPOD(date) {
  const url = `${ROOT_URL}/image-of-the-day?${serialize({date})}`;
  const request = axios.get(url);
  console.log('Request: ', request);
  return ({
    type: IMAGE_OF_THE_DAY,
    payload: request
  })
}
