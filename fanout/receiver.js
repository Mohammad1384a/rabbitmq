const amqp = require("amqplib");
const exchangeName = "fanoutExchange";

async function receiveFanout() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "fanout");
  const queue = await channel.assertQueue("", { exclusive: true });
  console.log("waiting for fanout message");
  channel.bindQueue(queue.queue, exchangeName, "");
  channel.consume(queue.queue, (msg) => {
    console.log(msg.content.toString());
    channel.ack(msg);
  });
}

receiveFanout();
