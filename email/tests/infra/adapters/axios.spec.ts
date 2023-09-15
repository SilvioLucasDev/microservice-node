import { AxiosAdapter } from '@/infra/adapters'

import axios from 'axios'

jest.mock('axios')

describe('AxiosAdapter', () => {
  let url: string
  let headers: object
  let params: object
  let data: object

  let sut: AxiosAdapter
  let axiosMock: jest.Mocked<typeof axios>

  beforeAll(() => {
    url = 'any_url'
    headers = { any: 'any' }
    params = { any: 'any' }
    data = { any: 'any' }

    axiosMock = axios as jest.Mocked<typeof axios>
    axiosMock.get.mockResolvedValue({
      status: 200,
      data: 'any_data'
    })

    axiosMock.post.mockResolvedValue({
      status: 200,
      data: 'any_data'
    })
  })

  beforeEach(() => {
    sut = new AxiosAdapter()
  })

  describe('get', () => {
    it('should call method get of axios with correct values', async () => {
      await sut.get({ url, params, headers })

      expect(axiosMock.get).toHaveBeenCalledWith(url, { headers, params })
      expect(axiosMock.get).toHaveBeenCalledTimes(1)
    })

    it('should return data on success', async () => {
      const result = await sut.get({ url, params, headers })

      expect(result).toEqual('any_data')
    })

    it('should rethrows if get throws', async () => {
      axiosMock.get.mockRejectedValueOnce(new Error('http_error'))

      const promise = sut.get({ url, params, headers })

      await expect(promise).rejects.toThrow(new Error('http_error'))
    })
  })

  describe('post', () => {
    it('should call method post of axios with correct values', async () => {
      await sut.post({ url, data, headers })

      expect(axiosMock.post).toHaveBeenCalledWith(url, data, { headers })
      expect(axiosMock.post).toHaveBeenCalledTimes(1)
    })

    it('should return data on success', async () => {
      const result = await sut.post({ url, data, headers })

      expect(result).toEqual('any_data')
    })

    it('should rethrows if post throws', async () => {
      axiosMock.post.mockRejectedValueOnce(new Error('http_error'))
      const promise = sut.post({ url, data, headers })

      await expect(promise).rejects.toThrow(new Error('http_error'))
    })
  })
})
