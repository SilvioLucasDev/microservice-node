import { type Controller } from '@/presentation/controllers'

import { type RequestHandler } from 'express'

export const adaptExpressRoute = (controller: Controller): RequestHandler => {
  return async (req, res) => {
    const { statusCode, data } = await controller.handle({ ...req.body })
    const json = [200, 204].includes(statusCode) ? data : { error: data.message }
    res.status(statusCode).json(json)
  }
}
