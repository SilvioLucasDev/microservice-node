import { purchaseTicketPath } from '@/main/docs/paths'
import { badRequest, serverError, notFound } from '@/main/docs/components'
import { purchaseTicketParams } from '@/main/docs/schemas/params'
import { errorResponse } from '@/main/docs/schemas/responses'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Eventos API',
    description: 'Microsserviço responsável por processar tarefas relacionadas a eventos',
    version: '1.0.0'
  },
  servers: [{
    url: 'http://localhost:8080/v1/api',
    description: 'Servidor de desenvolvimento'
  }],
  tags: [{ name: 'Evento' }],
  paths: {
    '/purchase-tickets': purchaseTicketPath
  },
  schemas: {
    purchaseTicketParams,
    errorResponse
  },
  components: {
    badRequest,
    notFound,
    serverError
  }
}
