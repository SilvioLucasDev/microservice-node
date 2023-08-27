import { ExpressAdapter } from '@/presentation/adapters'
import { env } from '@/main/config/env'

import request from 'supertest'

describe('ExpressRouterAdapter', () => {
  let sut: ExpressAdapter
  let method: string
  let url: string

  beforeAll(() => {
    method = 'post'
    url = '/ticket/purchase'
  })

  beforeEach(() => {
    sut = new ExpressAdapter()
  })

  it('should return with statusCode 200 and valid data', async () => {
    sut.on({
      method,
      url,
      callback: async (params: any, body: any) => ({
        statusCode: 200,
        data: { data: 'any_data' }
      })
    })

    const response = await request(sut.app).post('/v1/api/ticket/purchase').send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ data: 'any_data' })
  })

  it('should return with statusCode 204 and empty data', async () => {
    sut.on({
      method,
      url,
      callback: async (params: any, body: any) => ({
        statusCode: 204,
        data: null
      })
    })

    const response = await request(sut.app).post('/v1/api/ticket/purchase').send()

    expect(response.status).toBe(204)
    expect(response.body).toEqual({ })
  })

  it('should return with statusCode 400 and valid error', async () => {
    sut.on({
      method,
      url,
      callback: async (params: any, body: any) => ({
        statusCode: 400,
        data: new Error('any_error')
      })
    })

    const response = await request(sut.app).post('/v1/api/ticket/purchase').send()

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'any_error' })
  })

  it('should return with statusCode 500 and valid error', async () => {
    sut.on({
      method,
      url,
      callback: async (params: any, body: any) => ({
        statusCode: 500,
        data: new Error('any_error')
      })
    })

    const response = await request(sut.app).post('/v1/api/ticket/purchase').send()

    expect(response.status).toBe(500)
    expect(response.body).toEqual({ error: 'any_error' })
  })

  it('should call method listen with port correct', () => {
    sut.app.listen = jest.fn()

    sut.listen()

    expect(sut.app.listen).toHaveBeenCalledWith(env.port, expect.any(Function))
  })
})
