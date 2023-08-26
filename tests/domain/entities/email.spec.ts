import { Email } from '@/domain/entities'

describe('EmailEntity', () => {
  let sut: Email

  it('should return instance of Email with correct values when status of ticket is approved', () => {
    sut = Email.create({ ticketId: 'any_ticket_id', email: 'any_email', eventName: 'any_event_name', ticketStatus: 'approved' })

    expect(sut).toStrictEqual(new Email(
      'Ticket Purchase | any_event_name',
      'any_email',
      'Hello! <br><br> Ticket payment: any_ticket_id for the any_event_name event was successfully completed!'
    ))
  })

  it('should return instance of Email with correct values when status of ticket is cancelled', () => {
    sut = Email.create({ ticketId: 'any_ticket_id', email: 'any_email', eventName: 'any_event_name', ticketStatus: 'cancelled' })

    expect(sut).toStrictEqual(new Email(
      'Ticket Purchase | any_event_name',
      'any_email',
      'Hello! <br><br> Ticket payment could not be made: any_ticket_id for the any_event_name!'
    ))
  })
})
