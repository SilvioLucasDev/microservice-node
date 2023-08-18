import { type Controller } from '@/presentation/controllers'
import { type Response, type Request } from 'express'

export class ExpressRouter {
  constructor (private readonly controller: Controller) {}

  async adapt (req: Request, res: Response): Promise<void> {
    const { data, statusCode } = await this.controller.handle({ ...req.body })
    const json = [200, 204].includes(statusCode) ? data : { error: data.message }
    res.status(statusCode).json(json)
  }
}
