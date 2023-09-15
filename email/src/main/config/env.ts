export const env = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT ?? 8080,
  rabbitMQUrl: process.env.RABBITMQ_URL ?? '',
  email: {
    host: process.env.EMAIL_HOST ?? '',
    port: process.env.EMAIL_PORT ?? 2525,
    user: process.env.EMAIL_USER ?? '',
    pass: process.env.EMAIL_PASS ?? ''
  }
}
