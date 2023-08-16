export interface EventRepository {
  get: (input: Input) => Promise<Output>
}
type Input = {
  id: string
}

type Output = {
  id: string
  price: string
}
