import React, { useState, useEffect } from "react";

function SearchPage({ favorites, addToFavorites, removeFromFavorites }) {
  const [country, setCountry] = useState("Canada");
  const [searchTerm, setSearchTerm] = useState("");
  const [universities, setUniversities] = useState([]);
  const [uniqueCountryNames, setUniqueCountryNames] = useState([]);
  const [performance, setPerformance] = useState({
    responseCode: null,
    responseTime: null,
  });

  useEffect(() => {
    fetchUniversities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchUniversities = async () => {
    const startTime = Date.now();
    try {
      const response = await fetch(
        `http://universities.hipolabs.com/search?country=${country}`
      );
      const data = await response.json();
      setUniversities(data);
      setPerformance({
        responseCode: response.status,
        responseTime: Date.now() - startTime,
      });
    } catch (error) {
      console.error("Error fetching universities:", error);
    }
  };

  const filteredUniversities = universities.filter((uni) =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchCountries = async () => {
    try {
      const response = await fetch(`http://universities.hipolabs.com/search`);
      const data = await response.json();
      // Create a set of unique country names
      const uniqueCountryNames = new Set(data.map((item) => item.country));

      // Map the unique country names to the Country interface
      setUniqueCountryNames(
        Array.from(uniqueCountryNames).map((name) => ({
          name,
        }))
      );
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const clearFilters = () => {
    setCountry("Canada");
    setSearchTerm("");
  };
  return (
    <div className="search-page">
      <h1 className="my-4">University Search</h1>
      <div className="row mb-3">
        <div className="col-md-4">
          <select
            className="form-select"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">All</option>
            {uniqueCountryNames.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary" onClick={clearFilters}>
            Clear All Filters
          </button>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <p>Response Code: {performance.responseCode}</p>
        </div>
        <div className="col-md-6">
          <p>Response Time: {performance.responseTime}ms</p>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>State/Province</th>
              <th>Website</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUniversities.map((uni, index) => (
              <tr key={index}>
                <td>{uni.name}</td>
                <td>{uni["state-province"] || "N/A"}</td>
                <td>
                  <a
                    href={uni.web_pages[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {uni.web_pages[0]}
                  </a>
                </td>
                <td>
                  {favorites?.some((fav) => fav.name === uni.name) ? (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromFavorites(uni)}
                    >
                      Remove from Favorites
                    </button>
                  ) : (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => addToFavorites(uni)}
                    >
                      Add to Favorites
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SearchPage;
