/**
 * Dummy node
 * @class Node
 */
class Node {
  constructor(c) {
    this.c = c;
    this.isWord = false;
    this.children = new Array(26);
  }
}

/**
 * Implemenation of Trie with insert, search, and startsWith methods
 *
 * @class Trie
 */
class Trie {
  constructor() {
    this.root = new Node("\0");
  }

  insert(word) {
    let curr = this.root;
    for (let i = 0; i < word.length; i++) {
      let c = word.charAt(i);
      if (curr.children[c.charCodeAt(0) - "a".charCodeAt(0)] === undefined) {
        curr.children[c.charCodeAt(0) - "a".charCodeAt(0)] = new Node(c);
      }
      curr = curr.children[c.charCodeAt(0) - "a".charCodeAt(0)];
    }
    curr.isWord = true;
  }

  search(word) {
    let node = this.getNode(word);
    return node !== null && node.isWord;
  }

  startsWith(prefix) {
    return this.getNode(prefix) !== null;
  }

  getNode(word) {
    let curr = this.root;
    for (let i = 0; i < word.length; i++) {
      let c = word.charAt(i);
      if (curr.children[c.charCodeAt(0) - "a".charCodeAt(0)] === undefined) {
        return null;
      }
      curr = curr.children[c.charCodeAt(0) - "a".charCodeAt(0)];
    }
    return curr;
  }
}

/*
Usage examples:
*/

let trie = new Trie();

// Insert words
trie.insert("apple");
trie.insert("banana");
trie.insert("orange");
trie.insert("grape");

console.log("Search for words");
// Search for words
console.log("Search for 'apple':", trie.search("apple")); // expected output: true, actual output: true
console.log("Search for 'banana':", trie.search("banana")); // expected output: true, actual output: true
console.log("Search for 'orange':", trie.search("orange")); // expected output: true, actual output: true
console.log("Search for 'grape':", trie.search("grape")); // expected output: true, actual output: true
console.log("Search for 'pear':", trie.search("pear")); // expected output: false, actual output: false

console.log("\nCheck prefixes");
// Check prefixes
console.log("Check prefix 'app':", trie.startsWith("app")); // expected output: true, actual output: true
console.log("Check prefix 'ban':", trie.startsWith("ban")); // expected output: true, actual output: true
console.log("Check prefix 'or':", trie.startsWith("or")); // expected output: true, actual output: true
console.log("Check prefix 'gr':", trie.startsWith("gr")); // expected output: true, actual output: true
console.log("Check prefix 'pe':", trie.startsWith("pe")); // expected output: false, actual output: false

// Insert additional words
trie.insert("app");
trie.insert("grapefruit");
console.log("\nCheck updated search and prefixes");

// Check updated search and prefixes
console.log("Search for 'app':", trie.search("app")); // expected output: true, actual output: true
console.log("Search for 'grapefruit':", trie.search("grapefruit")); // expected output: true, actual output: true
console.log("Check prefix 'ap':", trie.startsWith("ap")); // expected output: true, actual output: true
console.log("Check prefix 'grapef':", trie.startsWith("grapef")); // expected output: true, actual output: true

console.log("\nCheck non-existent words");

// Check non-existent words
console.log("Search for 'mango':", trie.search("mango")); // expected output: false, actual output: false
console.log("Check prefix 'man':", trie.startsWith("man")); // expected output: false, actual output: false

/*
Space Time Complexity

Insert, Search, StartsWith
Time: O(n) where n is the length of the word

search, startsWith
Space: O(1)
*/
