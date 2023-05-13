// class TrieNode {
//   constructor() {
//     this.children = new Map();
//     this.isEndOfWord = false;
//   }
// }

// class Trie {
//   constructor() {
//     this.root = new TrieNode();
//   }

//   insert(word) {
//     let node = this.root;
//     for (let i = 0; i < word.length; i++) {
//       const char = word[i];
//       if (!node.children.has(char)) {
//         node.children.set(char, new TrieNode());
//       }
//       node = node.children.get(char);
//     }
//     node.isEndOfWord = true;
//   }

//   search(word) {
//     let node = this.root;
//     for (let i = 0; i < word.length; i++) {
//       const char = word[i];
//       if (!node.children.has(char)) {
//         return false;
//       }
//       node = node.children.get(char);
//     }
//     return node.isEndOfWord;
//   }
// }

// function getEditDistance(str1, str2) {
//   const m = str1.length;
//   const n = str2.length;
//   const dp = [];

//   for (let i = 0; i <= m; i++) {
//     dp.push(Array(n + 1).fill(0));
//   }

//   for (let i = 0; i <= m; i++) {
//     dp[i][0] = i;
//   }

//   for (let j = 0; j <= n; j++) {
//     dp[0][j] = j;
//   }

//   for (let i = 1; i <= m; i++) {
//     for (let j = 1; j <= n; j++) {
//       if (str1[i - 1] === str2[j - 1]) {
//         dp[i][j] = dp[i - 1][j - 1];
//       } else {
//         dp[i][j] =
//           1 +
//           Math.min(
//             dp[i - 1][j - 1], // substitution
//             dp[i - 1][j], // deletion
//             dp[i][j - 1] // insertion
//           );
//       }
//     }
//   }

//   return dp[m][n];
// }

// function spellCheck(word, dictionary) {
//   const suggestions = [];
//   const trie = new Trie();

//   for (const dictWord of dictionary) {
//     trie.insert(dictWord);
//   }

//   if (trie.search(word)) {
//     return `${word} is spelled correctly.`;
//   }

//   for (const dictWord of dictionary) {
//     const distance = getEditDistance(word, dictWord);
//     if (distance <= 2) {
//       suggestions.push({ word: dictWord, distance });
//     }
//   }

//   suggestions.sort((a, b) => a.distance - b.distance);

//   if (suggestions.length > 0) {
//     const suggestedWords = suggestions.map((suggestion) => suggestion.word);
//     return `Did you mean: ${suggestedWords.join(", ")}?`;
//   }

//   return `No suggestions found for ${word}.`;
// }

// // Example usage
// const dictionary = ["apple", "banana", "orange", "peach", "pear"];
// const word = "banaaa";

// console.log(spellCheck(word, dictionary));

const fs = require("fs");

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

function getEditDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = [];

  for (let i = 0; i <= m; i++) {
    dp.push(Array(n + 1).fill(0));
  }

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] =
          1 +
          Math.min(
            dp[i - 1][j - 1], // substitution
            dp[i - 1][j], // deletion
            dp[i][j - 1] // insertion
          );
      }
    }
  }

  return dp[m][n];
}

function spellCheck(word) {
  fs.readFile("dictionary.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading dictionary file:", err);
      return;
    }

    const dictionary = data.split("\n").map((word) => word.trim());

    const trie = new Trie();

    for (const dictWord of dictionary) {
      trie.insert(dictWord);
    }

    if (trie.search(word)) {
      console.log(`${word} is spelled correctly.`);
      return;
    }

    const suggestions = [];
    for (const dictWord of dictionary) {
      const distance = getEditDistance(word, dictWord);
      if (distance <= 2) {
        suggestions.push({ word: dictWord, distance });
      }
    }

    suggestions.sort((a, b) => a.distance - b.distance);

    if (suggestions.length > 0) {
      const suggestedWords = suggestions.map((suggestion) => suggestion.word);
      const closestSuggestion = suggestedWords[0];
      console.log(`Did you mean: ${suggestedWords.join(", ")}?`);
      console.log(`Closest suggestion: ${closestSuggestion}`);
    } else {
      console.log(`No suggestions found for ${word}.`);
    }
  });
}

// Example usage
const word = "po";

spellCheck(word);
