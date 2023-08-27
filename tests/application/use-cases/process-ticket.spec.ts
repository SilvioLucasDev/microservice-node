import { ProcessTicketUseCase } from '@/application/use-cases'
import { type FindDetailsByIdTicket, type UpdateStatusTicket } from '@/application/contracts/repositories'
import { Email } from '@/domain/entities'
import { TicketProcessed } from '@/domain/event'
import { type Publish } from '@/application/contracts/adapters'
import { env } from '@/main/config/env'

import { mock, type MockProxy } from 'jest-mock-extended'

jest.mock('@/domain/event/ticket-processed')

describe('ProcessTicketUseCase', () => {
  let sut: ProcessTicketUseCase
  let ticketRepository: MockProxy<UpdateStatusTicket & FindDetailsByIdTicket>
  let emailEntity: jest.SpyInstance
  let queue: MockProxy<Publish>
  let ticketId: string
  let email: string
  let status: string

  beforeAll(() => {
    ticketRepository = mock()
    ticketRepository.findDetailsById.mockResolvedValue({ email: 'any_email', eventName: 'any_event_name' })
    emailEntity = jest.spyOn(Email, 'create')
    queue = mock()
    ticketId = 'any_ticket_id'
    email = 'any_email'
    status = 'approved'
  })

  beforeEach(() => {
    sut = new ProcessTicketUseCase(ticketRepository, queue)
  })

  it('should calls method updateStatus of TicketRepository with correct value if payment is approved', async () => {
    await sut.execute({ ticketId, status })

    expect(ticketRepository.updateStatus).toHaveBeenCalledWith({ id: ticketId, status })
    expect(ticketRepository.updateStatus).toHaveBeenCalledTimes(1)
  })

  it('should calls method updateStatus of TicketRepository with correct value if payment is approved', async () => {
    await sut.execute({ ticketId, status: 'rejected' })

    expect(ticketRepository.updateStatus).toHaveBeenCalledWith({ id: ticketId, status: 'cancelled' })
    expect(ticketRepository.updateStatus).toHaveBeenCalledTimes(1)
  })

  it('should calls method findDetailsById of TicketRepository with correct value', async () => {
    await sut.execute({ ticketId, status })

    expect(ticketRepository.findDetailsById).toHaveBeenCalledWith({ id: ticketId })
    expect(ticketRepository.findDetailsById).toHaveBeenCalledTimes(1)
  })

  it('should calls EmailEntity with correct values', async () => {
    await sut.execute({ ticketId, status })

    expect(emailEntity).toHaveBeenCalledWith({ ticketId, email, eventName: 'any_event_name', ticketStatus: 'approved' })
    expect(emailEntity).toHaveBeenCalledTimes(1)
  })

  it('should calls TicketReserved with correct values', async () => {
    await sut.execute({ ticketId, status })

    expect(TicketProcessed).toHaveBeenCalledWith(
      env.emailSender,
      'any_email',
      'Ticket Purchase | any_event_name',
      'Hello! <br><br> Ticket payment: any_ticket_id for the any_event_name event was successfully completed!'
    )
    expect(TicketProcessed).toHaveBeenCalledTimes(1)
  })

  it('should calls Queue with correct values', async () => {
    await sut.execute({ ticketId, status })

    expect(queue.publish).toHaveBeenCalledWith({ queueName: 'ticketProcessed', data: expect.any(TicketProcessed) })
    expect(queue.publish).toHaveBeenCalledTimes(1)
  })
})
