import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private subscribers = new Set<string>();

  subscribe(userId: string) {
    this.subscribers.add(userId);
  }

  unsubscribe(userId: string) {
    this.subscribers.delete(userId);
  }

  async notify(message: { userId: string; type: string; payload: any }) {
    // Placeholder for WebSocket/RabbitMQ integration
    return { delivered: this.subscribers.has(message.userId), message };
  }
}

