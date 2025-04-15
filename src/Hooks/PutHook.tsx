import { useMutation } from '@tanstack/react-query';
import axios from 'axios';


 function putData({ url, token, count }: {url: string, token: string, count: string}){
    // token=token.slice(1,-1);
    
    let headers={token};
    let body={ count };
    // console.log(typeof count)
    console.log(url)
    
    console.log(body);
    // headers=headers.slice(1,-1);  
    console.log(headers)
    console.log(body);

    return  axios.put(url, body,  {headers} );
}


export const usePut = ( options = {}) => {
  
  return useMutation({
    // queryKey: ['products'],
    mutationFn:   putData,
    ...options
  });
};
