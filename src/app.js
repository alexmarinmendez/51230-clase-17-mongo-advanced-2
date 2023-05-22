import express from 'express'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'
import viewsRouter from './routers/views.routes.js'

const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)

await mongoose.connect('mongodb://localhost:27017', { dbName: 'pizzaday' })
app.listen(8080, () => console.log('Server Up'))