export interface MakePayment {
  makePayment: (input: MakePayment.Input) => Promise<MakePayment.Output>
}

export namespace MakePayment {
  export type Input = {
    user: User
    card: Card
    eventName: string
    total: number
    paymentType: string
    installments: number | null
    dueDate: Date
    externalReference: string
  }

  export type Card = {
    id: string
    alias: string
    token: string
  } | null

  export type Output = {
    transactionId: string
    status: string
    url: string
    processorResponse: string
  }
}

export interface TokenizeCard {
  tokenizeCard: (input: TokenizeCard.Input) => Promise<TokenizeCard.Output>
}

export namespace TokenizeCard {
  export type Input = {
    user: User
    holderName: string
    number: string
    expiryMonth: string
    expiryYear: string
    cvv: string
  }

  export type Output = {
    number: string
    brand: string
    token: string
  }
}

export type User = {
  id: string
  name: string
  document: string
  email: string
  mobilePhone: string
  zipcode: string
  address: string
  number: string
  complement: string | null
  neighborhood: string
}
