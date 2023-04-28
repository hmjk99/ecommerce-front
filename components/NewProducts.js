import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function NewProducts({newProducts}) {
    const {addProducts} = useContext(CartContext)
    return (
        <div>
            <h1>Latest Products</h1>
            {newProducts?.length > 0 && newProducts.map(product => (
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
        </div>
    )
}