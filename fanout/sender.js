const amqp = require("amqplib");
const exchangeName = "fanoutExchange";

async function exchangeFanout() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "fanout");
  channel.publish(exchangeName, "", Buffer.from("some fanout message"));
  console.log("message sent");
  setTimeout(() => {
    channel.close();
    process.exit(0);
  }, 1500);
}

exchangeFanout();
