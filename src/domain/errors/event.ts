export class EventNotFoundError extends Error {
  constructor () {
    super('Event not found')
    this.name = 'EventNotFoundError'
  }
}
