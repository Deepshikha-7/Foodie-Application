import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import restaurantsData from "../assets/restaurants.json";
import { AuthContext } from "../Contexts/AuthContext";
import api from "../api/api";
import "../styles/App.css";


export default function RestaurantDetail() {
  const { id } = useParams();
  const rest = restaurantsData.find(r => r.id === id) || { id, name: id }; // <-- use restaurantsData
  const { token } = useContext(AuthContext);
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    let mounted = true;
    api.get(`/api/favorite/check/${id}`)
      .then(res => { if (mounted) setIsFav(Boolean(res.data)); })
      .catch(() => {})
    return () => { mounted = false; };
  }, [id, token]);

  const toggleFav = async () => {
    if (!token) return alert("Please login");
    setLoading(true);
    try {
      if (isFav) {
        await api.delete(`/api/favorite/remove/${id}`);
        setIsFav(false);
      } else {
        await api.post("/api/favorite/add", { restaurantId: id });
        setIsFav(true);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update favorite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="detail">
        <img src={rest.image || "https://via.placeholder.com/700x380"} alt={rest.name} />
        <div className="detail-body">
          <h2>{rest.name}</h2>
          <p><strong>Cuisine:</strong> {rest.cuisine}</p>
          <p>{rest.description || "No description available."}</p>
          <button className={`btn ${isFav ? "danger" : ""}`} onClick={toggleFav} disabled={loading}>
            {isFav ? "♥ Remove favorite" : "♡ Add to favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}