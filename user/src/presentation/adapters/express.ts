import { type ListenServer, type OnServer } from '@/application/contracts/adapters'

import { json, type Request, type Response } from 'express'
import { type Server } from 'http'
import cors from 'cors'

export class ExpressAdapter implements OnServer, ListenServer {
  constructor (
    public readonly port: number | string,
    private readonly app: any
  ) {
    this.initializeMiddlewares()
  }

  private initializeMiddlewares (): void {
    this.app.use(json())
    this.app.use(cors())
  }

  on ({ method, url, callback }: OnServer.Input): void {
    this.app[method](`/v1/api${url.replace(/\{|\}/g, '')}`, async function (req: Request, res: Response) {
      const { statusCode, data } = await callback(req.params, req.body)
      const json = [200, 202, 204].includes(statusCode) ? data : { error: data.message }
      res.status(statusCode).json(json)
    })
  }

  listen (): Server {
    return this.app.listen(this.port, () => console.log(`Server running at http://localhost:${this.port}`))
  }
}
