import { useMutation } from '@tanstack/react-query';
import axios from 'axios';


 function deleteData({ url, token }: {url: string, token: string}){
    // token=token.slice(1,-1);
    
    let headers={token};

    // console.log(typeof count)
    console.log(url)

    // headers=headers.slice(1,-1);  
    console.log(headers)
    

    return  axios.delete(url, { headers } );
}


export const useDelete = ( options = {}) => {
  
  return useMutation({
    // queryKey: ['products'],
    mutationFn:   deleteData,
    ...options
  });
};