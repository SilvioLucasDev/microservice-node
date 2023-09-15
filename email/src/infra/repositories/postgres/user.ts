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
            address: true,
            number: true,
            complement: true,
            neighborhood: true
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
        mobilePhone: user.mobile_phone,
        zipcode: user.addresses[0].zipcode,
        address: user.addresses[0].address,
        number: user.addresses[0].number,
        complement: user.addresses[0].complement,
        neighborhood: user.addresses[0].neighborhood
      }
    }
  }
}
