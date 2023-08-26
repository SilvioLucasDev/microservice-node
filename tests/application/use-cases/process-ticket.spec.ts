import { ProcessTicketUseCase } from '@/application/use-cases'
import { type UpdateStatusTicket } from '@/application/contracts/repositories'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('ProcessTicketUseCase', () => {
  let sut: ProcessTicketUseCase
  let ticketRepository: MockProxy<UpdateStatusTicket>
  let ticketId: string

  beforeAll(() => {
    ticketRepository = mock()
    ticketId = 'any_ticket_id'
  })

  beforeEach(() => {
    sut = new ProcessTicketUseCase(ticketRepository)
  })

  it('should calls TicketRepository with correct value if payment is approved', async () => {
    await sut.execute({ ticketId, status: 'approved' })

    expect(ticketRepository.updateStatus).toHaveBeenCalledWith({ id: ticketId, status: 'approved' })
    expect(ticketRepository.updateStatus).toHaveBeenCalledTimes(1)
  })

  it('should calls TicketRepository with correct value if payment is approved', async () => {
    await sut.execute({ ticketId, status: 'rejected' })

    expect(ticketRepository.updateStatus).toHaveBeenCalledWith({ id: ticketId, status: 'cancelled' })
    expect(ticketRepository.updateStatus).toHaveBeenCalledTimes(1)
  })
})
