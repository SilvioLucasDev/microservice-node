import './config/module-alias'
import { SetupExpress } from '@/main/config/express'

import { makeQueueController as initQueue } from '@/main/factories/infra/adapters/queue'

new SetupExpress().init()
initQueue()
