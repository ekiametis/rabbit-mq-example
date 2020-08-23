const amqp = require('amqp-connection-manager');

let connection;
let channels = {}

const setup = (uri) => {
    connection = amqp.connect([
        uri,
    ]);

    connection.on('connect', ({connection, url}) => {
        console.log(`AMQP Connected on ${url}`);
    });

    connection.on('disconnect', ({err}) => {
        console.log(`AMQP Disconnected ${err}`);
    });
}

const getConnection = () => {
    return connection;
}

const createChannel = (channelName, queueName, options = { durable: false }) => {
    if(!channels[channelName]) {
        channels[channelName] = connection.createChannel({
            json: true,
            setup: function(channel) {
                return channel.assertQueue(queueName, options);
            }
        });
    }
    return channels[channelName];
}

const getChannel = (channelName) => {
    return channels[channelName];
}

module.exports = {
    setup,
    getConnection,
    createChannel,
    getChannel,
}