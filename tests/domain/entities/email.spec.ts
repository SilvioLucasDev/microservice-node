import { Email } from '@/domain/entities'

describe('EmailEntity', () => {
  let sut: Email

  it('should return instance of Email with correct values when status of ticket is approved', () => {
    sut = Email.create({ ticketId: 'any_ticket_id', email: 'any_email', eventName: 'any_event_name', ticketStatus: 'approved' })

    expect(sut).toStrictEqual(new Email(
      'Ticket Purchase | any_event_name',
      'any_email',
      'Olá, tudo bem?! <br><br> O pagamento do ticket: any_ticket_id para o evento any_event_name foi realizado com sucesso!'
    ))
  })

  it('should return instance of Email with correct values when status of ticket is cancelled', () => {
    sut = Email.create({ ticketId: 'any_ticket_id', email: 'any_email', eventName: 'any_event_name', ticketStatus: 'cancelled' })

    expect(sut).toStrictEqual(new Email(
      'Ticket Purchase | any_event_name',
      'any_email',
      'Olá, tudo bem?! <br><br> Não foi possível realizar o pagamento do ticket: any_ticket_id para o evento any_event_name'
    ))
  })
})
