// Import the necessary libraries
const fs = require("fs");
const Trie = require("trie");

// Create a trie data structure to store the dictionary
const dictionary = new Trie();

// Load the dictionary file into the trie
fs.readFile("dictionary.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  // Split the data into words
  const words = data.split("\n");

  // Add each word to the trie
  words.forEach((word) => {
    dictionary.add(word);
  });
});

// Create a function to check the spelling of a word
function checkSpelling(word) {
  // If the word is in the trie, it is spelled correctly
  if (dictionary.has(word)) {
    return true;
  }

  // Otherwise, find the closest words in the trie
  const suggestions = dictionary.getSuggestions(word);

  // If there are no suggestions, the word is misspelled
  if (suggestions.length === 0) {
    return false;
  }

  // Otherwise, return the most popular suggestion
  return suggestions[0];
}

// Create a simple HTML form to input a word
const form = document.querySelector("form");

// Add an event listener to the submit button
form.addEventListener("submit", (e) => {
  // Prevent the form from submitting
  e.preventDefault();

  // Get the word from the input field
  const word = document.querySelector("input").value;

  // Check the spelling of the word
  const isCorrect = checkSpelling(word);

  // Display the result
  const result = document.querySelector("#result");
  result.textContent = isCorrect ? "Correct" : "Incorrect";

  // If the word is misspelled, display a list of suggestions
  if (!isCorrect) {
    const suggestions = dictionary.getSuggestions(word);
    const ul = document.createElement("ul");
    suggestions.forEach((suggestion) => {
      const li = document.createElement("li");
      li.textContent = suggestion;
      ul.appendChild(li);
    });
    result.appendChild(ul);
  }
});
