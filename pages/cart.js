import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function Cart() {
    const {cartProducts, addProducts, removeProducts} = useContext(CartContext)
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [postal, setPostal] = useState('')

    const moreProduct = (id) => {
        addProducts(id)
    }
    const minusProduct = (id) => {
        removeProducts(id)
    }
    const goToPayment = async() => {
        const response = await axios.post('/api/checkout', {
            name,email,city,postal,street,state,cartProducts
        })
        if (response.data.url) {
            window.location = response.data.url
        }
    }

    let total = 0
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0
        total += price
    }
    useEffect(()=> {
        if (cartProducts.length > 0){
            axios.post('/api/cart', {ids:cartProducts}).then(response => {
                setProducts(response.data)
            })
        } else {
            setProducts([])
        }
    }, [cartProducts])

    if (window.location.href.includes('success')){
        return (
            <>
                <Header/>
                <h1>Thanks for your order!</h1>
                <p>We will email you with your order details.</p>
            </>
        )
    }

    return (
        <>
            <Header />
            <div>
                {!cartProducts?.length && (
                    <h2>Your cart is empty</h2>
                )}
                {products?.length > 0 && (
                <>
                    <h2>Cart</h2>
                    {products.map(product => (
                        <>
                        <div>{product.title}</div>
                        <button onClick={()=> minusProduct(product._id)}>-</button>
                        <div>{cartProducts.filter(id => id === product._id).length}</div>
                        <button onClick={()=> moreProduct(product._id)}>+</button>
                        <div>${cartProducts.filter(id => id === product._id).length * product.price}</div>
                        </>
                    ))}
                    <div>
                        <h4>Total: ${total}</h4>
                    </div>
                </>
                )}
            </div>
            <div>
                {!!cartProducts?.length && 
                    <div>
                        <h2>Order Information</h2>
                        <input type="text" placeholder="Name" value={name} name="name" onChange={e => setName
                        (e.target.value)}/>
                        <input type="text" placeholder="Email" value={email} name="email" onChange={e => setEmail
                        (e.target.value)}/>
                        <input type="text" placeholder="Street Address" value={street} name="street" onChange={e => setStreet
                        (e.target.value)}/>
                        <input type="text" placeholder="City" value={city} name="city" onChange={e => setCity
                        (e.target.value)}/>
                        <input type="text" placeholder="State" value={state} name="state" onChange={e => setState
                        (e.target.value)}/>
                        <input type="text" placeholder="Postal Code" value={postal} name="postal" onChange={e => setPostal
                        (e.target.value)}/>
                        <button onClick={goToPayment}>Continue to Payment</button>
                    </div>
                }
            </div>
        </>
        
    )
}