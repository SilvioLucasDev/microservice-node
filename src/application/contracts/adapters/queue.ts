export interface Publish {
  publish: (input: Publish.Input) => Promise<void>
}

export namespace Publish {
  export type Input = {
    queueName: string
    data: any
  }
}
