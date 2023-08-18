import { type Response, type Request } from 'express'

export class ExpressRouter {
  constructor (private readonly controller: any) {}
  async adapt (req: Request, res: Response): Promise<void> {
    await this.controller.handle({ ...req.body })
  }
}
