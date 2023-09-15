import { makeAxiosAdapter } from '@/main/factories/infra/adapters'
import { AsaasGateway } from '@/infra/adapters/gateways'
import { env } from '@/main/config/env'

export const makeAsaasGateway = (): AsaasGateway => {
  return new AsaasGateway(
    makeAxiosAdapter(),
    env.asaas.apiKey
  )
}
