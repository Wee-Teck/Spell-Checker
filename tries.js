// Spell checker using tries
/**
 * Only supports insert and search
 */
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let current = this.root;
    for (let i = 0; i < word.length; i++) {
      const ch = word.charAt(i);
      let node = current.children.get(ch);
      if (!node) {
        node = new TrieNode();
        current.children.set(ch, node);
      }
      current = node;
    }
    current.isEndOfWord = true;
  }

  search(word) {
    let current = this.root;
    for (let i = 0; i < word.length; i++) {
      const ch = word.charAt(i);
      const node = current.children.get(ch);
      if (!node) {
        return false;
      }
      current = node;
    }
    return current.isEndOfWord;
  }
}

const trie = new Trie();

// Insert some words into the trie
trie.insert("hello");
trie.insert("world");
trie.insert("computer");
trie.insert("science");
trie.insert("programming");
trie.insert("language");

// Test the search function
console.log(trie.search("hello")); // true
console.log(trie.search("computer")); // true
console.log(trie.search("programming language")); // false
console.log(trie.search("program")); // false
