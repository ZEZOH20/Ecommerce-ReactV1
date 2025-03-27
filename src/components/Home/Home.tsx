import React from 'react';
// import styles from './Home.module.css';

function Home( {children} ) {
  console.log(children);
  return(
    <>

        {children}
    </>
  )
};

export default Home;