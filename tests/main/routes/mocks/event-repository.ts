export class EventRepositoryMock {
  async get ({ id }: any): Promise<any> {
    if (id === 'any_event_id') {
      return { id: 'any_event_id', price: '100' }
    }
    return undefined
  }
}
