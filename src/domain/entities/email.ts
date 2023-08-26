export class Email {
  constructor (
    private readonly subject: string,
    private readonly email: string,
    private readonly body: string
  ) {
  }

  static create ({ ticketId, email, eventName, ticketStatus }: Input): Email {
    let body
    if (ticketStatus === 'approved') {
      body = `Olá, tudo bem?! <br><br> O pagamento do ticket: ${ticketId} para o evento ${eventName} foi realizado com sucesso!`
    } else {
      body = `Olá, tudo bem?! <br><br> Não foi possível realizar o pagamento do ticket: ${ticketId} para o evento ${eventName}`
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
