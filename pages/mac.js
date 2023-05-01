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
            <div id="all-products-page">
                <h1>Mac</h1>
                <div id="all-products">
                    {products.length > 0 && products.map(product=> (
                        <div className="indv-product">
                            <h2>{product.title}</h2>
                            <img className="product-page-img" src={product.images[0]}/>
                            <h4>${product.price}</h4>
                            <div className="home-buttons products-button">
                                <Link href={'/products/'+product._id}><button>Learn More &gt;</button></Link>
                                <button onClick={()=> addProducts(product._id)}>Buy &gt;</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
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