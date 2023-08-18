import { setupMiddlewares } from '@/main/config/middlewares'
import { setupRutes } from '@/main/config/routes'
import express from 'express'

const app = express()
setupMiddlewares(app)
setupRutes(app)
export { app }
