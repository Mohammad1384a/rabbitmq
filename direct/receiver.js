const amqp = require("amqplib");
const exchangeName = "directMessage";
const type = process.argv.slice(2);

async function receiveDirect() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "direct");
  const queue = await channel.assertQueue("", { exclusive: true });
  for (const patern of type) {
    channel.bindQueue(queue.queue, exchangeName, patern);
  }
  channel.consume(queue.queue, (msg) => {
    console.log(msg.content.toString());
  });
}

receiveDirect();
