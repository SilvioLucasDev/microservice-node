export const asaasProcessPaymentPath = {
  post: {
    tags: ['Pagamento'],
    summary: 'WebHook para pagamentos do Asaas gateway',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/asaasProcessPaymentParams'
          }
        }
      }
    },
    responses: {
      202: {
        description: 'Sucesso'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
