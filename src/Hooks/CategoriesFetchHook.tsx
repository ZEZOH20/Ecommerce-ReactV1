import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


function fetchData(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
}


export const useFetchCategories = (options = {}) => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchData(),
    ...options
  });
};


