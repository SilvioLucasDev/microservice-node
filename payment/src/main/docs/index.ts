import { asaasProcessPaymentPath, tokenizeCardPath } from '@/main/docs/paths'
import { badRequest, serverError, notFound } from '@/main/docs/components'
import { tokenizeCardParams, asaasProcessPaymentParams } from '@/main/docs/schemas/params'
import { errorResponse, tokenizeCardResponse } from '@/main/docs/schemas/responses'
import { env } from '@/main/config/env'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Pagamento API',
    description: 'Microsserviço responsável por processar tarefas relacionadas a pagamentos',
    version: '1.0.0'
  },
  servers: [{
    url: `http://localhost:${env.port}/v1/api`,
    description: 'Servidor de desenvolvimento'
  }],
  tags: [
    { name: 'Cartão' },
    { name: 'Pagamento' }
  ],
  paths: {
    '/tokenize-cards': tokenizeCardPath,
    '/asaas/process-payment': asaasProcessPaymentPath
  },
  schemas: {
    tokenizeCardParams,
    tokenizeCardResponse,
    asaasProcessPaymentParams,
    errorResponse
  },
  components: {
    badRequest,
    notFound,
    serverError
  }
}
