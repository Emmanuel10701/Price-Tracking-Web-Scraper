import React, { useState, useEffect } from "react";
import SearchTextList from "./components/SearchTextList";
import PriceHistoryTable from "./components/PriceHistoryTable";
import axios from "axios";
import TrackedProductList from "./components/TrackedProductList";

const URL = "http://localhost:5000";

function App() {
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [priceHistory, setPriceHistory] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);
  const [newSearchText, setNewSearchText] = useState("");

  useEffect(() => {
    fetchUniqueSearchTexts();
  }, []);

  const fetchUniqueSearchTexts = async () => {
    try {
      const response = await axios.get(`${URL}/unique_search_texts`);
      const data = response.data;
      setSearchTexts(data);
    } catch (error) {
      console.error("Error fetching unique search texts:", error);
    }
  };

  const handleSearchTextClick = async (searchText) => {
    try {
      const response = await axios.get(
        `${URL}/results?search_text=${searchText}`
      );
      const data = response.data;
      setPriceHistory(data);
      setShowPriceHistory(true);
    } catch (error) {
      console.error("Error fetching price history:", error);
    }
  };

  const handlePriceHistoryClose = () => {
    setShowPriceHistory(false);
    setPriceHistory([]);
  };

  const handleNewSearchTextChange = (event) => {
    setNewSearchText(event.target.value);
  };

  const handleNewSearchTextSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${URL}/start-scraper`, {
        search_text: newSearchText,
        url: "https://amazon.ca",
      });

      alert("Scraper started successfully");
      setSearchTexts([...searchTexts, newSearchText]);
      setNewSearchText("");
    } catch (error) {
      alert("Error starting scraper:", error);
    }
  };

  return (
    <div className="main" style={styles.mainContainer}>
      <h1 style={styles.title}>Product Search Tool</h1>
      <form onSubmit={handleNewSearchTextSubmit} style={styles.form}>
        <label style={styles.label}>Search for a new item:</label>
        <div style={styles.flexContainer}>
          <input
            type="text"
            value={newSearchText}
            onChange={handleNewSearchTextChange}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Start Scraper
          </button>
        </div>
      </form>
      <SearchTextList
        searchTexts={searchTexts}
        onSearchTextClick={handleSearchTextClick}
      />
      <TrackedProductList />
      {showPriceHistory && (
        <PriceHistoryTable
          priceHistory={priceHistory}
          onClose={handlePriceHistoryClose}
        />
      )}
    </div>
  );
}

const styles = {
  mainContainer: {
    fontFamily: "'Arial', sans-serif",
    margin: "20px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "2rem",
    background: "linear-gradient(90deg, rgba(255,0,150,1) 0%, rgba(0,204,255,1) 100%)",
    color: "transparent",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    marginBottom: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "10px",
  },
  input: {
    padding: "10px",
    width: "250px",
    height: "20px", // Ensures the input has a height of 40px
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    fontSize: "1rem",
    transition: "border-color 0.3s ease",
  },
  button: {
    padding: "10px 16px", // Makes button height the same as input
    height: "40px", // Ensures the button has a height of 40px
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    fontSize: "1rem",
  },
  label: {
    marginBottom: "10px",
    fontSize: "1rem",
    color: "#555",
  },
};

export default App;
