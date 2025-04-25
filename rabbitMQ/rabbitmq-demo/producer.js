import amqp from 'amqplib';

async function sendMessage() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const exchange = 'my_exchange'; // Nom de l'exchange
    const routingKey = 'my_routing_key'; // Clé de routage
    const message = 'Hello, RabbitMQ with Exchange!';

    // Crée l'exchange
    await channel.assertExchange(exchange, 'direct', { durable: false });

    // Publie le message dans l'exchange
    channel.publish(exchange, routingKey, Buffer.from(message));
    console.log(`Message envoyé : ${message}`);

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
}

sendMessage();