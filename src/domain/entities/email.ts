export class Email {
  constructor (
    readonly subject: string,
    readonly email: string,
    readonly body: string
  ) {}

  static create ({ ticketId, ticketStatus, paymentType, url, email, eventName }: Input): Email {
    let body = ''
    switch (ticketStatus) {
      case 'reserved':
        body = `
            Hello! <br><br> The request to purchase ticket: ${ticketId} for the ${eventName} event was successfully received! <br><br>
            ${
              paymentType === 'billet'
                ? `To finish making the payment <a href="${url}">Billet</a>`
                : `To view purchase details <a href="${url}">click here</a>`
            }
          `
        break
      case 'approved':
        body = `
          Hello! <br><br> Ticket payment: ${ticketId} for event ${eventName} was successful!
          To view purchase details <a href="${url}">click here</a>
        `
        break
      case 'cancelled':
        body = `Hello! <br><br> Ticket payment could not be made: ${ticketId} for the ${eventName} event!`
        break
    }
    const subject = `Ticket Purchase | ${eventName}`
    return new Email(subject, email, body)
  }
}

type Input = {
  ticketId: string
  ticketStatus: string
  paymentType: string
  url: string
  email: string
  eventName: string
}
