export const purchaseTicketParams = {
  type: 'object',
  properties: {
    userId: {
      type: 'string',
      example: '443315ee-4c25-11ee-be56-0242ac120002'
    },
    paymentType: {
      type: 'string',
      enum: ['credit_card', 'billet'],
      example: 'credit_card'
    },
    eventId: {
      type: 'string',
      example: 'c08c6ed4-757f-44da-b5df-cb856dfdf897'
    },
    cardId: {
      type: 'string',
      example: 'ebfa9e28-4c25-11ee-be56-0242ac120002'
    },
    installments: {
      type: 'number',
      example: 3
    }
  },
  required: ['paymentType', 'eventId', 'userId']
}
