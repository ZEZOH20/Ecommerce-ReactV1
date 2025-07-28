import { BASE_URL } from "../../Constants";
import Cards from "../Cards/Cards";
import Slider from "react-slick";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import MainSlider from './../MainSlider/MainSlider';
interface cat {
  _id: string;
  name: string;
  image: string;
}

function Home() {
  const url=`${BASE_URL}/categories`;
  function getCategories(){
    return axios.get(url);
  }
  // const url = "https://ecommerce.routemisr.com/api/v1/categories";

  // const { data } = useGet("Categories", url, "");
  const {data} = useQuery({
    queryKey:["Categories"],
    queryFn: getCategories
  })
  
  const new_data = data?.data?.data || [];
  console.log("here here", new_data);
  // slider settings
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  // console.log(children);
  return (
    <>
      {/* slider  */}
      {/* <div className="mx-auto max-w-5xl px-4 py-6">
        <Slider {...settings}>
          {new_data.map((category: cat) => (
            <div key={category._id} className="px-2">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-90  object-fit rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </Slider>
      </div> */}
      <MainSlider/>

      <Cards></Cards>
    </>
  );
}

export default Home;
