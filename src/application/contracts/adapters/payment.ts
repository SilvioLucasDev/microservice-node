export interface MakePayment {
  makePayment: (input: MakePayment.Input) => Promise<MakePayment.Output>
}

export namespace MakePayment {
  export type Input = {
    transactionId: string
    user: User
    card: Card
    eventName: string
    total: number
    paymentType: string
    installments: number | null
    dueDate: Date
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
  } | undefined

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
