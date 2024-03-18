const amqplib = require('amqplib');

const queueName = "queue2"; //routing key
const msg = process.argv.slice(2).join(" ") ||  "comment";

const sendMsg = async () => {
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, {durable: true});
  channel.sendToQueue(queueName, Buffer.from(msg), {persistant: true});
  console.log('Sent: ', msg);
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500)
}

sendMsg();

