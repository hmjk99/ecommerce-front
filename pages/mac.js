import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import { mongooseConnection } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Products";
import Link from "next/link";
import { useContext } from "react";

export default function Mac({products}) {
    const {addProducts} = useContext(CartContext)
    return (
        <>
        <Header/>
        {products.map(product => (
            <div>
                <div>
                    <h2>{product.title}</h2>
                    <h5>${product.price}</h5>
                    <Link href={'/products/'+product._id}><button>Learn More</button></Link>
                    <button onClick={()=> addProducts(product._id)}>Buy</button>
                </div>
                <div>
                    <img id="img" src={product.images[0]}/>
                </div>
            </div>
        ))}
        </>
    )
}

export async function getServerSideProps() {
    await mongooseConnection()
    const categoryId = await Category.find({name:'Mac'})
    const macProducts = await Product.find({category:categoryId})
    
    return {
        props: {
            products: JSON.parse(JSON.stringify(macProducts))
        }
    }
}