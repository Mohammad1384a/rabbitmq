const amqp = require("amqplib");
const queueName = "speak";

async function speakConsumer() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from("test message"), {
    persistent: true,
  });
  console.log("meessage sent to consumer");
}

for (let i = 0; i <= 15; i++) {
  speakConsumer();
}
