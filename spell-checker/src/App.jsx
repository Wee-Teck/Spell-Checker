import { useState, useRef } from "react";
import { spellCheck } from "../components/SpellChecker";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const word = searchInput.trim().toLowerCase();

    try {
      const suggestionData = await spellCheck(word);
      setSuggestions(suggestionData);
      setError("");
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during spell check.");
      setSuggestions([]);
    }
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleClearInput = () => {
    setSearchInput("");
    inputRef.current.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      handleClearInput();
    }
  };

  const handleToggleAllSuggestions = () => {
    setShowAllSuggestions((prevState) => !prevState);
  };

  return (
    <div className="app">
      <span className="logo">Spell-Checker!</span>
      <section className="content">
        <h1 className="content_title">Search for something!</h1>
        <p className="content_description">
          Done using Tries & levenshtein distance
        </p>
      </section>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form onSubmit={handleSubmit} className="d-flex">
            <input
              type="text"
              className="form-control mr-2"
              placeholder="Go ahead, you won't!"
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
            {searchInput && (
              <button
                type="button"
                className="clear-button"
                onClick={handleClearInput}
              >
                X
              </button>
            )}
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-lg-6">
          <div id="suggestionsContainer">
            {suggestions.length > 0 && !showAllSuggestions ? (
              <>
                <p className="suggestion">{suggestions[0]}</p>
                {suggestions.length > 1 && (
                  <p
                    className="suggestion ellipsis"
                    onClick={handleToggleAllSuggestions}
                    style={{ cursor: "pointer" }}
                  >
                    ...
                  </p>
                )}
              </>
            ) : (
              <>
                {suggestions.map((suggestion, index) => (
                  <p key={index} className="suggestion">
                    {suggestion}
                  </p>
                ))}
              </>
            )}
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
