export interface CardInterface {
  id: string;
  title: string;
  price: number;
  rating: number;
  img_src: string;
  count?: number;
  category: string;
}