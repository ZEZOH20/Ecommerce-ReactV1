// import React from 'react';
// import styles from './Categories.module.css';

import axios from "axios";
import { CATEGORIES_BASE_URL } from "../../Constants";
import { useQuery } from "@tanstack/react-query";
import { ICategory } from "../../Interfaces/CategoriesInterface";

function Categories() {
  function getCategories() {
    return axios.get(`${CATEGORIES_BASE_URL}`);
  }

  let { data, isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  return (
    <main className="flex flex-wrap container mx-auto mt-4 px-4 flex-">
      {data?.data?.data.map((category: ICategory) => {
        return <article className="sm:w-full md:w-1/2 lg:w-1/3 shrink">
          <img className="w-full" src={category.image} alt="" />
          <h3 className="text-center text-3xl font-semibold">{category.name}</h3>
        </article>;
      })}
    </main>
  );
}

export default Categories;
