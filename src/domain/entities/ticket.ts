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

  approve (): void {
    this.status = 'approved'
  }

  cancel (): void {
    this.status = 'cancelled'
  }
}

type Input = {
  eventId: string
  email: string
}
