const express = require('express');
const bodyParser = require('body-parser')
const amqp = require('./amqp/amqp');

const app = express();
const port = process.env.PORT;
const AMQP_URI = process.env.AMQP_URI;
const CHANNEL_NAME = process.env.CHANNEL_NAME;
const QUEUE_NAME = process.env.QUEUE_NAME;

amqp.setup(AMQP_URI);
amqp.createChannel(CHANNEL_NAME, QUEUE_NAME)

app.use(bodyParser.json())

app.post('/', async (req, res, next) => {
    const message = req.body.message;
    const sentDate = Date.now();
    amqp.getChannel(CHANNEL_NAME).sendToQueue(QUEUE_NAME, { message, sentDate });
    res.status(200).json({ message })
    next();
});

app.listen(port, () => {
    console.log(`Producer application listening at http://localhost:${port}`)
});