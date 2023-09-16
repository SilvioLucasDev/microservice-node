export const tokenizeCardPath = {
  post: {
    tags: ['Cartão'],
    summary: 'Rota para tokenizar cartão',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/tokenizeCardParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/tokenizeCardResponse'
            }
          }
        }
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
