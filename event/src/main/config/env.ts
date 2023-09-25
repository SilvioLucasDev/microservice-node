export const env = {
  port: process.env.PORT ?? 8080,
  rabbitMQUrl: process.env.RABBITMQ_URL ?? '',
  emailSender: process.env.EMAIL_SENDER ?? '',
  userMsUrl: process.env.USER_MICROSERVICE_URL ?? ''
}
