import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/api/ticket/purchase', (req, res) => {
    res.send({ data: 'any_data' })
  })
}
