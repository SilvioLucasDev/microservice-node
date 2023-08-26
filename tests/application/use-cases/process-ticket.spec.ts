import { ProcessTicketUseCase } from '@/application/use-cases'
import { type FindDetailsByIdTicket, type UpdateStatusTicket } from '@/application/contracts/repositories'
import { Email } from '@/domain/entities'
import { TicketProcessed } from '@/domain/event'

import { mock, type MockProxy } from 'jest-mock-extended'
import { env } from '@/main/config/env'

jest.mock('@/domain/event/ticket-processed')

describe('ProcessTicketUseCase', () => {
  let sut: ProcessTicketUseCase
  let ticketRepository: MockProxy<UpdateStatusTicket & FindDetailsByIdTicket>
  let emailEntity: jest.SpyInstance
  let ticketId: string
  let email: string
  let status: string

  beforeAll(() => {
    ticketRepository = mock()
    ticketRepository.findDetailsById.mockResolvedValue({ email: 'any_email', eventName: 'any_event_name' })
    emailEntity = jest.spyOn(Email, 'create')
    ticketId = 'any_ticket_id'
    email = 'any_email'
    status = 'approved'
  })

  beforeEach(() => {
    sut = new ProcessTicketUseCase(ticketRepository)
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
      env.emailService,
      'Ticket Purchase | any_event_name',
      'any_email',
      'Olá, tudo bem?! <br><br> O pagamento do ticket: any_ticket_id para o evento any_event_name foi realizado com sucesso!'
    )
    expect(TicketProcessed).toHaveBeenCalledTimes(1)
  })
})
