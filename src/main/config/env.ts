export const env = {
  port: process.env.PORT ?? 8080,
  emailSender: process.env.EMAIL_SENDER ?? '',
  email: {
    host: process.env.EMAIL_HOST ?? '',
    port: process.env.EMAIL_PORT ?? 2525,
    user: process.env.EMAIL_USER ?? '',
    pass: process.env.EMAIL_PASS ?? ''
  }
}
