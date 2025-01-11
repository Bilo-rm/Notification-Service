Mass Text Messaging System Using Amazon SNS
Overview
The Mass Text Messaging System is a cloud-based solution designed to send bulk text messages to subscribers efficiently. Built on AWS, this system leverages Amazon SNS for message distribution, AWS Lambda for backend processing, DynamoDB for subscriber management, and CloudWatch for monitoring. The frontend is built using React.js and hosted on AWS Amplify.

Features
User Subscription:

Users can subscribe to receive messages via email.

Confirmation emails are sent to verify subscriptions.

Message Broadcasting:

Admins can send broadcast messages to all confirmed subscribers.

Scalable and Reliable:

Built on AWS services for high scalability and reliability.

Monitoring:

Real-time monitoring using Amazon CloudWatch.

Technologies Used
Frontend:

React.js

Tailwind CSS

Backend:

AWS Lambda

Amazon API Gateway

Database:

Amazon DynamoDB

Messaging:

Amazon SNS

Monitoring:

Amazon CloudWatch

Hosting:

AWS Amplify

Setup Instructions
1. Prerequisites
AWS Account (free tier works)

Node.js installed

Git installed

Basic understanding of React and AWS services

2. Backend Setup
2.1 Create SNS Topic
Go to Amazon SNS in the AWS Console.

Create a new topic:

Name: broadcast-messages

Type: Standard

Save the Topic ARN for later use.

2.2 Create DynamoDB Table
Go to DynamoDB in the AWS Console.

Create a new table:

Table Name: message-subscribers

Primary Key: email (String)

2.3 Create Lambda Functions
Create two Lambda functions:

Subscribe Function:

Runtime: Python 3.x

Environment Variables:

SUBSCRIBERS_TABLE: message-subscribers

SNS_TOPIC_ARN: [Your SNS Topic ARN]

Send Message Function:

Runtime: Python 3.x

Environment Variables:

SNS_TOPIC_ARN: [Your SNS Topic ARN]

2.4 Create API Gateway
Create a REST API in API Gateway.

Add two resources:

/subscribe: Triggers the Subscribe Function.

/broadcast: Triggers the Send Message Function.

Enable CORS for both resources.

3. Frontend Setup
3.1 Clone the Repository

bash

git clone https://github.com/Bilo-rm/Notification-Service.git
cd Notification-Service
3.2 Install Dependencies

bash

npm install
3.3 Configure Environment Variables
Create a .env file in the root directory.

Add the following variables:

env

VITE_API_GATEWAY_URL=YOUR_API_GATEWAY_URL
3.4 Run the Frontend

bash

npm run dev
4. Deployment
4.1 Deploy Frontend with AWS Amplify
Push the React project to a GitHub repository.

Go to AWS Amplify in the AWS Console.

Connect the GitHub repository and deploy the frontend.

4.2 Deploy Backend
Deploy the Lambda functions and API Gateway using the AWS Console.

Ensure the API Gateway URL is updated in the frontend .env file.

5. Testing
Subscribe to Notifications:

Visit the Subscribe Page and enter your email.

Verify that you receive a confirmation email.

Send Broadcast Message:

Visit the Admin Page and send a test message.

Verify that the message is received by subscribers.

6. Monitoring
Go to Amazon CloudWatch in the AWS Console.

Monitor message delivery metrics and error logs.
