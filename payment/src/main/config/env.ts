export const env = {
  port: process.env.PORT ?? 8080,
  rabbitMQUrl: process.env.RABBITMQ_URL ?? '',
  asaas: {
    baseUrl: process.env.ASAAS_URL_API ?? '',
    apiKey: process.env.ASAAS_KEY_API ?? ''
  },
  userMsUrl: process.env.USER_MICROSERVICE_URL ?? ''
}
