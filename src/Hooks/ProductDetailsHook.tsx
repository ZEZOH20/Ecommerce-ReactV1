import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


function fetchData(product_id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${product_id}`);
}


export const useFetchProductDetails = (product_id, options = {}) => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => fetchData(product_id),
    ...options
  });
};


