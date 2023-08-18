import './config/module-alias'

import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.listen(8080, () => console.log('Server running at http://localhost:8080'))
