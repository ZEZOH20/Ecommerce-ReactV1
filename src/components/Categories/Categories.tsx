import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { apiClient } from "../../api/client";
import { ICategory } from "../../Interfaces/CategoriesInterface";

function Categories() {
  const { data, isLoading, isError, error } = useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  async function getCategories() {
    const response = await apiClient.get("/categories");
    return response.data.data as ICategory[];
  }

  if (isLoading) {
    return (
      <p className="text-center font-bold text-4xl text-blue-600 my-20">
        Loading categories...
      </p>
    );
  }

  if (isError) {
    return (
      <div className="alert_box mx-auto my-20 max-w-xl" role="alert">
        {error instanceof Error ? error.message : "Failed to load categories"}
      </div>
    );
  }

  const categories = data || [];

  if (categories.length === 0) {
    return (
      <p className="text-center font-bold text-4xl text-blue-600 my-20">
        No categories found
      </p>
    );
  }

  return (
    <main className="container mx-auto mt-4 px-4">
      <div className="flex flex-wrap -mx-2">
        {categories.map((category: ICategory) => (
          <article 
            key={category._id} 
            className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4"
          >
            <Link
              to={`/category-details/${category._id}`}
              className="block h-[700px] overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg"
            >
              <img 
                className="w-full h-[620px] object-cover"
                src={category.image} 
                alt={category.name} 
              />
              <h3 className="text-center text-3xl font-semibold p-4">
                {category.name}
              </h3>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Categories;
