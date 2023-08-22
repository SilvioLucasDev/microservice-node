import { env } from '@/main/config/env'

import express, { json } from 'express'
import cors from 'cors'
import { type Express, Router } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

export class SetupExpress {
  public app: Express

  constructor () {
    this.app = express()
    this.app.use(cors())
    this.app.use(json())
  }

  init (): void {
    const router = Router()
    readdirSync(join(__dirname, '../routes'))
      .filter(file => !file.endsWith('.map'))
      .map(async file => {
        (await import(`../routes/${file}`)).default(router)
      })
    this.app.use('/v1/api', router)

    this.app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  }
}
