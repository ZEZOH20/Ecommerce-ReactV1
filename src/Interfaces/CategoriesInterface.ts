
export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string,
  updatedAt: string
}

export type omittedCategory= Omit <ICategory, "createdAt"| "updatedAt">
