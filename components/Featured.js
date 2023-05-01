import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Featured({featuredProduct}) {
    const {addProducts} = useContext(CartContext)
    const addFeaturedToCart = () =>{
        addProducts(featuredProduct._id) 
    }

    return (
        <div className="home">
            <h1>iPhone 14 Pro</h1>
            <h3 className="home-h3">Pro. Beyond.</h3>
            <div className="home-buttons">
                <Link href={'/products/'+featuredProduct._id}><button>Learn More &gt;</button></Link>
                <button onClick={addFeaturedToCart}>Buy &gt;</button>
            </div>
            <img className="home-img" src="/hero__cj6i78tzkp8i_large.jpg"/>
        </div>
        
    )
}