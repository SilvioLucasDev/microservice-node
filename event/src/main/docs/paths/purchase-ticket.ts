export const purchaseTicketPath = {
  post: {
    tags: ['Evento'],
    summary: 'Rota para comprar ingresso',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/purchaseTicketParams'
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
