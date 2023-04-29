import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Header () {
    const {cartProducts} = useContext(CartContext)
    return (
        <header>
            <Link href={'/'}>Pineapple</Link>
            <nav>
                <Link  href={'/'}>Home</Link>
                <Link  href={'/products'}>All Products</Link>
                <Link  href={'/mac'}>Mac</Link>
                <Link  href={'/iphone'}>iPhone</Link>
                <Link  href={'/airpods'}>AirPods</Link>
                <Link  href={'/cart'}>Cart ({cartProducts.length})</Link>
            </nav>
        </header>
    )
}