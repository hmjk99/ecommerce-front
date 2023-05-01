import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnection } from "@/lib/mongoose";
import { Product } from "@/models/Products";

export default function Home({featuredProduct, airpodsMax, airpodsPro, macbook}) {
  return(
    <>
      <Header/>
      <div>
        <Featured featuredProduct={featuredProduct}/>
        <NewProducts airpodsMax={airpodsMax} airpodsPro={airpodsPro} macbook={macbook}/>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  await mongooseConnection()
  const featuredProductId = '644efe013ebaf2d26ef55ec5'
  const featuredProduct = await Product.findById(featuredProductId)
  const macbook = await Product.find({ title: "MacBook Air (M2)" })
  const airpodsMax = await Product.find({ title: "AirPods Max" })
  const airpodsPro = await Product.find({ title: "AirPods Pro (2nd Gen)" })
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      macbook: JSON.parse(JSON.stringify(macbook)),
      airpodsMax: JSON.parse(JSON.stringify(airpodsMax)),
      airpodsPro: JSON.parse(JSON.stringify(airpodsPro)),
    },
  }
}