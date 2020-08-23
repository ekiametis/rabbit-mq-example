This project consists in up producer and consumer applications written in NodeJS to send and receive a message through a queue using AMQP protocol and RabbitMQ.

There is a folder called **artillery** where you can test some requests per second. To do this you need to execute **npm install** command to install artillery locally. So then you can run **npm test** to execute artillery test.

# Steps to run this project

1. docker-compose build
2. docker-compose --compatibility up -d

**NOTE**: `By default the docker-compose services are configured to up in replication mode with 4 instances of either producer and consumer services.`

# Exposed Ports

You can consume the producer endpoint at (**POST**) `http://localhost:4000`

# Producer

Producer application exposes an endpoint on root **/** that waits a message in JSON format (using **Content-Type**:**application/json** as MIME Type) and { "message": "some-message" } as Request Payload. When the request comes the message will be send to the RabbitMQ Queue.

# Consumer

Consumer application just consumes the messages on queue.

# Nginx

NGINX is the load balancer to configure replicas and keep many containers running and forward the requests to the producer instances.

# RabbitMQ

RabbitMQ will run in management mode and you can access the console open a tab on the browser through `http://localhost:8080` passing `admin` user and `admin` password.