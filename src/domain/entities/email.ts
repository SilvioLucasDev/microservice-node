export class Email {
  constructor (
    private readonly subject: string,
    private readonly email: string,
    private readonly body: string
  ) {
  }

  static create ({ ticketId, email, event, ticketStatus }: Input): Email {
    let body
    if (ticketStatus === 'approved') {
      body = `Olá, tudo bem?! <br><br> O pagamento do ticket: ${ticketId} para o evento ${event} foi realizado com sucesso!`
    } else {
      body = `Olá, tudo bem?! <br><br> Não foi possível realizar o pagamento do ticket: ${ticketId} para o evento ${event}`
    }
    const subject = `Ticket Purchase | ${event}`
    return new Email(subject, email, body)
  }
}

type Input = {
  ticketId: string
  email: string
  event: string
  ticketStatus: string
}
