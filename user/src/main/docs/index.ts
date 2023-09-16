import { userPath } from '@/main/docs/paths'
import { badRequest, serverError, notFound } from '@/main/docs/components'
import { getUserResponse, errorResponse } from '@/main/docs/schemas/responses'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Usuário API',
    description: 'Microsserviço responsável por processar tarefas relacionadas a usuários',
    version: '1.0.0'
  },
  servers: [{
    url: 'http://localhost:8082/v1/api',
    description: 'Servidor de desenvolvimento'
  }],
  tags: {
    name: 'Usuário'
  },
  paths: {
    '/users/{userId}/': userPath
  },
  schemas: {
    getUserResponse,
    errorResponse
  },
  components: {
    badRequest,
    notFound,
    serverError
  }
}
