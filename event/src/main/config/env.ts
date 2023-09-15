export const env = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT ?? 8080,
  RabbitMQUrl: process.env.RABBITMQ_URL ?? '',
  emailSender: process.env.EMAIL_SENDER ?? '',
  userMsUrl: process.env.USER_MICROSERVICE_URL ?? ''
}
