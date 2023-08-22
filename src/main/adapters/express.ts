import express, { type Request, type Response } from 'express'
import { env } from '@/main/config/env'

import cors from 'cors'

export class ExpressAdapter {
  app: any

  constructor () {
    this.app = express()
    this.app.use(express.json())
    this.app.use(cors())
  }

  on (method: string, url: string, callback: any): void {
    this.app[method](`/v1/api${url.replace(/\{|\}/g, '')}`, async function (req: Request, res: Response) {
      const { statusCode, data } = await callback(req.params, req.body)
      const json = [200, 204].includes(statusCode) ? data : { error: data.message }
      res.status(statusCode).json(json)
    })
  }

  listen (): void {
    this.app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  }
}
