import { ProcessTicketUseCase } from '@/application/use-cases'
import { type Publish } from '@/application/contracts/adapters'
import { Email, Ticket } from '@/domain/entities'
import { TicketProcessed } from '@/domain/event'
import { type GetUser, type FindDetailsByIdTicket, type UpdateStatusTicket } from '@/application/contracts/repositories'
import { env } from '@/main/config/env'

import { mock, type MockProxy } from 'jest-mock-extended'

jest.mock('@/domain/event/ticket-processed')

describe('ProcessTicketUseCase', () => {
  let ticketId: string
  let paymentType: string
  let url: string
  let userId: string
  let status: string
  let eventName: string
  let id: string
  let name: string
  let document: string
  let email: string
  let zipcode: string
  let number: string
  let complements: string
  let mobilePhone: string

  let sut: ProcessTicketUseCase
  let ticketRepository: MockProxy<UpdateStatusTicket & FindDetailsByIdTicket>
  let userRepository: MockProxy<GetUser>
  let emailEntity: jest.SpyInstance
  let ticketEntity: jest.SpyInstance
  let queue: MockProxy<Publish>

  beforeAll(() => {
    ticketId = 'any_ticket_id'
    paymentType = 'any_payment_type'
    url = 'any_url'
    userId = 'any_user_id'
    status = 'approved'
    eventName = 'any_event_name'
    id = 'any_id'
    name = 'any_name'
    document = 'any_document'
    email = 'any_email'
    zipcode = 'any_zipcode'
    number = 'any_number'
    complements = 'any_complements'
    mobilePhone = 'any_mobile_phone'

    ticketRepository = mock()
    ticketRepository.findDetailsById.mockResolvedValue({ eventName })
    userRepository = mock()
    userRepository.get.mockResolvedValue({ id, name, document, email, zipcode, number, complements, mobile_phone: mobilePhone })
    emailEntity = jest.spyOn(Email, 'create')
    ticketEntity = jest.spyOn(Ticket, 'statusMap')
    queue = mock()
  })

  beforeEach(() => {
    sut = new ProcessTicketUseCase(ticketRepository, userRepository, queue)
  })

  it('should call method statusMap of TicketEntity with correct value', async () => {
    await sut.execute({ ticketId, paymentType, url, userId, status })

    expect(ticketEntity).toHaveBeenCalledWith(status)
    expect(ticketEntity).toHaveBeenCalledTimes(1)
  })

  it('should call method updateStatus of TicketRepository with correct values', async () => {
    await sut.execute({ ticketId, paymentType, url, userId, status })

    expect(ticketRepository.updateStatus).toHaveBeenCalledWith({ id: ticketId, status })
    expect(ticketRepository.updateStatus).toHaveBeenCalledTimes(1)
  })

  it('should call method findDetailsById of TicketRepository with correct value', async () => {
    await sut.execute({ ticketId, paymentType, url, userId, status })

    expect(ticketRepository.findDetailsById).toHaveBeenCalledWith({ id: ticketId })
    expect(ticketRepository.findDetailsById).toHaveBeenCalledTimes(1)
  })

  it('should call method get of UserRepository with correct value', async () => {
    await sut.execute({ ticketId, paymentType, url, userId, status })

    expect(userRepository.get).toHaveBeenCalledWith({ id: userId })
    expect(userRepository.get).toHaveBeenCalledTimes(1)
  })

  it('should call EmailEntity with correct values', async () => {
    await sut.execute({ ticketId, paymentType, url, userId, status })

    expect(emailEntity).toHaveBeenCalledWith({ ticketId, ticketStatus: 'approved', paymentType, url, email, eventName })
    expect(emailEntity).toHaveBeenCalledTimes(1)
  })

  it('should call TicketProcessed with correct values', async () => {
    await sut.execute({ ticketId, paymentType, url, userId, status })

    expect(TicketProcessed).toHaveBeenCalledWith(
      env.emailSender,
      'any_email',
      'Ticket Purchase | any_event_name',
      expect.stringMatching(/Hello! <br><br> Ticket payment: any_ticket_id for event any_event_name was successful!.*/)
    )
    expect(TicketProcessed).toHaveBeenCalledTimes(1)
  })

  it('should call QueueAdapter with correct values', async () => {
    await sut.execute({ ticketId, paymentType, url, userId, status })

    expect(queue.publish).toHaveBeenCalledWith({ queueName: 'ticketProcessed', data: expect.any(TicketProcessed) })
    expect(queue.publish).toHaveBeenCalledTimes(1)
  })
})
