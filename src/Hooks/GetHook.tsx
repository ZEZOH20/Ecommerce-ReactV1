import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


function fetchData(url: string,headers: object){
    console.log(url)
    console.log(headers)
    return axios.get(url,  {
        headers
       });
}


export const useGet = (qkey:string , url :string ,token:string, options = {}) => {
  let headers={token};
  return useQuery({
    queryKey: [qkey],
    queryFn: () => fetchData(url,headers),
    ...options
  });
};

