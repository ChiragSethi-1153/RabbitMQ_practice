const amqplib = require('amqplib');

const exchangeName = "exchange1"; //routing key
const msg = process.argv.slice(2).join(" ") ||  "comment";

const sendMsg = async () => {
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "fanout", {durable: true});
  channel.publish(exchangeName,  "", Buffer.from(msg), {persistant: true});
  console.log('Sent: ', msg);
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500)
}

sendMsg();

