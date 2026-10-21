# Lab Task 02: Course Management REST API

## 1. Project Overview

This project is a Course Management REST API built using **NestJS** and **TypeScript**. It demonstrates CRUD operations, DTO-based input validation, validation pipes, and file uploads.

## 2. Technologies Used

- **Framework:** NestJS
- **Language:** TypeScript
- **Runtime and Package Manager:** Node.js and npm
- **Validation:** `class-validator`, `class-transformer`
- **File Upload:** Multer
- **API Testing:** Postman

## 3. Key Features

- Course CRUD operations using `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`.
- DTO validation using `class-validator` and `class-transformer`.
- Global `ValidationPipe` configured with `whitelist`, `forbidNonWhitelisted`, and `transform`.
- File uploads supporting `.jpg`, `.jpeg`, `.png`, and `.pdf` files.
- Maximum file size limit of **2 MB**.
- Postman testing for API requests, input validation, and file upload restrictions.

## 4. Installation and Setup

### Step 1: Install Dependencies

Run the following command in the project directory:

\```bash
npm install
\```

### Step 2: Start the Development Server

Run the following command to start the NestJS development server:

\```bash
npm run start:dev
\```

### Step 3: API Base URL

Once the server is running, the API will be available at:

\```text
http://localhost:3000
\```

## 5. API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| `GET` | `/course` | Retrieve all courses |
| `GET` | `/course/:id` | Retrieve a course by ID |
| `POST` | `/course` | Create a new course |
| `PUT` | `/course/:id` | Update an entire course |
| `PATCH` | `/course/:id` | Partially update a course |
| `DELETE` | `/course/:id` | Delete a course |
| `POST` | `/course/:id/upload` | Upload course material |

## 6. Input Validation

The project uses Data Transfer Objects (DTOs) and a global `ValidationPipe` to validate incoming requests.

### Validation Rules

- **Course Name:** Required.
- **Course Code:** Required.
- **Instructor:** Required.
- **Credits:** Must be a number between `1` and `6`.
- **Description:** Optional.
- **Unknown Properties:** Rejected.

### Global ValidationPipe Configuration

The global `ValidationPipe` uses the following options:

- **`whitelist: true`** — Removes properties that do not have validation decorators.
- **`forbidNonWhitelisted: true`** — Rejects requests containing unknown properties.
- **`transform: true`** — Enables automatic transformation of incoming payloads into the expected DTO types.

## 7. File Upload

Course materials can be uploaded using the following endpoint:

\```http
POST /course/:id/upload
\```

### How to Upload a File Using Postman

1. Select the `POST` method and enter the upload endpoint.
2. Open **Body → form-data**.
3. Add a key named `file`.
4. Change the key type from **Text** to **File**.
5. Select the file you want to upload.
6. Click **Send** to submit the request.

### File Upload Restrictions

- **Allowed Extensions:** `.jpg`, `.jpeg`, `.png`, `.pdf`
- **Maximum File Size:** 2 MB
- **Upload Directory:** `src/uploads`
- **Form-Data Key:** `file`

Files that do not meet the specified restrictions are rejected by the API.

## 8. Testing

The API was tested using Postman to verify CRUD operations, input validation, and file upload restrictions.

### Test Cases

- Course CRUD endpoint requests.
- Valid course creation and updates.
- Missing required fields.
- Invalid credit values.
- Unknown properties in request bodies.
- Valid file uploads.
- Invalid file extensions.
- Upload requests without a file.
- Oversized file uploads.

## 9. Notes

- This project uses example responses and does not persist course data in a database.
- The project demonstrates REST API development, CRUD operations, DTO-based validation, global validation pipes, and file upload handling using NestJS and TypeScript.

---

**Lab Task 02 completed:** Course Management REST API with CRUD operations, input validation, and file upload functionality.



<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Observability

In production applications, observability is essential for understanding how your system behaves, detecting issues early, and maintaining reliable performance.

[NestJS Observe](https://observe.nestjs.com) automatically instruments your NestJS application, giving you deep visibility into your system with minimal setup:

- **Distributed tracing:** Follow requests across services and understand how they flow through your system.
- **Waterfall analysis:** Visualize request execution and identify slow operations, bottlenecks, and unexpected delays.
- **Performance analysis:** Analyze application performance in real time and quickly pinpoint areas that need optimization.
- **Metrics:** Track key application and infrastructure metrics to understand system health and performance trends.
- **Logging:** Centralize and correlate logs with traces and other telemetry to make debugging easier.
- **Error tracking:** Detect errors quickly and investigate their root causes with the surrounding context.
- **SLA monitoring:** Track service-level objectives and identify when your application is approaching or exceeding defined thresholds.
- **Alarms and alerts:** Set up alerts for critical errors, performance degradation, SLA violations, and other anomalies so your team can react quickly.

To add it to this project:

```bash
$ npm install @nestjs/observe
```

Then follow the [setup guide](https://docs.nestjs.com/observability/overview) - it takes a single import and an app key.

The free plan needs no payment details and covers 300,000 events a month. You can also browse the [live demo](https://www.observe-demo.nestjs.com/dashboard) first - the whole dashboard over a busy service's data, with nothing to install.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Auto-instrument your application with [NestJS Observe](https://observe.nestjs.com). Distributed tracing, metrics, and logging made easy. Error tracking and performance monitoring for your NestJS applications.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
