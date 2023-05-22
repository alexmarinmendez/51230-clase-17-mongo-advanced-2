import { Router } from 'express'
import UserModel from '../models/user.model.js'

const router = Router()

router.get('/', (req, res) => res.render('index'))

router.get('/users', async (req, res) => {
    let page = parseInt(req.query.page)
    if (!page) page = 1
    const result = await UserModel.paginate({}, {
        page,
        limit: 5,
        lean: true
    })
    result.prevLink = result.hasPrevPage ? `/users?page=${result.prevPage}` : ''
    result.nextLink = result.hasNextPage ? `/users?page=${result.nextPage}` : ''
    console.log(result)
    res.render('users', result)
})

export default router