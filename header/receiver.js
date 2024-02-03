const amqp = require("amqplib");
const exchangeName = "headerMessage";

async function receiveHeader() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "headers");
  const queue = await channel.assertQueue("", { exclusive: true });
  await channel.bindQueue(queue.queue, exchangeName, "", {
    sender: "haj mamad",
    price: 100,
    "x-match": "any",
  });
  console.log("waiting for header message");
  channel.consume(queue.queue, (msg) => {
    console.log(msg.content.toString());
    console.log(msg.properties.headers);
  });
}

receiveHeader();
