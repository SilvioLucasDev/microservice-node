export const env = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT ?? 8080,
  RabbitMQUrl: process.env.RABBITMQ_URL ?? '',
  asaas: {
    baseUrl: process.env.ASAAS_URL_API ?? '',
    apiKey: process.env.ASAAS_KEY_API ?? ''
  }
}
