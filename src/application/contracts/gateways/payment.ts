export interface MakePayment {
  makePayment: (input: MakePayment.Input) => Promise<void>
}

export namespace MakePayment {
  export type Input = {
    email: string
    creditCardToken: string
    price: number
  }

  export type Output = {
    tid: string
    status: string
  }
}
