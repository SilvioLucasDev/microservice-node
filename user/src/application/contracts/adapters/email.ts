export interface Send {
  send: (input: Send.Input) => Promise<void>
}

export namespace Send {
  export type Input = {
    from: string
    to: string
    subject: string
    body: string
  }
}
