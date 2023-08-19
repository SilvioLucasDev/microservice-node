export interface MakePayment {
  makePayment: (input: MakePayment.Input) => Promise<MakePayment.Output>
}

export namespace MakePayment {
  export type Input = {
    email: string
    creditCardToken: string
    price: string
  }

  export type Output = {
    tid: string
    status: string
  }
}
