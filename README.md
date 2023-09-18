# microservice-node
Microserviço em Node.js que utiliza RabbitMQ para mensageria, Mailtrap para envio de e-mails e Asaas como gateway de pagamento. Utiliza banco de dados relacional Postgres com Prisma como ORM. O projeto foi desenvolvido desenvolvido seguindo a metodologia TDD (Test-Driven Development) e aplicando os princípios SOLID, Clean Architecture e Design Patterns para resolver desafios comuns de desenvolvimento.

Para ter uma ideia mais concreta do projeto, você pode assistir a um vídeo demonstrando o fluxo de compra de ingressos por boleto [aqui](https://youtu.be/i4mEDs2KDvk?si=XQTRArN0_zesnPr_
)


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
As aplicações que possuem rotas foram documentadas com Swagger. Você pode acessar a documentação na seguinte URL: `http://localhost:{PORTA}/api-docs/`

> ## Executando a Aplicação

### Com Docker
 **1 - Docker:** Certifique-se de ter o Docker instalado em sua máquina.
 <br> **2 - Env:** Renomeie os arquivos .env.example para .env e configure-os de acordo.
 <br> **3 - Iniciar Docker:** Na raiz do projeto, execute o comando `docker compose up`

### Sem Docker
Certifique-se de ter o PostgreSQL, RabbitMQ e o NodeJs instalados em sua máquina.
#### Dentro do diretório de cada serviço, siga os seguintes passos:
**1 - Env:** Renomeie os arquivos .env.example para .env e configure-os de acordo.
<br> **2 - Instalação de Dependências:**  Execute `npm install` para instalar todas as dependências necessárias.
<br> **3 - Migrations e Seed:** Execute `npx prisma migrate dev` para rodar as migrations e a seed do banco de dados.
<br> **4 - Executando o Servidor:** Execute `npm run dev` para iniciar o servidor na porta especificada no .env e todos os serviços da aplicação.
<br> **5 - Testes:** Para rodar os testes unitários, execute `npm run test:unit`. Para os testes de integração e E2E, execute `npm run test:integration`.
