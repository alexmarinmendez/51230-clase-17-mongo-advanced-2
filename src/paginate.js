import mongoose from "mongoose"
import UserModel from './models/user.model.js'

const main = async() => {
    await mongoose.connect('mongodb://localhost:27017', { dbName: 'pizzaday'})
    console.log('DB connected!')

    // const users = await UserModel.find({ gender: "Female"})
    const users = await UserModel.paginate({ gender: "Female" }, { limit: 5, page: 445 })
    console.log(users)
}

main()