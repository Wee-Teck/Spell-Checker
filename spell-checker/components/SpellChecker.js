// SpellChecker.js

import Trie from "./Trie";
import { getEditDistance } from "./EditDistance";

export async function spellCheck(word) {
  const response = await fetch("/dictionary.txt");
  const data = await response.text();
  const dictionary = data.split("\n").map((word) => word.trim());

  const trie = new Trie();

  for (const dictWord of dictionary) {
    trie.insert(dictWord);
  }

  if (trie.search(word)) {
    return [`${word} is spelled correctly.`];
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
    return [
      `Did you mean: ${suggestedWords.join(", ")}?`,
      `Closest suggestion: ${closestSuggestion}`,
    ];
  } else {
    return [`No suggestions found for ${word}.`];
  }
}
