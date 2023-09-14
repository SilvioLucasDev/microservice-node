import { type PostClient, type GetClient, type MakePayment } from '@/application/contracts/adapters'

export class AsaasGateway implements MakePayment {
  private readonly baseUrl = 'https://sandbox.asaas.com/api/v3'

  constructor (
    private readonly httpClient: GetClient & PostClient,
    private readonly apiKey: string
  ) { }

  async makePayment ({ transactionId, user, card, total, paymentType, installments, dueDate }: MakePayment.Input): Promise<MakePayment.Output> {
    try {
      const client = await this.getClient(user)
      const transactionData = {
        customer: client,
        billingType: this.paymentTypeMap(paymentType),
        value: total,
        dueDate,
        description: 'SLDSTickets - JavaScript Global Summit', // TODO: pegar o name do evento e colocar aqui
        externalReference: transactionId,
        postalService: false,
        authorizeOnly: false
      }
      if (paymentType === 'credit_card') {
        Object.assign(transactionData, {
          installmentCount: installments,
          installmentValue: installments !== null ? total / installments : total,
          creditCardToken: card?.token
        })
      }
      const response = await this.httpClient.post({
        url: `${this.baseUrl}/payments`,
        data: transactionData,
        headers: { access_token: this.apiKey }
      })
      const status = this.statusMap(response.status)
      return { transactionId: response.id, status, url: response.invoiceUrl, processorResponse: JSON.stringify(response) }
    } catch (error) {
      return { transactionId: '', status: 'error', url: '', processorResponse: JSON.stringify(error) }
    }
  }

  private async getClient (user: MakePayment.User): Promise<string> {
    const response = await this.httpClient.get({
      url: `${this.baseUrl}/customers?cpfCnpj=${user!.document}`,
      headers: { access_token: this.apiKey }
    })
    return response.data.length > 0 ? response.data[0].id : await this.registerClient(user)
  }

  // TODO: Quando for receber os dados do usuário via get consigo tirar os " ! "
  private async registerClient (user: MakePayment.User): Promise<string> {
    const registerData = {
      name: user!.name,
      email: user!.email,
      mobilePhone: user!.mobilePhone,
      cpfCnpj: user!.document,
      postalCode: user!.zipcode,
      address: user!.address,
      addressNumber: user!.number,
      complement: user!.complement,
      province: user!.neighborhood,
      externalReference: user!.id,
      notificationDisabled: false
    }
    const response = await this.httpClient.post({
      url: `${this.baseUrl}/customers`,
      data: registerData,
      headers: { access_token: this.apiKey }
    })
    return response.id
  }

  private statusMap (status: string): string {
    const statusMap: Record<string, string> = {
      AWAITING_RISK_ANALYSIS: 'processing',
      PENDING: 'pending',
      CONFIRMED: 'approved',
      REFUNDED: 'refunded'
    }
    return statusMap[status]
  }

  private paymentTypeMap (paymentType: string): string {
    const paymentTypeMap: Record<string, string> = {
      credit_card: 'CREDIT_CARD',
      billet: 'BOLETO'
    }
    return paymentTypeMap[paymentType]
  }
}
