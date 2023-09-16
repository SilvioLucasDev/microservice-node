import './config/module-alias'
import { makeHttpServer as initHttpServer } from '@/main/factories/main/routes'
import { makeQueueController as initQueue } from '@/main/factories/infra/adapters/queue'
import { setupSwagger } from '@/main/routes'

import express from 'express'

export const app = express()
setupSwagger(app)
initHttpServer(app)
initQueue()
