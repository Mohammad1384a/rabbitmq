const amqp = require("amqplib");
const exchangeName = "directMessage";
const [type, message] = process.argv.slice(2);

async function directExchange() {
  console.log(type, message);
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "direct");
  channel.publish(exchangeName, type, Buffer.from(message));
  setTimeout(() => {
    process.exit(0);
  }, 1000);
}

directExchange();
