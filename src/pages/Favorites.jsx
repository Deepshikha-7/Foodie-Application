// src/pages/Favorites.jsx
import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
// import { AuthContext } from "../contexts/AuthContext";
import { AuthContext } from "../Contexts/AuthContext";
import restaurantsData from "../assets/restaurants.json";

export default function Favorites() {
  const { token } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const res = await api.get("/api/favorite/me");
        const data = res.data;
        // backend returns user favorite response with favorites array that has restaurantId fields
        const favs = data.favorites || [];
        // map restaurantId to restaurant object in our frontend JSON data
        const favoriteRestaurants = favs.map(f => {
          const rest = restaurantsData.find(r => r.id === f.restaurantId);
          return { ...f, restaurant: rest || { id: f.restaurantId, name: f.restaurantId } };
        });
        setFavorites(favoriteRestaurants);
      } catch (err) {
        console.error(err);
        alert("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavs();
  }, [token]);

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet. Add some from Home.</p>
      ) : (
        <div className="grid">
          {favorites.map(f => (
            <div key={f.id} className="card">
              <img src={f.restaurant?.image || "https://via.placeholder.com/300x180"} alt={f.restaurant?.name} />
              <div className="card-body">
                <h3>{f.restaurant?.name}</h3>
                <p>{f.restaurant?.cuisine}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
