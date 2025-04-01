import React from 'react';
import  './Input.module.css';

// type input={
//   type: string,
//   name:string,
//   value:string,
//   id:string,
//   handleChange:ChangeEventHandler<HTMLInputElement>,

// }

interface InputProps {
  type: string;
  name: string;
  value: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function Input(props: InputProps) {
  return(
    <>
        <input {...props} className="button block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
    </>
  )
};

export default Input;