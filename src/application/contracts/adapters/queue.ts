export interface Publish {
  publish: (input: Publish.Input) => Promise<void>
}

export namespace Publish {
  export type Input = {
    queueName: string
    data: any
  }
}

export interface Consume {
  consume: (input: Consume.Input) => Promise<void>
}

export namespace Consume {
  export type Input = {
    queueName: string
    callback: (arg: any) => Promise<void>
  }
}
