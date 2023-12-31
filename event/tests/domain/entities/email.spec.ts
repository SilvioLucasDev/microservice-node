import { Email } from '@/domain/entities'

describe('EmailEntity', () => {
  let ticketId: string
  let ticketStatus: string
  let paymentType: string
  let url: string
  let email: string
  let eventName: string

  let sut: Email

  beforeAll(() => {
    ticketId = 'any_ticket_id'
    ticketStatus = 'reserved'
    paymentType = 'credit_card'
    url = 'any_url'
    email = 'any_email'
    eventName = 'any_event_name'
  })

  it('should return instance of EmailEntity with correct values when status of ticket is reserved and payment type credit_card', () => {
    sut = Email.create({ ticketId, ticketStatus, paymentType, url, email, eventName })

    expect(sut).toStrictEqual(new Email(
      'Ticket Purchase | any_event_name',
      email,
        `
          Hello! <br><br> The request to purchase ticket: any_ticket_id for the any_event_name event was successfully received! <br><br>
          To view purchase details <a href="any_url">click here</a>
        `
    ))
  })

  it('should return instance of EmailEntity with correct values when status of ticket is reserved and payment type billet', () => {
    sut = Email.create({ ticketId, ticketStatus, paymentType: 'billet', url, email, eventName })

    expect(sut).toStrictEqual(new Email(
      'Ticket Purchase | any_event_name',
      email,
        `
          Hello! <br><br> The request to purchase ticket: any_ticket_id for the any_event_name event was successfully received! <br><br>
          To finish making the payment <a href="any_url">Billet</a>
        `
    ))
  })

  it('should return instance of EmailEntity with correct values when status of ticket is approved', () => {
    sut = Email.create({ ticketId, ticketStatus: 'approved', paymentType, url, email, eventName })

    expect(sut).toStrictEqual(new Email(
      'Ticket Purchase | any_event_name',
      email,
        `
          Hello! <br><br> Ticket payment: any_ticket_id for event any_event_name was successful!
          To view purchase details <a href="any_url">click here</a>
        `
    ))
  })

  it('should return instance of EmailEntity with correct values when status of ticket is cancelled', () => {
    sut = Email.create({ ticketId, ticketStatus: 'cancelled', paymentType, url, email, eventName })

    expect(sut).toStrictEqual(new Email(
      'Ticket Purchase | any_event_name',
      email,
      'Hello! <br><br> Ticket payment could not be made: any_ticket_id for the any_event_name event!'
    ))
  })
})
