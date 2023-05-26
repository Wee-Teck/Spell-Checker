class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  traverse(node, prefix, words) {
    if (node.isEndOfWord) {
      words.push(prefix);
    }
    for (const char in node.children) {
      this.traverse(node.children[char], prefix + char, words);
    }
  }

  autoComplete(prefix) {
    let node = this.root;
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (!node.children[char]) {
        return [];
      }
      node = node.children[char];
    }
    const words = [];
    this.traverse(node, prefix, words);
    return words;
  }
}

class SpellChecker {
  constructor(words) {
    this.trie = new Trie();
    this.dictionary = words;
    this.buildTrie();
  }

  buildTrie() {
    for (const word of this.dictionary) {
      this.trie.insert(word);
    }
  }

  getCorrections(word) {
    const corrections = [];
    const maxEditDistance = 2;
    this.getCorrectionsHelper(
      word,
      this.trie.root,
      "",
      0,
      corrections,
      maxEditDistance
    );
    return corrections;
  }

  getCorrectionsHelper(
    word,
    node,
    prefix,
    editDistance,
    corrections,
    maxEditDistance
  ) {
    if (editDistance > maxEditDistance) {
      return;
    }
    if (node.isEndOfWord && editDistance <= maxEditDistance) {
      corrections.push(prefix);
    }
    const len = prefix.length;
    if (len === word.length) {
      for (const char in node.children) {
        this.getCorrectionsHelper(
          word,
          node.children[char],
          prefix + char,
          editDistance + 1,
          corrections,
          maxEditDistance
        );
      }
    } else {
      const char = word[len];
      if (node.children[char]) {
        this.getCorrectionsHelper(
          word,
          node.children[char],
          prefix + char,
          editDistance,
          corrections,
          maxEditDistance
        );
      }
      for (const nextChar in node.children) {
        this.getCorrectionsHelper(
          word,
          node.children[nextChar],
          prefix + nextChar,
          editDistance + 1,
          corrections,
          maxEditDistance
        );
      }
      for (let i = len + 1; i <= word.length; i++) {
        const nextChar = word[i];
        if (node.children[nextChar]) {
          this.getCorrectionsHelper(
            word,
            node.children[nextChar],
            prefix + nextChar,
            editDistance + 1,
            corrections,
            maxEditDistance
          );
        }
      }
      if (len < word.length - 1) {
        const nextChar = word[len + 1];
        if (node.children[nextChar]) {
          this.getCorrectionsHelper(
            word,
            node.children[nextChar],
            prefix + nextChar + char,
            editDistance + 1,
            corrections,
            maxEditDistance
          );
        }
        if (len < word.length - 2) {
          const nextNextChar = word[len + 2];
          if (node.children[nextNextChar]) {
            this.getCorrectionsHelper(
              word,
              node.children[nextNextChar],
              prefix + nextNextChar + word.substring(len + 3),
              editDistance + 1,
              corrections,
              maxEditDistance
            );
          }
        }
      }
      for (let i = len + 1; i < word.length; i++) {
        const nextChar = word[i];
        if (node.children[nextChar]) {
          this.getCorrectionsHelper(
            word,
            node.children[nextChar],
            prefix +
              nextChar +
              word.substring(len + 1, i) +
              char +
              word.substring(i + 1),
            editDistance + 1,
            corrections,
            maxEditDistance
          );
        }
      }
    }
  }

  suggest(word) {
    if (this.trie.search(word)) {
      return `${word} is spelled correctly.`;
    }
    const corrections = this.getCorrections(word);
    if (corrections.length === 0) {
      return `No suggestions found for ${word}.`;
    }
    const suggestions = this.trie.autoComplete(corrections[0]);
    if (suggestions.length === 0) {
      console.log(corrections);
      return `Did you mean ${corrections[0]}?`;
    }
    return `Did you mean ${suggestions[0]}?`;
  }
}

// Example usage
const words = [
  "apple",
  "banana",
  "cherry",
  "durian",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
];

const spellChecker = new SpellChecker(words);
console.log(spellChecker.suggest("applle")); // Did you mean apple?
console.log(spellChecker.suggest("bannana")); // Did you mean banana?
console.log(spellChecker.suggest("kiwii")); // Did you mean kiwi?
console.log(spellChecker.suggest("peach")); // No suggestions found for peach.
console.log(spellChecker.suggest("watermelon")); // No suggestions found for watermelon.
console.log(spellChecker.suggest("durain")); // Did you mean durian?
console.log(spellChecker.suggest("leomn")); // Did you mean lemon?
