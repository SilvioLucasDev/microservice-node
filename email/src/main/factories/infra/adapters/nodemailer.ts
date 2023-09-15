import { NodeMailerAdapter } from '@/infra/adapters'
import { env } from '@/main/config/env'

export const makeNodeMailerAdapter = (): NodeMailerAdapter => {
  return new NodeMailerAdapter(
    env.email.host,
    env.email.port,
    env.email.user,
    env.email.pass
  )
}
