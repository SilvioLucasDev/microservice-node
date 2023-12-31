import { type FindDetailsByIdTicket, type UpdateStatusTicket } from '@/application/contracts/repositories'
import { ProcessTicketUseCase } from '@/application/use-cases'
import { type GetClient, type Publish } from '@/application/contracts/adapters'
import { Email, Ticket } from '@/domain/entities'
import { TicketProcessed } from '@/domain/event'

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
  let mobilePhone: string
  let zipcode: string
  let address: string
  let number: string
  let complement: string
  let neighborhood: string
  let ticketStatus: string
  let userMsUrl: string
  let emailSender: string

  let sut: ProcessTicketUseCase
  let ticketRepository: MockProxy<UpdateStatusTicket & FindDetailsByIdTicket>
  let httpClient: MockProxy<GetClient>
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
    mobilePhone = 'any_mobile_phone'
    zipcode = 'any_zipcode'
    address = 'any_address'
    number = 'any_number'
    complement = 'any_complement'
    neighborhood = 'any_neighborhood'
    ticketStatus = 'approved'
    userMsUrl = 'any_url'
    emailSender = 'any_sender'

    emailEntity = jest.spyOn(Email, 'create')
    ticketEntity = jest.spyOn(Ticket, 'statusMap')
    ticketRepository = mock()
    ticketRepository.findDetailsById.mockResolvedValue({ eventName, userId })
    httpClient = mock()
    httpClient.get.mockResolvedValue({ id, name, document, email, mobilePhone, zipcode, address, number, complement, neighborhood })
    queue = mock()
  })

  beforeEach(() => {
    sut = new ProcessTicketUseCase(userMsUrl, emailSender, ticketRepository, httpClient, queue)
  })

  it('should call method statusMap of TicketEntity with correct value', async () => {
    await sut.execute({ ticketId, paymentType, url, status })

    expect(ticketEntity).toHaveBeenCalledWith(status)
    expect(ticketEntity).toHaveBeenCalledTimes(1)
  })

  it('should call method updateStatus of TicketRepository with correct values', async () => {
    await sut.execute({ ticketId, paymentType, url, status })

    expect(ticketRepository.updateStatus).toHaveBeenCalledWith({ id: ticketId, status })
    expect(ticketRepository.updateStatus).toHaveBeenCalledTimes(1)
  })

  it('should call method findDetailsById of TicketRepository with correct value', async () => {
    await sut.execute({ ticketId, paymentType, url, status })

    expect(ticketRepository.findDetailsById).toHaveBeenCalledWith({ id: ticketId })
    expect(ticketRepository.findDetailsById).toHaveBeenCalledTimes(1)
  })

  it('should call method get of HttpClient with correct value', async () => {
    await sut.execute({ ticketId, paymentType, url, status })

    expect(httpClient.get).toHaveBeenCalledWith({ url: `${userMsUrl}/users/${userId}` })
    expect(httpClient.get).toHaveBeenCalledTimes(1)
  })

  it('should call EmailEntity with correct values', async () => {
    await sut.execute({ ticketId, paymentType, url, status })

    expect(emailEntity).toHaveBeenCalledWith({ ticketId, ticketStatus, paymentType, url, email, eventName })
    expect(emailEntity).toHaveBeenCalledTimes(1)
  })

  it('should call TicketProcessed with correct values', async () => {
    await sut.execute({ ticketId, paymentType, url, status })

    expect(TicketProcessed).toHaveBeenCalledWith(
      emailSender,
      email,
      'Ticket Purchase | any_event_name',
      expect.stringMatching(/Hello! <br><br> Ticket payment: any_ticket_id for event any_event_name was successful!.*/)
    )
    expect(TicketProcessed).toHaveBeenCalledTimes(1)
  })

  it('should call QueueAdapter with correct values', async () => {
    await sut.execute({ ticketId, paymentType, url, status })

    expect(queue.publish).toHaveBeenCalledWith({ queueName: 'ticketProcessed', data: expect.any(TicketProcessed) })
    expect(queue.publish).toHaveBeenCalledTimes(1)
  })
})
