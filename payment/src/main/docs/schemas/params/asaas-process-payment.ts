export const asaasProcessPaymentParams = {
  type: 'object',
  properties: {
    payment: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'RECEIVED'
        },
        externalReference: {
          type: 'string',
          example: 'c76a5c3d-a342-4ec5-98e9-f64cf21584a9&722d71e2-c471-4769-bb9f-a29df48b2079'
        },
        billingType: {
          type: 'string',
          example: 'BOLETO'
        },
        invoiceUrl: {
          type: 'string',
          example: 'https://sandbox.asaas.com'
        }
      },
      required: ['status', 'externalReference', 'billingType', 'invoiceUrl']
    }
  }
}
