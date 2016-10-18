import axios from 'axios'; // Returns a promise.
import {
  FETCH_USERS
} from './types';

export const fetchUsers = () => {
  const request = axios.get('https://jsonplaceholder.typicode.com/users');

  /* If we dispatch an action right away, the async call from axios
  Will have not yet finished and we won't have anything for the reducer */
  return ({
    type: FETCH_USERS,
    payload: request
  });
};
