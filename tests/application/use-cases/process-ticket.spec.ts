import { ProcessTicketUseCase } from '@/application/use-cases'
import { type FindDetailsByIdTicket, type UpdateStatusTicket } from '@/application/contracts/repositories'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('ProcessTicketUseCase', () => {
  let sut: ProcessTicketUseCase
  let ticketRepository: MockProxy<UpdateStatusTicket & FindDetailsByIdTicket>
  let ticketId: string
  let email: string

  beforeAll(() => {
    ticketRepository = mock()
    ticketId = 'any_ticket_id'
    email = 'any_email'
  })

  beforeEach(() => {
    sut = new ProcessTicketUseCase(ticketRepository)
  })

  it('should calls method updateStatus of TicketRepository with correct value if payment is approved', async () => {
    await sut.execute({ ticketId, status: 'approved', email })

    expect(ticketRepository.updateStatus).toHaveBeenCalledWith({ id: ticketId, status: 'approved' })
    expect(ticketRepository.updateStatus).toHaveBeenCalledTimes(1)
  })

  it('should calls method updateStatus of TicketRepository with correct value if payment is approved', async () => {
    await sut.execute({ ticketId, status: 'rejected', email })

    expect(ticketRepository.updateStatus).toHaveBeenCalledWith({ id: ticketId, status: 'cancelled' })
    expect(ticketRepository.updateStatus).toHaveBeenCalledTimes(1)
  })

  it('should calls method findDetailsById of TicketRepository with correct value', async () => {
    await sut.execute({ ticketId, status: 'approved', email })

    expect(ticketRepository.findDetailsById).toHaveBeenCalledWith({ id: ticketId })
    expect(ticketRepository.findDetailsById).toHaveBeenCalledTimes(1)
  })
})
