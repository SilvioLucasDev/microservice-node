import { type UUIDGenerator } from '@/application/contracts/adapters'

export class Ticket {
  constructor (
    readonly id: string,
    readonly eventId: string,
    readonly email: string,
    public status: string
  ) {}

  static create ({ eventId, email }: Input, crypto: UUIDGenerator): Ticket {
    const id = crypto.uuid()
    const initialStatus = 'reserved'
    return new Ticket(id, eventId, email, initialStatus)
  }

  static approve (): string {
    return 'approved'
  }

  static cancel (): string {
    return 'cancelled'
  }
}

type Input = {
  eventId: string
  email: string
}
