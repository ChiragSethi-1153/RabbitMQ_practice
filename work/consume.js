const amqplib = require('amqplib');

const queueName = "queue2";

const recieveMsg = async () => {
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, {durable: true});
  channel.prefetch(1)
  console.log(`Waiting for messages in queue: ${queueName}`);
  channel.consume(queueName, msg => {
    const secs = msg.content.toString().split(".").length - 1
    console.log("[X] Received:", msg.content.toString());
    setTimeout(() => {
        console.log("Done")
        channel.ack(msg)  
    }
        , secs*1000)
  }, {noAck: false})
}

recieveMsg();