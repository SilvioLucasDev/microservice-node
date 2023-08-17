import { PrismaClient } from '@prisma/client'

class PrismaConnection {
  private static instance?: PrismaClient

  private constructor () {
    PrismaConnection.instance = new PrismaClient()
  }

  public static getInstance (): PrismaClient {
    if (PrismaConnection.instance == null) PrismaConnection.instance = new PrismaClient()
    return PrismaConnection.instance
  }
}

export default PrismaConnection.getInstance()
