import { useMutation } from '@tanstack/react-query';
import axios from 'axios';


 function postData(url: string, headers: object, body: object){
    console.log(url)
    
    console.log(body);
    // headers=headers.slice(1,-1);  
    console.log(headers)
    return  axios.post(url, body,  {headers} );
}


export const usePost = (url: string ,token: string, productId?:string, options = {}) => {
  token=token.slice(1,-1);
  let headers={token};
  let body={ productId };
  return useMutation({
    // queryKey: ['products'],
    mutationFn: () => postData(url, headers, body),
    ...options
  });
};
