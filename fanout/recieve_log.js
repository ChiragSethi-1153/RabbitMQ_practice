const amqplib = require('amqplib');

const exchangeName = "exchange1";

const recieveMsg = async () => {
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "fanout", {durable: true});
  const q = await channel.assertQueue('', {exclusive: true})
  console.log(`Waiting for messages in queue: ${q.queue}`);
  channel.bindQueue(q.queue, exchangeName, '');
  channel.consume(q.queue, msg => {
    if(msg.content) {
        console.log("The msg is: ", msg.content.toString())
    }
  }, {noAck: true})
}

recieveMsg();