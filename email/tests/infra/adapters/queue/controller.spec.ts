import { QueueController } from '@/infra/adapters/queue'
import { type Publish, type Consume } from '@/application/contracts/adapters'

import { type MockProxy, mock } from 'jest-mock-extended'

describe('QueueController', () => {
  let queue: MockProxy<Consume & Publish>

  beforeAll(() => {
    queue = mock()
  })

  beforeEach(() => {
    new QueueController(queue)
  })

  it('should call method consume of QueueAdapter with correct values', async () => {
    expect(queue.consume).toHaveBeenCalledWith({ queueName: 'ticketProcessed', callback: expect.any(Function) })
    expect(queue.consume).toHaveBeenCalledTimes(1)
  })
})
