import prisma from '@/infra/repositories/postgres/helpers/connection'
import { type GetUser } from '@/application/contracts/repositories'

export class PgUserRepository implements GetUser {
  async get ({ id }: GetUser.Input): Promise<GetUser.Output> {
    const user = await prisma.user.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        document: true,
        email: true,
        mobile_phone: true,
        addresses: {
          select: {
            zipcode: true,
            number: true,
            complements: true
          }
        }
      }
    })
    if (user !== null && user !== undefined) {
      return {
        id: user.id,
        name: user.name,
        document: user.document,
        email: user.email,
        zipcode: user.addresses[0].zipcode,
        number: user.addresses[0].number,
        complements: user.addresses[0].complements,
        mobilePhone: user.mobile_phone
      }
    }
  }
}
