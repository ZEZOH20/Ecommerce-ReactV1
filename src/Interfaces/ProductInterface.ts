
import { omittedCategory } from "./CategoriesInterface";
import { omittedSubCategory } from "./SubCategoriesInterface";
import { omittedBrand } from "./BrandsInterface";

export interface IProduct {
    sold: number;
    images: string[];
    subcategory: [omittedSubCategory];
    ratingsQuantity: number;
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    category: omittedCategory;
    brand: omittedBrand;
    ratingsAverage: number;
    createdAt: string;
    updatedAt: string;
    id: string;
}











// export interface Product {
//   count: number;
//   id: string;
//   price: number;
//   product: {
//     id: string;
//     title: string;
//     imageCover: string;
//     count: number;
//     ratingsAverage: number;
//   };
// }