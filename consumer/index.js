const { kafka, TOPIC } = require('../kafka-client');

async function runConsumer() {
  const consumer = kafka.consumer({
    groupId: 'learning-group', // Consumer group ID — Kafka tracks offsets per group
  });

  console.log('🔌 Connecting consumer to Kafka...');
  await consumer.connect();
  console.log('✅ Consumer connected!\n');

  // Subscribe to the topic — fromBeginning: true means we read ALL messages,
  // even ones sent before the consumer started
  await consumer.subscribe({ topic: TOPIC, fromBeginning: true });

  console.log(`👂 Listening for messages on topic: "${TOPIC}"`);
  console.log('   (Press Ctrl+C to stop)\n');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = JSON.parse(message.value.toString());

      console.log('📥 Received message:');
      console.log(`   Topic     : ${topic}`);
      console.log(`   Partition : ${partition}`);
      console.log(`   Offset    : ${message.offset}`);
      console.log(`   Key       : ${message.key.toString()}`);
      console.log(`   Value     :`, value);
      console.log('');
    },
  });
}

// Graceful shutdown on Ctrl+C
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down consumer...');
  process.exit(0);
});

runConsumer().catch((err) => {
  console.error('❌ Consumer error:', err.message);
  process.exit(1);
});
