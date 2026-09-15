# Kafka Learning Project (Node.js)

A simple Kafka **producer/consumer** example using Node.js and KafkaJS.

---

## 📁 Project Structure

```
kafka-learning/
├── docker-compose.yml     # Runs Kafka + Zookeeper locally
├── kafka-client.js        # Shared Kafka connection config
├── package.json
├── producer/
│   └── index.js           # Sends 5 messages to Kafka
└── consumer/
    └── index.js           # Reads messages from Kafka
```

---

## 🚀 How to Run

### Step 1 — Install dependencies

```bash
npm install
```

### Step 2 — Start Kafka using Docker

Make sure Docker Desktop is running, then:

```bash
docker-compose up -d
```

Wait ~15 seconds for Kafka to fully start. You can verify it's ready with:

```bash
docker logs kafka | grep "started"
```

### Step 3 — Run the Consumer (in Terminal 1)

```bash
npm run consumer
```

The consumer will connect and wait for incoming messages.

### Step 4 — Run the Producer (in Terminal 2)

```bash
npm run producer
```

The producer sends 5 messages, one every 2 seconds. Watch Terminal 1 to see them arrive in real time!

---

## 🛑 Stopping Everything

Stop the consumer with `Ctrl+C`, then bring down Kafka:

```bash
docker-compose down
```

---

## 💡 Key Concepts You'll See in Action

| Concept            | Where               | What it means                                      |
| ------------------ | ------------------- | -------------------------------------------------- |
| **Topic**          | `kafka-client.js`   | A named channel where messages are published       |
| **Producer**       | `producer/index.js` | Sends messages to a topic                          |
| **Consumer**       | `consumer/index.js` | Reads messages from a topic                        |
| **Consumer Group** | `consumer/index.js` | Lets multiple consumers share the workload         |
| **Offset**         | Consumer output     | Position of a message in the topic (like an index) |
| **Partition**      | Consumer output     | Topic sub-division for parallelism                 |

---

## 🧪 Things to Try

1. **Run the consumer AFTER the producer** — notice it still receives all messages (because of `fromBeginning: true`)
2. **Open 2 consumer terminals** with the same `groupId` — Kafka splits messages between them
3. **Change the `groupId`** in `consumer/index.js` — the new group starts fresh from the beginning
