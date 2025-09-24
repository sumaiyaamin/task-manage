import { Trie } from './trie';

describe('Trie', () => {
  it('returns matches for prefix', () => {
    const trie = new Trie();
    trie.insert('task');
    trie.insert('team');
    trie.insert('test');
    expect(trie.startsWith('te')).toEqual(expect.arrayContaining(['team', 'test']));
  });
});

