import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import defaultImg from "../images/room-1.jpeg";
import PropTypes from "prop-types";
import StarRate from "./StarRate";
import axios from "axios";

const Room = ({ room }) => {
  const { name, slug, images, price } = room;
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        // Récupérer la moyenne des évaluations pour chaque chambre depuis le backend
        const response = await axios.get(`votre_url_api/rooms/${slug}/averageRating`);
        const { averageRating } = response.data;
        setAverageRating(averageRating);
      } catch (error) {
        console.error("Error fetching average rating:", error);
      }
    };

    fetchAverageRating();
  }, [slug]);

  return (
    <article className="room">
      <div className="img-container">
        <img src={images[0] || defaultImg} alt="single room" />
        <div className="price-top">
          <h6>${price}</h6>
          <p>per night</p>
        </div>
        <Link to={`/rooms/${slug}`} className="btn-primary room-link">
          features
        </Link>
      </div>
      <p className="room-info">{name}</p>
      <StarRate value={averageRating} />
    </article>
  );
};

Room.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
  }),
};

export default Room;
