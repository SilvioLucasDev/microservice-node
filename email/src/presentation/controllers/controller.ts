import { type HttpResponse } from '@/presentation/helpers'

export interface Controller {
  handle: (httpRequest: any) => Promise<HttpResponse>
}
