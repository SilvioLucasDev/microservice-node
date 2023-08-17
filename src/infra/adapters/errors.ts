export class QueueConnectionError extends Error {
  constructor () {
    super('Connection failed')
    this.name = 'QueueConnectionError'
  }
}
