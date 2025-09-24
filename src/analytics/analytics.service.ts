import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  async getSummary() {
    return { users: 0, projects: 0, tasks: 0 };
  }
}

