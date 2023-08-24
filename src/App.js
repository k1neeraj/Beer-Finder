import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const styles = {
    footer: {
      backgroundColor: "goldenrod",
      color: "white",
      textAlign: "center",
      padding: "0.5rem",
      bottom: 0,
      width: "100%",
    },
  };

  useEffect(() => {
    async function fetchBeers() {
      try {
        const response = await fetch("https://api.punkapi.com/v2/beers/");
        const data = await response.json();
        setBeers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchBeers();
  }, []);

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Beer Finder</h1>
        <input
          type="text"
          placeholder="Search for a beer"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <div className="beer-list">
        {filteredBeers.map((beer) => (
          <div key={beer.id} className="beer-card">
            <img src={beer.image_url} alt={beer.name} />
            <h3>{beer.name}</h3>
            <p>{beer.tagline}</p>
          </div>
        ))}
      </div>

      <footer style={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} Beer Finder. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
