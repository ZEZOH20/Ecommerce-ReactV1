import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick';
import { apiClient } from '../../api/client';

interface Category {
  _id: string;
  name: string;
  image: string;
}

function CategorySlider() {
  const {data:new_data}=useQuery({
    queryFn:fetchData,
    queryKey:["Categories"]
  })

  async function fetchData(){
    const response = await apiClient.get("/categories");
    return response.data.data as Category[];
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return(
      <div className="mx-auto max-w-5xl px-4 py-6">
        <Slider {...settings}>
          {new_data?.map((category: Category) => (
            <div key={category._id} className="px-2">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-90  object-fit rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </Slider>
      </div>
  )
};

export default CategorySlider;

