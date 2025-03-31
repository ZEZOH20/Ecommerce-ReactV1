import React from 'react';
// import styles from './AlertBox.module.css';
interface Props{
  children : React.ReactNode;
}
function AlertBox(props:Props) {
  return(
    <>
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           {props.children}
        </div>
    </>
  )
};

export default AlertBox;