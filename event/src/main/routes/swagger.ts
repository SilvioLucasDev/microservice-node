import swaggerConfig from '@/main/docs'

import { type Application } from 'express'
import { serve, setup } from 'swagger-ui-express'

export const setupSwagger = (app: Application): void => {
  app.use('/api-docs', serve, setup(swaggerConfig))
}
