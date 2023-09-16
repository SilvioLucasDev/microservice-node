export const userPath = {
  get: {
    tags: ['Usuário'],
    summary: 'Rota para obter informações de um usuário',
    parameters: [{
      in: 'path',
      name: 'userId',
      required: true,
      schema: {
        type: 'string',
        example: '443315ee-4c25-11ee-be56-0242ac120002'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/getUserResponse'
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
