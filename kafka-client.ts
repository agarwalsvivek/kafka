import { Kafka } from 'kafkajs';

// Create a Kafka instance pointing to our local broker (started via Docker)
const kafka = new Kafka({
  clientId: 'kafka-learning-app',
  brokers: ['localhost:9092'],
});

const TOPIC = 'learning-topic';

export { kafka, TOPIC };
