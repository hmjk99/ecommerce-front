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
        <div className="show-page">
            <div className="show-left">
                <h1>{product.title}</h1>
                <img className="show-img" src={activeImage} alt=""/>
                <div className="gallery">
                    {product.images.map(image => (
                        <div key={1} onClick={()=> setActiveImage(image)} className="gallery-button">
                            <img className="gallery-img" src={image} alt=""/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="show-right">
                <p>{product.description}</p>
                <ul>
                    {Object.entries(product.properties).map(([key, value]) => (
                    <li key={key}>
                        {key}: {value}
                    </li>
                    ))}
                </ul>
                <h2>${product.price}</h2>
                <button className="show-button" onClick={()=> addProducts(product._id)}>Buy</button>
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