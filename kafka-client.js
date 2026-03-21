const { Kafka } = require('kafkajs');

// Create a Kafka instance pointing to our local broker (started via Docker)
const kafka = new Kafka({
  clientId: 'kafka-learning-app',
  brokers: ['localhost:9092'],
});

const TOPIC = 'learning-topic';

module.exports = { kafka, TOPIC };
