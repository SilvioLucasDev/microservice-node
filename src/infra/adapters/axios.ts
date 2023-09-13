import { type GetClient } from '@/application/contracts/adapters'

import axios, { type AxiosResponse } from 'axios'

export class AxiosClient implements GetClient {
  async get <T = AxiosResponse> ({ params, url }: GetClient.Input): Promise<T> {
    const result = await axios.get(url, { params })
    return result.data
  }
}
