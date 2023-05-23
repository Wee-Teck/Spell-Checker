/**
 * Dummy node
 * @class Node
 */
class Node {
  constructor(c) {
    this.c = c; // Character stored in the node
    this.isWord = false; // Flag indicating if the node represents the end of a word
    this.children = new Array(26); // Array to store child nodes, assuming lowercase English letters
  }
}

/**
 * Implementation of Trie with insert, search, and startsWith methods
 *
 * @class Trie
 */
class Trie {
  constructor() {
    this.root = new Node("\0"); // Create the root node of the Trie
  }

  insert(word) {
    let curr = this.root; // Start at the root node
    for (let i = 0; i < word.length; i++) {
      let c = word.charAt(i); // Get the current character
      // Calculate the index of the child node in the children array based on the character's ASCII value
      let index = c.charCodeAt(0) - "a".charCodeAt(0);
      if (curr.children[index] === undefined) {
        // If the child node doesn't exist, create a new node and assign it to the appropriate index
        curr.children[index] = new Node(c);
      }
      curr = curr.children[index]; // Update the current node to the child node
    }
    curr.isWord = true; // Set the flag of the last node to indicate the end of a word
  }

  search(word) {
    let node = this.getNode(word); // Get the node corresponding to the word
    return node !== null && node.isWord; // Return true if the node exists and represents the end of a word
  }

  startsWith(prefix) {
    return this.getNode(prefix) !== null; // Return true if there is a node corresponding to the prefix
  }

  getNode(word) {
    let curr = this.root; // Start at the root node
    for (let i = 0; i < word.length; i++) {
      let c = word.charAt(i); // Get the current character
      // Calculate the index of the child node in the children array based on the character's ASCII value
      let index = c.charCodeAt(0) - "a".charCodeAt(0);
      if (curr.children[index] === undefined) {
        return null; // If the child node doesn't exist, return null
      }
      curr = curr.children[index]; // Update the current node to the child node
    }
    return curr; // Return the node corresponding to the word
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
console.log("Search for 'apple':", trie.search("apple")); // expected output: true
console.log("Search for 'banana':", trie.search("banana")); // expected output: true
console.log("Search for 'orange':", trie.search("orange")); // expected output: true
console.log("Search for 'grape':", trie.search("grape")); // expected output: true
console.log("Search for 'pear':", trie.search("pear")); // expected output: false

console.log("\nCheck prefixes");
// Check prefixes
console.log("Check prefix 'app':", trie.startsWith("app")); // expected output: true
console.log("Check prefix 'ban':", trie.startsWith("ban")); // expected output: true
console.log("Check prefix 'or':", trie.startsWith("or")); // expected output: true
console.log("Check prefix 'gr':", trie.startsWith("gr")); // expected output: true
console.log("Check prefix 'pe':", trie.startsWith("pe")); // expected output: false

// Insert additional words
trie.insert("app");
trie.insert("grapefruit");
console.log("\nCheck updated search and prefixes");

// Check updated search and prefixes
console.log("Search for 'app':", trie.search("app")); // expected output: true
console.log("Search for 'grapefruit':", trie.search("grapefruit")); // expected output: true
console.log("Check prefix 'ap':", trie.startsWith("ap")); // expected output: true
console.log("Check prefix 'grapef':", trie.startsWith("grapef")); // expected output: true

console.log("\nCheck non-existent words");

// Check non-existent words
console.log("Search for 'mango':", trie.search("mango")); // expected output: false
console.log("Check prefix 'man':", trie.startsWith("man")); // expected output: false

/*
Space Time Complexity

Insert, Search, StartsWith
Time: O(n) where n is the length of the word

search, startsWith
Space: O(1)
*/
