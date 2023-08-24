import Image from 'next/image'
import Hero from "../components/views/Hero/index"
import ProductsType from '../components/views/ProductsType'
import BASE_PATH_FOR_API from '../components/shared/BasePath';
import ProductCarousel from '../components/views/ProductCarousel';
import Jewellery from '../components/views/Jewellery';
import NewsLetter from '../components/views/NewsLetter';

async function fetchAllProductsData() {
  let response: Response = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == "products"]`, {
        next: {
            revalidate: 60
        }
    })
  // if(!response.ok) {
  //   throw new Error("Failed to fetch");
  // }
  // return response.json();
}

export default async function Home() {
  // let {result} = await fetchAllProductsData();
  return (
    <div>
      {/* <Hero /> */}
      {/* <ProductsType /> */}
      {/* <ProductCarousel ProductData={result}/> */}
      {/* <Jewellery /> */}
      {/* <NewsLetter /> */}
    </div>
  )
}