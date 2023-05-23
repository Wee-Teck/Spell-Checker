// TrieNode.js

export default class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}
