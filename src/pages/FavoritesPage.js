import React from "react";
import { Link } from "react-router-dom";

function FavoritesPage({ favorites, removeFromFavorites }) {
  return (
    <div className="favorites-page">
      <h1>Favorites</h1>
      <Link to="/">Back to Search</Link>
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
            {favorites?.map((uni, index) => (
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
                  <button onClick={() => removeFromFavorites(uni)}>
                    Remove from Favorites
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FavoritesPage;
