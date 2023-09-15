import { type GetUser } from '@/application/contracts/repositories'

export class GetUserUseCase {
  constructor (
    private readonly userRepository: GetUser
  ) {}

  async execute ({ userId }: Input): Promise<Output> {
    return await this.userRepository.get({ id: userId })
  }
}

type Input = {
  userId: string
}

type Output = object | undefined
