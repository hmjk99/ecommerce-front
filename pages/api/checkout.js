import { mongooseConnection } from "@/lib/mongoose"
import { Order } from "@/models/Order"
import { Product } from "@/models/Products"
const stripe = require('stripe')(process.env.STRIPE_SK)

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.json('should be a POST request')
        return
    }
    const {name,email,street,city,state,postal,cartProducts} = req.body

    await mongooseConnection()

    const productsIds = cartProducts
    const uniqueIds = [...new Set(productsIds)]
    const productsInfos = await Product.find({_id:uniqueIds})

    let line_items = []
    for (const productId of uniqueIds) {
        const info = productsInfos.find(p => p._id.toString() === productId)
        const quantity = productsIds.filter(id => id === productId)?.length || 0
        if (quantity > 0 && info) {
            line_items.push({
                quantity,
                price_data: {
                    currency: 'USD',
                    product_data: {name:info.title},
                    unit_amount: quantity * info.price * 100,
                }
            })
        }
    }

    const orderDoc = await Order.create({
        line_items,name,email,street,city,state,postal,paid:false
    })

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        customer_email: email,
        success_url: 'https://ecommerce-front-hmjk99.vercel.app/' +'/cart?success=1',
        cancel_url: 'https://ecommerce-front-hmjk99.vercel.app/' +'/cart?canceled=1',
        metadata:{orderId:orderDoc._id.toString()}
    })

    res.json({
        url:session.url
    })
}