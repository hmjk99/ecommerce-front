import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Featured({featuredProduct}) {
    const {addProducts} = useContext(CartContext)
    const addFeaturedToCart = () =>{
        addProducts(featuredProduct._id) 
    }

    return (
        <div id="featured">
            <h1>iPhone 14 Pro</h1>
            <h3 id="featured-h3">Pro. Beyond.</h3>
            <div id="featured-buttons">
                <Link href={'/products/'+featuredProduct._id}><button>Learn More &gt;</button></Link>
                <button onClick={addFeaturedToCart}>Buy &gt;</button>
            </div>
            <img id="img" src="/hero__cj6i78tzkp8i_large.jpg"/>
        </div>
        
    )
}