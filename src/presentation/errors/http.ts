export class ServerError extends Error {
  constructor (error?: Error | undefined) {
    super('Server failed. Try again soon')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class RequiredFieldError extends Error {
  constructor (fieldName?: string) {
    const message = fieldName === undefined
      ? 'Field required'
      : `The field ${fieldName} is required`
    super(message)
    this.name = 'RequiredFieldError'
  }
}
