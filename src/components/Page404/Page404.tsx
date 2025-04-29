// import React from 'react';
// import styles from './Page404.module.css';

function Page404() {
  return(
    <>
    <div className=" mb-30 flex justify-center items-center mt-40  dark:bg-gray-800">
    <div className="flex w-fit mx-auto">
        <h2 className="text-7xl font-bold text-blue-600 tracking-wider after:content-['|'] relative after:absolute after:bottom-1 mr-7">404</h2>
        <h2 className="text-7xl font-bold text-blue-600 bg-clip-tex dark:text-blue-300"> Page not Found</h2>
      </div>
    </div>


    {/* <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-all text-lg">
        <FontAwesomeIcon icon={faHouse} />
        Go back home
      </Link> */}
    </>
  )
};

export default Page404;