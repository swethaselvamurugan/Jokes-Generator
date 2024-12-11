import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJokes, fetchCategories } from "./jokeSlice";

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
    const trimmedCategory = category.trim();
    if (categories.includes(trimmedCategory)) {
      dispatch(fetchJokes(trimmedCategory));
      setShowCategories(false);
    } else {
      await dispatch(fetchCategories());
      setShowCategories(true); 
    }
  }

  return (
    <>
      <div className="outer">
        <div className="container">
          <input className="input" placeholder="Input search text" value={category} onChange={handleChange}></input>
          {category && <p className="x" onClick={handleClear}>X</p>}
          <button className="button" onClick={handleFetch}>Get {category? `from ${category}` : "Random"}</button>
        </div>
      </div>
      <div className="text">
        {categories.includes(category) ? (
          <p>{joke}😂</p>
        ) : (
          showCategories && (
            <>
              <p style={{ color: 'red' }}>Error: No jokes for category\"{category}\"found.</p>
              <p>
                Available categories: {categories.join(", ") || "Loading categories..."}
              </p>
            </>
          )
        )}
      </div>
    </>
  );
}

export default App;




