import { Injectable } from '@nestjs/common';
import { connect, Connection, Channel } from 'amqplib';

@Injectable()
export class NotificationsService {
  private subscribers = new Set<string>();
  private channel?: Channel;

  subscribe(userId: string) {
    this.subscribers.add(userId);
  }

  unsubscribe(userId: string) {
    this.subscribers.delete(userId);
  }

  async notify(message: { userId: string; type: string; payload: any }) {
    // Placeholder for WebSocket/RabbitMQ integration
    await this.publish('notifications', message);
    return { delivered: this.subscribers.has(message.userId), message };
  }

  async initRabbit() {
    if (this.channel) return;
    const url = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
    const conn: Connection = await connect(url);
    this.channel = await conn.createChannel();
    await this.channel.assertExchange('notifications', 'fanout', { durable: true });
  }

  private async publish(exchange: string, payload: any) {
    try {
      if (!this.channel) await this.initRabbit();
      this.channel!.publish(exchange, '', Buffer.from(JSON.stringify(payload)), { contentType: 'application/json' });
    } catch (_) {
      // ignore if broker is unavailable in dev
    }
  }
}

