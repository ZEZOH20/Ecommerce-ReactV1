export type Isubcategory={
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string,
  updatedAt: string
}
export type omittedSubCategory= Omit<Isubcategory, "createdAt"| "updatedAt">