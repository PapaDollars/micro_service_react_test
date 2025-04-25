import amqp from'amqplib';



async function receiveMessage() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const exchange = 'my_exchange'; // Nom de l'exchange
    const queue = 'my_queue'; // Nom de la file d'attente
    const routingKey = 'my_routing_key'; // Clé de routage

    // Crée l'exchange
    await channel.assertExchange(exchange, 'direct', { durable: false });

    // Crée la file d'attente
    await channel.assertQueue(queue, { durable: false });

    // Lie la file d'attente à l'exchange avec une clé de routage
    await channel.bindQueue(queue, exchange, routingKey);

    console.log('En attente de messages...');

    channel.consume(queue, (message) => {
        if (message !== null) {
            console.log(`Message reçu : ${message.content.toString()}`);
            channel.ack(message);
        }
    });
}

receiveMessage();