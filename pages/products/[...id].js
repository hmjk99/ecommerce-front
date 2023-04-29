import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import { mongooseConnection } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import { useContext, useState } from "react";

export default function SingleProduct({product}) {
    const {addProducts} = useContext(CartContext)
    const [activeImage, setActiveImage] = useState(product.images[0])
    return (
        <>
        <Header/>
        <div>
            <div>
                <h1>{product.title}</h1>
                <img id="img" src={activeImage}/>
                <div className="gallery">
                    {product.images.map(image => (
                        <div onClick={()=> setActiveImage(image)} className="gallery-button">
                            <img className="gallery-img" src={image}/>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <p>{product.description}</p>
                <h5>${product.price}</h5>
                <button onClick={()=> addProducts(product._id)}>Buy</button>
            </div>
        </div>
        </>
    )
}

export async function getServerSideProps(context) {
    await mongooseConnection()
    const {id} = context.query
    const product = await Product.findById(id)
    return {
        props: {
            product: JSON.parse(JSON.stringify(product))
        }
    }
}