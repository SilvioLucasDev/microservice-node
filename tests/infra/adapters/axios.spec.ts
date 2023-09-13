import { AxiosClient } from '@/infra/adapters'

import axios from 'axios'

jest.mock('axios')

describe('AxiosClient', () => {
  let url: string
  let params: object

  let sut: AxiosClient
  let axiosMock: jest.Mocked<typeof axios>

  beforeAll(() => {
    url = 'any_url'
    params = { any: 'any' }

    axiosMock = axios as jest.Mocked<typeof axios>
    axiosMock.get.mockResolvedValue({
      status: 200,
      data: 'any_data'
    })
  })

  beforeEach(() => {
    sut = new AxiosClient()
  })

  describe('get', () => {
    it('should call method get of axios with correct values', async () => {
      await sut.get({ url, params })

      expect(axiosMock.get).toHaveBeenCalledWith(url, { params })
      expect(axiosMock.get).toHaveBeenCalledTimes(1)
    })
  })

  it('should return data on success', async () => {
    const result = await sut.get({ url, params })

    expect(result).toEqual('any_data')
  })
})
