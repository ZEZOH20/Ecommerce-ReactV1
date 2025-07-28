import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CATEGORIES_BASE_URL } from "../../Constants";
import { ICategory } from "../../Interfaces/CategoriesInterface";
// 

function Categories() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  async function getCategories() {
    try {
      const response = await axios.get(`${CATEGORIES_BASE_URL}`);
      return response.data.data; // Assuming the API returns { data: [...] }
    } catch (error) {
      throw new Error("Failed to fetch categories");
    }
  }
const categories = data || [];
  // if (isLoading) return <LoadingSpinner />;
  // if (isError) return <ErrorMessage message={error.message} />;
  // if (!data || data.length === 0) return <div>No categories found</div>;

  return (
    <main className="container mx-auto mt-4 px-4">
      <div className="flex flex-wrap -mx-2"> {/* Negative margin to compensate for padding */}
        {categories.map((category: ICategory) => (
          <article 
            key={category._id} 
            className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4" // Added padding and margin
          >
            <div className="h-[700px] overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img 
                className="w-full h-full object-cover" 
                src={category.image} 
                alt={category.name} 
              />
              <h3 className="text-center text-3xl font-semibold p-4">
                {category.name}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Categories;