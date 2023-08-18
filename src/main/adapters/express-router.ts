import { type Controller } from '@/presentation/controllers'
import { type Response, type Request } from 'express'

export class ExpressRouter {
  constructor (private readonly controller: Controller) {}
  async adapt (req: Request, res: Response): Promise<void> {
    await this.controller.handle({ ...req.body })
  }
}
