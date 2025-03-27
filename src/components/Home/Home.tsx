import React from 'react';
import Cards from '../Cards/Cards';
import Card from '../Card/Card';
// import styles from './Home.module.css';

function Home( {children} ) {
  // console.log(children);
  return(
    <>

        <Cards>
          <Card></Card>
          
        </Cards>
    </>
  )
};

export default Home;