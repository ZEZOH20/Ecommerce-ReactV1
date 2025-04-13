import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


function fetchData(url){
    return axios.get(`${url}`);
}


export const useGet = (url , headers={}, options = {}) => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => fetchData(url),
    ...options
  });
};

