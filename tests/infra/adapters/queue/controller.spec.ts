/* eslint-disable no-new */
import { type Consume } from '@/application/contracts/adapters'
import { QueueController } from '@/infra/adapters/queue'

import { type MockProxy, mock } from 'jest-mock-extended'

describe('QueueController', () => {
  let queue: MockProxy<Consume>

  beforeAll(() => {
    queue = mock()
  })

  beforeEach(() => {
    new QueueController(queue)
  })

  it('should call method consume of QueueAdapter with correct values', async () => {
    expect(queue.consume).toHaveBeenCalledWith({ queueName: 'ticketReserved', callback: expect.any(Function) })
    expect(queue.consume).toHaveBeenCalledTimes(1)
  })
})
