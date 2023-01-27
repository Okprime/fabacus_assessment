import express from 'express'
import tokenRoutes from './route/tokenRoute'

const app = express()
app.use(express.json())
app.use('/', tokenRoutes)

const port = process.env.PORT
const server = app.listen(port, () => console.log(`Server running on port ${port}`))

export default server
