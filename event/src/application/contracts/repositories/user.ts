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
    mobilePhone: string
    zipcode: string
    address: string
    number: string
    complement: string | null
    neighborhood: string
  } | undefined
}
