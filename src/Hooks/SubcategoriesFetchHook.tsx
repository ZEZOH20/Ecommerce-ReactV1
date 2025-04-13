import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


function fetchData(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/subcategories');
}


export const useFetchSubcategories = (options = {}) => {
  return useQuery({
    queryKey: ['subcategories'],
    queryFn: () => fetchData(),
    ...options
  });
};


