export class Email {
  constructor (
    readonly subject: string,
    readonly email: string,
    readonly body: string
  ) {}

  static create ({ ticketId, email, eventName, ticketStatus }: Input): Email {
    let body
    if (ticketStatus === 'approved') {
      body = `Hello! <br><br> Ticket payment: ${ticketId} for the ${eventName} event was successfully completed!`
    } else {
      body = `Hello! <br><br> Ticket payment could not be made: ${ticketId} for the ${eventName}!`
    }
    const subject = `Ticket Purchase | ${eventName}`
    return new Email(subject, email, body)
  }
}

type Input = {
  ticketId: string
  email: string
  eventName: string
  ticketStatus: string
}
