import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['proper-mole-13384-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'cHJvcGVyLW1vbGUtMTMzODQkZKH7_ey-tsdQJZmnotoYqWaO2_KC2ogndj0gWFQ',
          password:
            'PymAzSCyFj-1E_dl5FcYfglLdnE5zOOWI1oK2UpX3GeWFkDHJ367JsahigE7X2TxnSOCOg==',
        },
        ssl: true,
      },
    });
  }
  async onModuleDestroy() {
    await this.close();
  }
}
