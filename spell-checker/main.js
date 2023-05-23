import { spellCheck } from "./components/SpellChecker";

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const suggestionsContainer = document.getElementById("suggestionsContainer");

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    const word = searchInput.value.toLowerCase(); // Convert the search input to lowercase

    // Clear previous suggestions
    suggestionsContainer.innerHTML = "";

    // Perform spell check
    spellCheck(word)
      .then((suggestions) => {
        if (suggestions.length > 0) {
          // Display suggestions
          const suggestionsList = document.createElement("ul");
          suggestions.forEach((suggestion) => {
            const suggestionItem = document.createElement("li");
            suggestionItem.textContent = suggestion;
            suggestionsList.appendChild(suggestionItem);
          });
          suggestionsContainer.appendChild(suggestionsList);
        } else {
          // No suggestions found
          const noSuggestions = document.createElement("p");
          noSuggestions.textContent = "No suggestions found.";
          suggestionsContainer.appendChild(noSuggestions);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
