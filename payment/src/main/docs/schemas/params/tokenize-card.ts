export const tokenizeCardParams = {
  type: 'object',
  properties: {
    userId: {
      type: 'string',
      example: '443315ee-4c25-11ee-be56-0242ac120002'
    },
    alias: {
      type: 'string',
      example: 'Any Alias'
    },
    holderName: {
      type: 'string',
      example: 'Any U. Teste'
    },
    number: {
      type: 'string',
      example: '5162306219378829'
    },
    expiryMonth: {
      type: 'string',
      example: '05'
    },
    expiryYear: {
      type: 'string',
      example: '2024'
    },
    cvv: {
      type: 'string',
      example: '318'
    }
  },
  required: ['alias', 'holderName', 'number', 'expiryMonth', 'expiryYear', 'cvv', 'userId']
}
