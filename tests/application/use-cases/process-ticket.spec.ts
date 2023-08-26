import { ProcessTicketUseCase } from '@/application/use-cases'
import { type FindByIdTicket, type SaveTicket } from '@/application/contracts/repositories'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('ProcessTicketUseCase', () => {
  let sut: ProcessTicketUseCase
  let ticketRepository: MockProxy<SaveTicket & FindByIdTicket>

  let ticketId: string
  let status: string

  beforeAll(() => {
    ticketRepository = mock()
    ticketId = 'any_ticket_id'
    status = 'any_status'
  })

  beforeEach(() => {
    sut = new ProcessTicketUseCase(ticketRepository)
  })

  it('should calls TicketRepository with correct value', async () => {
    await sut.execute({ ticketId, status })

    expect(ticketRepository.findById).toHaveBeenCalledWith({ id: ticketId })
    expect(ticketRepository.findById).toHaveBeenCalledTimes(1)
  })
})
