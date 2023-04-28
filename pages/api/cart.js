import { mongooseConnection } from "@/lib/mongoose";
import { Product } from "@/models/Products";

export default async function handler(req, res) {
    await mongooseConnection()
    const ids = req.body.ids
    res.json(await Product.find({_id:ids}))
} 