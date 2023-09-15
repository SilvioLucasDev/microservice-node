import { ExpressAdapter } from '@/presentation/adapters'

import request from 'supertest'
import express, { type Application } from 'express'

describe('ExpressRouterAdapter', () => {
  let method: string
  let url: string
  let port: string

  let sut: ExpressAdapter
  let app: Application

  beforeAll(() => {
    method = 'post'
    url = '/any_url'
    port = 'any_port'
  })

  beforeEach(() => {
    app = express()
    sut = new ExpressAdapter(port, app)
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

    const response = await request(app).post('/v1/api/any_url').send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ data: 'any_data' })
  })

  it('should return with statusCode 202 and empty data', async () => {
    sut.on({
      method,
      url,
      callback: async (params: any, body: any) => ({
        statusCode: 202,
        data: undefined
      })
    })

    const response = await request(app).post('/v1/api/any_url').send()

    expect(response.status).toBe(202)
    expect(response.body).toEqual('')
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

    const response = await request(app).post('/v1/api/any_url').send()

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

    const response = await request(app).post('/v1/api/any_url').send()

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

    const response = await request(app).post('/v1/api/any_url').send()

    expect(response.status).toBe(500)
    expect(response.body).toEqual({ error: 'any_error' })
  })

  it('should call method listen with port correct', () => {
    app.listen = jest.fn()

    sut.listen()

    expect(app.listen).toHaveBeenCalledWith(port, expect.any(Function))
  })
})
