export interface GetUser {
  get: (input: GetUser.Input) => Promise<GetUser.Output>
}

export namespace GetUser {
  export type Input = {
    id: string
  }

  export type Output = {
    id: string
    name: string
    document: string
    email: string
    zipcode: string
    number: string
    complements: string | null
    mobile_phone: string
  } | undefined
}
