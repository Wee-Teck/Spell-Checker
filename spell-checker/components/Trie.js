// Trie.js

import TrieNode from "./TrieNode";

export default class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char);
    }
    return node.isEndOfWord;
  }
}
