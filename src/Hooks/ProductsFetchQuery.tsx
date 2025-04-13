import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


function fetchData(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
}


export const useFetchProducts = (options = {}) => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => fetchData(),
    ...options
  });
};


