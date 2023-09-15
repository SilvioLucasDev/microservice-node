import { type GetClient, type PostClient } from '@/application/contracts/adapters'

import axios, { type AxiosResponse } from 'axios'

export class AxiosAdapter implements GetClient, PostClient {
  async get <T = AxiosResponse> ({ url, params, headers }: GetClient.Input): Promise<T> {
    const result = await axios.get(url, { params, headers })
    return result.data
  }

  async post <T = AxiosResponse>({ url, data, headers }: PostClient.Input): Promise<T> {
    const result = await axios.post(url, data, { headers })
    return result.data
  }
}
