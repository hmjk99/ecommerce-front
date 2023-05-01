import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function Cart() {
    const {cartProducts, setCartProducts, addProducts, removeProducts, clearCart} = useContext(CartContext)
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [postal, setPostal] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

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

    useEffect(()=> {
        if(typeof window === 'undefined'){
            return
        }
        if (window?.location.href.includes('success')){
            clearCart()
            setIsSuccess(true)
        }
    }, [])


    if (isSuccess){
        return (
            <>
                <Header/>
                <div id="order-confirm">
                    <h1>Thanks for your order!</h1>
                    <p>We will email you with your order details.</p>
                </div>
            </>
        )
    }

    return (
        <>
            <Header />
            <div id="cart">
                <h2>Cart</h2>
                {!cartProducts?.length && (
                    <h2>Your cart is empty</h2>
                )}
                <div id="cart-content">
                    {products?.length > 0 && (
                    <table>
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td className="td-product">
                                    <img className="cart-img" src={product.images[0]} alt=""/>
                                    {product.title}
                                </td>
                                <td>
                                    <button className="cart-button"
                                    onClick={() => minusProduct(product._id)}>-</button>
                                    {cartProducts.filter(id => id === product._id).length}
                                    <button className="cart-button"
                                    onClick={() => moreProduct(product._id)}>+</button>
                                </td>
                                <td>
                                    ${cartProducts.filter(id => id === product._id).length * product.price}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td></td>
                            <td></td>
                            <td><h4>Total: ${total}</h4></td>
                        </tr>
                        </tbody>
                    </table>
                    )}
                    <div id="order-input">
                    {!!cartProducts?.length && 
                        <>
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
                            <button id="cart-submit" onClick={goToPayment}>Continue to Payment</button>
                        </>
                    }
                    </div>
                </div>
            </div>
            
        </>
        
    )
}