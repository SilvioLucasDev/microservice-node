export const getUserResponse = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    document: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    mobilePhone: {
      type: 'string'
    },
    zipcode: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    number: {
      type: 'string'
    },
    complement: {
      type: 'string'
    },
    neighborhood: {
      type: 'string'
    }
  },
  required: ['id', 'name', 'document', 'email', 'mobilePhone', 'zipcode', 'address', 'number', 'neighborhood']
}
