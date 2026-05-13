import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiClient } from "../../api/client";
import Card from "../Card/Card";
import { ICategory } from "../../Interfaces/CategoriesInterface";
import { IProduct } from "../../Interfaces/ProductInterface";

async function getCategory(id: string) {
  const response = await apiClient.get(`/categories/${id}`);
  return response.data.data as ICategory;
}

async function getProductsByCategory(categoryId: string) {
  const response = await apiClient.get("/products");
  const products = response.data.data;

  if (!Array.isArray(products)) {
    return [];
  }

  return (products as IProduct[]).filter(
    (product) => product.category._id === categoryId,
  );
}

function CategoryDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    data: category,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
    error: categoryError,
  } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id || ""),
    enabled: Boolean(id),
  });

  const {
    data: products = [],
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useQuery({
    queryKey: ["categoryProducts", id],
    queryFn: () => getProductsByCategory(id || ""),
    enabled: Boolean(id),
  });

  if (isCategoryLoading || isProductsLoading) {
    return (
      <p className="text-center font-bold text-4xl text-blue-600 my-20">
        Loading category...
      </p>
    );
  }

  if (isCategoryError || isProductsError) {
    const error = categoryError || productsError;

    return (
      <div className="alert_box mx-auto my-20 max-w-xl" role="alert">
        {error instanceof Error ? error.message : "Failed to load category"}
      </div>
    );
  }

  if (!category) {
    return (
      <p className="text-center font-bold text-4xl text-blue-600 my-20">
        Category not found
      </p>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-8 overflow-hidden rounded-lg">
        <img
          src={category.image}
          alt={category.name}
          className="h-80 w-full object-cover"
        />
        <h1 className="mt-5 text-4xl font-bold text-blue-600">
          {category.name}
        </h1>
      </section>

      {products.length === 0 ? (
        <p className="text-center font-bold text-3xl text-blue-600 my-20">
          No products found in this category
        </p>
      ) : (
        <div className="parent flex flex-wrap justify-evenly">
          {products.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              title={product.title}
              img_src={product.images[0]}
              rating={product.ratingsAverage}
              price={product.price}
              category={product.category.name}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default CategoryDetails;
