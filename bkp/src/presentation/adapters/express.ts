import { type ListenServer, type OnServer } from '@/application/contracts/adapters'
import { env } from '@/main/config/env'

import express, { type Request, type Response } from 'express'
import cors from 'cors'

export class ExpressAdapter implements OnServer, ListenServer {
  app: any

  constructor (app: any) {
    this.app = app
    this.app.use(express.json())
    this.app.use(cors())
  }

  on ({ method, url, callback }: OnServer.Input): void {
    this.app[method](`/v1/api${url.replace(/\{|\}/g, '')}`, async function (req: Request, res: Response) {
      const { statusCode, data } = await callback(req.params, req.body)
      const json = [200, 202, 204].includes(statusCode) ? data : { error: data.message }
      res.status(statusCode).json(json)
    })
  }

  listen (): void {
    if (env.nodeEnv !== 'test') this.app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  }
}
