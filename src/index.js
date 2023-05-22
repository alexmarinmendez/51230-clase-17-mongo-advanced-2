import mongoose from "mongoose"
import orderModel from "./models/order.model.js"

const main = async() => {
    await mongoose.connect('mongodb://localhost:27017', { dbName: 'pizzaday'})
    console.log('DB connected!')

    // const result = await orderModel.insertMany(
        // [
    //         {name: 'Pepperoni', size: 'small', price: 19, qty: 10 },
            // {name: 'Pepperoni', size: 'medium', price: 22, qty: 58 },
    //         {name: 'Pepperoni', size: 'medium', price: 22, qty: 20 },
    //         {name: 'Pepperoni', size: 'large', price: 30, qty: 30 },
    //         {name: 'Cheese', size: 'small', price: 19, qty: 10 },
    //         {name: 'Cheese', size: 'medium', price: 19, qty: 15 },
    //         {name: 'Cheese', size: 'large', price: 19, qty: 40 },
    //         {name: 'Hawaiana', size: 'small', price: 19, qty: 10 },
    //         {name: 'Hawaiana', size: 'medium', price: 19, qty: 20 },
            // {name: 'Hawaiana', size: 'medium', price: 19, qty: 15 },
        // ]
    // )

    const orders = await orderModel.aggregate([
        { $match: { size: 'medium' } },
        { $group: 
            { 
                _id: "$name",
                totalqty: { $sum: "$qty" },
            }
        },
        { $sort:
            {
                totalqty: -1
            }
        },
        { $group: { _id: 1, orders: { $push: "$$ROOT"} } },
        { $project: 
            {
                "_id": 0,
                orders: "$orders"
            }
        },
        {
            $merge: { into: 'reports' }
        }
    ])

    // console.log(orders)
}

main()