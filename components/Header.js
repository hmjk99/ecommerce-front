import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Header () {
    const {cartProducts} = useContext(CartContext)
    return (
        <header>
            <nav>
                <Link className="nav-link" href={'/'}>Pineapple</Link>
                <Link className="nav-link" href={'/'}>Home</Link>
                <Link className="nav-link" href={'/products'}>All Products</Link>
                <Link className="nav-link" href={'/mac'}>Mac</Link>
                <Link className="nav-link" href={'/iphone'}>iPhone</Link>
                <Link className="nav-link" href={'/airpods'}>AirPods</Link>
                <Link className="nav-link" href={'/cart'}>Cart({cartProducts.length})</Link>
            </nav>
        </header>
    )
}