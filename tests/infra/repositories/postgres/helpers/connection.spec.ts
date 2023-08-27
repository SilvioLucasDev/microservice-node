import prisma from '@/infra/repositories/postgres/helpers/connection'

import { type PrismaClient } from '@prisma/client'

describe('PrismaConnection', () => {
  let sut: PrismaClient

  beforeEach(() => {
    sut = prisma
  })

  it('should have only one instance', () => {
    const sut2 = prisma

    expect(sut).toBe(sut2)
  })
})
