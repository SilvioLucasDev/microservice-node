export const env = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT ?? 8080,
  emailSender: process.env.EMAIL_SENDER ?? '',
  RabbitMQUrl: process.env.RABBITMQ_URL ?? ''
}
