import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class SearchService {
  private client = new Client({ node: process.env.ELASTIC_URL || 'http://localhost:9200' });

  async search(query: string) {
    try {
      const res = await this.client.search({ index: 'tasks', q: query, size: 10 });
      // @ts-ignore
      return res.hits;
    } catch (e) {
      return { hits: [], error: (e as Error).message };
    }
  }
}

