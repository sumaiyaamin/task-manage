import { topologicalSort } from './topological-sort';

describe('topologicalSort', () => {
  it('sorts a DAG', () => {
    const nodes = ['A', 'B', 'C'];
    const edges: Array<[string, string]> = [['A', 'B'], ['B', 'C']];
    const order = topologicalSort(nodes, edges);
    expect(order).toEqual(['A', 'B', 'C']);
  });

  it('throws on cycle', () => {
    expect(() => topologicalSort(['A', 'B'], [['A', 'B'], ['B', 'A']])).toThrow();
  });
});

