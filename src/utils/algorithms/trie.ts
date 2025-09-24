export class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEnd = false;
}

export class Trie {
  private root = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (const ch of word.toLowerCase()) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch)!;
    }
    node.isEnd = true;
  }

  startsWith(prefix: string): string[] {
    const results: string[] = [];
    let node = this.root;
    const lower = prefix.toLowerCase();
    for (const ch of lower) {
      const next = node.children.get(ch);
      if (!next) return results;
      node = next;
    }
    this.collect(node, lower, results);
    return results;
  }

  private collect(node: TrieNode, path: string, out: string[]) {
    if (node.isEnd) out.push(path);
    for (const [ch, child] of node.children) this.collect(child, path + ch, out);
  }
}

