export interface MakePayment {
  makePayment: (input: MakePayment.Input) => Promise<void>
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
