export interface Publish {
  publish: (input: Input) => Promise<void>
}

type Input = {
  queueName: string
  data: any
}
