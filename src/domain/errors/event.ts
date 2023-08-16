export class EventNotFound extends Error {
  constructor () {
    super('Event not found')
    this.name = 'EventNotFound'
  }
}
