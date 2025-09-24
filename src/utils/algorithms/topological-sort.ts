export function topologicalSort(nodes: string[], edges: Array<[string, string]>): string[] {
  const inDegree = new Map<string, number>();
  const graph = new Map<string, string[]>();

  for (const n of nodes) {
    inDegree.set(n, 0);
    graph.set(n, []);
  }
  for (const [u, v] of edges) {
    if (!graph.has(u)) graph.set(u, []);
    graph.get(u)!.push(v);
    inDegree.set(v, (inDegree.get(v) || 0) + 1);
  }

  const queue: string[] = [];
  for (const [n, d] of inDegree) if (d === 0) queue.push(n);

  const order: string[] = [];
  while (queue.length) {
    const u = queue.shift()!;
    order.push(u);
    for (const v of graph.get(u) || []) {
      inDegree.set(v, inDegree.get(v)! - 1);
      if (inDegree.get(v) === 0) queue.push(v);
    }
  }

  if (order.length !== nodes.length) {
    throw new Error('Cycle detected in dependencies');
  }
  return order;
}

