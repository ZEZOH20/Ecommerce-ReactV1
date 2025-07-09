export interface Product{
  count: number;
  id: string;
  price: number;
  product:{
    id: string;
    title: string;
    imageCover: string;
    count: number;
    ratingsAverage: number;
  }
}

export interface APIResponse {
    results: number;
    metadata:{
        currentPage: number,
        numberOfPages: number,
        limit: number,
        nextPage: number
    },
    data: {
          sold: number,
            images: string[],
            subcategory: [
                {
                    _id: string,
                    name: string,
                    slug: string,
                    category: string
                }
            ],
            ratingsQuantity: number,
            _id: string,
            title: string,
            slug: string,
            description: string,
            quantity: number,
            price: number,
            imageCover: string,
            category: {
                _id: string,
                name: string,
                slug: string,
                image: string
            },
            brand: {
                _id: string,
                name: string,
                slug: string,
                image: string
            },
            ratingsAverage: number,
            createdAt: string,
            updatedAt: string,
            id: string
    }
}

export interface CardInterface{
    id: string;
    title: string;
    price: number;
    rating: number;
    img_src: string;
    count?: number;
    category: string;
}