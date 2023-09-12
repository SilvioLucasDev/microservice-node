export interface MakePayment {
  makePayment: (input: MakePayment.Input) => Promise<MakePayment.Output>
}

export namespace MakePayment {
  export type Input = {
    transactionId: string
    user: object | undefined
    card: object | null
    total: number
    paymentType: string
    installments: number | null
    dueDate: Date
  }

  export type Output = {
    transactionId: string
    status: string
    url: string
    processorResponse: string
  }
}
