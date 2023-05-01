import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnection } from "@/lib/mongoose";
import { Product } from "@/models/Products";

export default function Home({featuredProduct, newProducts}) {
  return(
    <>
      <Header/>
      <div id="container">
        <Featured featuredProduct={featuredProduct}/>
        <NewProducts newProducts={newProducts}/>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  await mongooseConnection()
  const featuredProductId = '644efe013ebaf2d26ef55ec5'
  const featuredProduct = await Product.findById(featuredProductId)
  const newProducts = await Product.find({}, null, {limit:5})
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  }
}