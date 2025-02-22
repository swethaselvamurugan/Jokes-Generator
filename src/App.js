import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJokes, fetchCategories } from "./jokeSlice";
import { XCircle } from "lucide-react";
import "./index.css";

function App() {
  const [category, setCategory] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const dispatch = useDispatch();

  const joke = useSelector((state) => state.joke.joke);
  const categories = useSelector((state) => state.joke.categories);
  const error = useSelector((state) => state.joke.error);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  function handleClear() {
    setCategory("");
    setShowCategories(false);
  }

  function handleChange(event) {
    setCategory(event.target.value);
  }

  async function handleFetch() {
    const trimmedCategory = category.trim().toLowerCase();
    if (categories.includes(trimmedCategory)) {
      dispatch(fetchJokes(trimmedCategory));
      setShowCategories(false);
    } else {
      await dispatch(fetchCategories());
      setShowCategories(true); 
    }
  }

  return (
    <div className={`app-container`}>
      <header className="app-header">
        <h1>Welcome to the Joke Generator</h1>
        <p className="quote">"Laughter is the best medicine!"</p>
      </header>

      <div className="outer">
        <div className="container">
          <div className="search-container">
            <input
              className="input"
              placeholder="Input search text"
              value={category}
              onChange={handleChange}
            />
            {category && <XCircle className="clear-icon" onClick={handleClear} />}
          </div>
          <button className="button" onClick={handleFetch}>
            Get {category ? `from ${category}` : "Random"}
          </button>
        </div>
      </div>

      <div className="text">
        {categories.includes(category.trim().toLowerCase()) ? (
          <p className="joke-text">{joke} 😂</p>
        ) : (
          showCategories && (
            <>
              <p className="error-text">Error: No jokes for category "{category}" found.</p>
              <p className="available-categories">Available categories: {categories.join(", ") || "Loading categories..."}</p>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default App;
