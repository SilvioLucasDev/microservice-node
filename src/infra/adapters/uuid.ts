import { type UUIDGenerator } from '@/domain/contracts/adapters'

import { v4 } from 'uuid'

export class UUIDAdapter implements UUIDGenerator {
  uuid (): UUIDGenerator.Output {
    return v4()
  }
}
