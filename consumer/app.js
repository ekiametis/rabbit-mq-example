const amqp = require('./amqp/amqp');

const AMQP_URI = process.env.AMQP_URI;
const CHANNEL_NAME = process.env.CHANNEL_NAME;
const QUEUE_NAME = process.env.QUEUE_NAME;

amqp.setup(AMQP_URI);
amqp.createChannel(CHANNEL_NAME, QUEUE_NAME);

amqp.getChannel(CHANNEL_NAME).addSetup(function(channel) {
    channel.consume(QUEUE_NAME, (msg) => {
        let json = JSON.parse(msg.content.toString())
        const consumingDate = Date.now();
        const sentDate = json.sentDate;
        const elapsed = ((consumingDate - sentDate));
        console.log(`The message '${json.message}' comes and delayed ${elapsed} milliseconds.`)
    }, { noAck: true , exclusive: false })
});