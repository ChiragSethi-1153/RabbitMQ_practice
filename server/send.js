const amqplib = require("amqplib")

const quename = "hello"
const msg = "hello world"

const sendMsg = async () => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(quename, {durable: false})
}

sendMsg();