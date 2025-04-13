import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


function fetchData(url,headers){
    console.log(url)
    console.log(headers)
    return axios.get(`${url}`,  {
        headers:{
            ...headers

        }
       });
}


export const useGet = (url , headers={}, options = {}) => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => fetchData(url,headers),
    ...options
  });
};

