import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import api from "../api/api";
import restaurantsData from "../assets/restaurants.json";

export default function Profile() {
  const { token, user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const fetchFavs = async () => {
      try {
        const res = await api.get("/api/favorite/me");
        const favs = res.data.favorites || [];
        // map to restaurant details
        const mapped = favs.map(f => ({
          ...f,
          restaurant: restaurantsData.find(r => r.id === f.restaurantId) || { id: f.restaurantId, name: f.restaurantId }
        }));
        setFavorites(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavs();
  }, [token]);

  if (!token) return <div className="container"><p>Please login to view your profile.</p></div>;
  if (loading) return <div className="container"><p>Loading profile...</p></div>;

  return (
    <div className="container">
      <h2>Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {user?.name || "—"}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <h3>Your Favorites</h3>
        {favorites.length === 0 ? <p>No favorites yet.</p> :
          <ul>
            {favorites.map(f =>
              <li key={f.id}>{f.restaurant?.name || f.restaurantId}</li>
            )}
          </ul>
        }
      </div>
    </div>
  );
}
