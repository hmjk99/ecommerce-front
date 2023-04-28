import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnection } from "@/lib/mongoose";
import { Product } from "@/models/Products";

export default function Home({featuredProduct, newProducts}) {
  console.log(newProducts);
  return(
    <div>
      <Header/>
      <Featured featuredProduct={featuredProduct}/>
      <NewProducts newProducts={newProducts}/>
    </div>
  )
}

export async function getServerSideProps() {
  await mongooseConnection()
  const featuredProductId = '644b108a3dda37c9f5e39034'
  const featuredProduct = await Product.findById(featuredProductId)
  const newProducts = await Product.find({}, null, {limit:5})
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  }
}