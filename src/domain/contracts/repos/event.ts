export interface GetEvent {
  get: (input: Input) => Promise<Output>
}
type Input = {
  id: string
}

type Output = {
  id: string
  price: string
} | undefined
