const { kafka, TOPIC } = require('../kafka-client');

async function runProducer() {
  const producer = kafka.producer();

  console.log('🔌 Connecting producer to Kafka...');
  await producer.connect();
  console.log('✅ Producer connected!\n');

  // Send 5 messages to the topic, one every 2 seconds
  let messageCount = 1;

  const interval = setInterval(async () => {
    const message = {
      key: `key-${messageCount}`,
      value: JSON.stringify({
        id: messageCount,
        text: `Hello from producer! Message #${messageCount}`,
        timestamp: new Date().toISOString(),
      }),
    };

    await producer.send({
      topic: TOPIC,
      messages: [message],
    });

    console.log(`📤 Sent message #${messageCount}:`, JSON.parse(message.value));
    messageCount++;

    // Stop after 5 messages
    if (messageCount > 5) {
      clearInterval(interval);
      console.log('\n✅ All messages sent! Disconnecting producer...');
      await producer.disconnect();
      console.log('👋 Producer disconnected. Run the consumer to read the messages!');
    }
  }, 2000);
}

runProducer().catch((err) => {
  console.error('❌ Producer error:', err.message);
  process.exit(1);
});
