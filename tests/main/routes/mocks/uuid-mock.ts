import { type UUIDGenerator } from '@/application/contracts/adapters'

export class UUIDAdapterMock implements UUIDGenerator {
  uuid (): string {
    return 'any_uuid'
  }
}
