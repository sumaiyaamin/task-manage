import { PriorityQueue } from './priority-queue';

describe('PriorityQueue', () => {
  it('pops in priority order', () => {
    const pq = new PriorityQueue<number>((a, b) => a - b);
    pq.push(5); pq.push(1); pq.push(3);
    expect(pq.pop()).toBe(1);
    expect(pq.pop()).toBe(3);
    expect(pq.pop()).toBe(5);
  });
});

