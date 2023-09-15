export class CardNotFoundError extends Error {
  constructor () {
    super('Card not found')
    this.name = 'CardNotFoundError'
  }
}
