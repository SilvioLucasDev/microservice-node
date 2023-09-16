# microservice-node
Microserviço em Node.js que utiliza RabbitMQ para mensageria, Mailtrap para envio de e-mails e Asaas como gateway de pagamento. Utiliza banco de dados relacional Postgres com Prisma como ORM. O projeto foi desenvolvido desenvolvido seguindo a metodologia TDD (Test-Driven Development) e aplicando os princípios SOLID, Clean Architecture e Design Patterns para resolver desafios comuns de desenvolvimento.

> ## Bibliotecas, Ferramentas e Serviços

* NPM
* Node
* AmqpLib (RabbitMQ)
* NodeMailer (Mailtrap)
* Asaas (Gateway de Pagamento)
* Swagger
* Typescript
* Git
* Jest
* Ts-Jest
* Jest-Mock-Extended
* MockDate
* Prisma
* UUID
* Axios
* Postgres
* Express
* Cors
* Supertest
* Eslint
* Standard Javascript Style
* Rimraf
* Module-Alias
* Npm Check
* DotEnv
* Ts-Node-Dev

> ## Metodologias e Designs

* TDD
* Clean Architecture
* SOLID
* Clean Code
* GitFlow
* Use Cases
* KISS (Keep It Simple, Stupid)
* YAGNI (You Aren't Gonna Need It)
* DRY (Don't Repeat Yourself)

> ## Design Patterns

* Factory
* Singleton
* Builder
* Composite
* Dependency Injection
* Adapter

> ## Componentes

O projeto é composto por quatro aplicações independentes, cada uma com sua responsabilidade específica:

**1 - Email:** Responsável pelo envio de e-mails.
<br>**2 - Event:** Responsável por criar o ingresso e chamar o serviço de pagamento.
<br>**3 - Payment:** Responsável por realizar o pagamento integrando com gateways de pagamento.
<br>**4 - User:** Lida com informações de usuário.


> ## Documentação
As aplicações que possuem rotas foram documentadas com Swagger, é possível acessa-las nos seguintes links:

Documentação do Event: `http://localhost:8080/api-docs/`
<br>Documentação do Payment: `http://localhost:8081/api-docs/`
<br>Documentação do User: `http://localhost:8082/api-docs/`
