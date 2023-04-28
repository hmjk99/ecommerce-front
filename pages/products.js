import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import { mongooseConnection } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import Link from "next/link";
import { useContext } from "react";

export default function Products({products}) {
    const {addProducts} = useContext(CartContext)

    return (
        <>
        <Header/>
        <h1>All Products</h1>
        <div>
            {products.length > 0 && products.map(product=> (
                <div>
                    <h3>{product.title}</h3>
                    <img id="img" src={product.images[0]}/>
                    <h5>${product.price}</h5>
                    <Link href={'/products/'+product._id}><button>Learn More</button></Link>
                    <button onClick={()=> addProducts(product._id)}>Buy</button>
                </div>
            ))}
        </div>
        </>
    )
}

export async function getServerSideProps() {
    await mongooseConnection()
    const products =  await Product.find({})
    return {
        props: {
            products: JSON.parse(JSON.stringify(products))
        }
    }
}