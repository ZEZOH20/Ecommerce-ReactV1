export type IBrand= {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string,
  updatedAt: string
}
export type omittedBrand= Omit<IBrand, "createdAt"| "updatedAt">