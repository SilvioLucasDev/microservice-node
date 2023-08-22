import './config/module-alias'
import { makeQueueController as initQueue } from '@/main/factories/infra/adapters/queue'
import { makeHttpServer as initHttpServer } from '@/main/factories/main/routes'

initHttpServer()
initQueue()
