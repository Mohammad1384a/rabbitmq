const amqp = require("amqplib");
const exchangeName = "headerMessage";

async function sendHeader() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "headers");
  channel.publish(exchangeName, "", Buffer.from("some header message"), {
    headers: {
      sender: "haj mamad",
      price: 300,
    },
  });
  console.log("message sent");
  setTimeout(() => {
    // channel.close();
    process.exit(0);
  }, 1500);
}

sendHeader();
