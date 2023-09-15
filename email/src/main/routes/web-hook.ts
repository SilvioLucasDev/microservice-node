import { makeAsaasProcessPaymentController } from '@/main/factories/presentation/controllers'
import { type OnServer } from '@/application/contracts/adapters'

export class WebHookRouter {
  constructor (httpServer: OnServer) {
    httpServer.on({
      method: 'post',
      url: '/asaas/process-payment',
      callback: async (params: any, body: any) => {
        return await makeAsaasProcessPaymentController().handle(body)
      }
    })
  }
}
