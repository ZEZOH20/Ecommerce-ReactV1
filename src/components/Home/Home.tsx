import React from 'react';

import Card from '../Card/Card';
import Cards from '../Cards/Cards';
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