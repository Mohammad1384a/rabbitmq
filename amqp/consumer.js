const amqp = require("amqplib");
const queueName = "speak";

async function recieaveMessage() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: true });
  console.log("waiting for message...");
  channel.consume(queueName, (msg) => {
    setTimeout(() => {
      console.log(msg.content.toString());
      channel.ack(msg);
    }, 2000);
  });
}

recieaveMessage();
