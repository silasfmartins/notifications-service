const { Kafka } = require('kafkajs')
const { randomUUID } = require('node:crypto')

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'test-producer',
    brokers: ['proper-mole-13384-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: 'cHJvcGVyLW1vbGUtMTMzODQkZKH7_ey-tsdQJZmnotoYqWaO2_KC2ogndj0gWFQ',
      password: 'PymAzSCyFj-1E_dl5FcYfglLdnE5zOOWI1oK2UpX3GeWFkDHJ367JsahigE7X2TxnSOCOg==',
    },
    ssl: true,
  })

  const producer = kafka.producer()

  await producer.connect()

  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade!',
          category: 'social',
          recipientId: randomUUID(),
        })
      },
    ],
  })

  await producer.disconnect()
}

bootstrap()