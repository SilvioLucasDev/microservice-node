export class ServerError extends Error {
  constructor (error?: Error | undefined) {
    super('Server failed. Try again soon')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class RequiredFieldError extends Error {
  constructor (fieldName: string) {
    super(`The field ${fieldName} is required`)
    this.name = 'RequiredFieldError'
  }
}

export class FieldNotStringError extends Error {
  constructor (fieldName: string) {
    super(`The ${fieldName} field must be a string`)
    this.name = 'FieldNotStringError'
  }
}

export class FieldNotNumberError extends Error {
  constructor (fieldName: string) {
    super(`The ${fieldName} field must be a number`)
    this.name = 'FieldNotNumberError'
  }
}
