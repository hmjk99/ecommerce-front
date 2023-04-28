import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Featured({featuredProduct}) {
    const {addProducts} = useContext(CartContext)
    const addFeaturedToCart = () =>{
        addProducts(featuredProduct._id) 
    }

    return (
        <>
            <div>
                <h1>iPhone 14 Pro</h1>
                <h3>Pro. Beyond.</h3>
                <Link href={'/products/'+featuredProduct._id}><button>Learn More</button></Link>
                <button onClick={addFeaturedToCart}>Buy</button>
            </div>
            <div>
                <img id="featured-img" src="https://hmjk99-next-ecommerce.s3.amazonaws.com/1682641010093.png"/>
            </div>
        </>
        
    )
}