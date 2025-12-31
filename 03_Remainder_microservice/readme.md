# RemainderMicroService

## Overview

RemainderMicroService is a microservice designed to handle email-based reminders and notifications. It is part of the **Auth_Service** project and is built using **Node.js**. This service integrates with RabbitMQ for message brokering, Nodemailer for email delivery, and cron jobs for scheduling tasks.

## Features

- **Email Notifications**:
  - Login Information
  - Payment Information
  - Order Details

- **RabbitMQ Message Broker**: Handles asynchronous communication between services.
- **Nodemailer**: Sends email notifications directly to users.
- **Cron Jobs**:
  - Sends reminders at specific intervals.
  - Updates email statuses to "success" after delivery.
  - Deletes emails with "success" status at different scheduled times.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/RemainderMicroService.git
   ```
2. Navigate to the project directory:
   ```bash
   cd RemainderMicroService
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```
2. The service will be available at `http://localhost:3004`.

## Environment Configuration

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
PORT=3004

EMAIL_ID=your_email@example.com
EMAIL_PASS='your_email_password'
EMAIL_SENDER=your_sender_email@example.com

EXCHANGE_NAME=AUTH_MICROSERVICE
REMINDER_BINDING_KEY=REMINDER_AUTH_SERVICE
MESSAGE_BROKER_URL='amqp://localhost'

CRON_SEND_REMINDERS=*/5 * * * *  # Cron job to send reminders every 5 minutes
CRON_UPDATE_STATUS=*/10 * * * * # Cron job to update email status every 10 minutes
CRON_DELETE_SUCCESS=*/30 * * * * # Cron job to delete success emails every 30 minutes
```

## Workflow

1. **Send Reminders**:
   - Emails are sent for login information, payment details, top 10 movie shows, and ticket details.
   - Scheduled using cron jobs.

2. **Update Email Status**:
   - After successful delivery, email statuses are updated to "success".

3. **Delete Success Emails**:
   - Emails with "success" status are deleted periodically to optimize storage.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License.