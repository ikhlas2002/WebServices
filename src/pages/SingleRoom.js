import React, { useState, useEffect, useContext } from "react";
//import defaultBcg from "../images/room-1.jpeg";
import { Link } from "react-router-dom";
import axios from "axios";
import { RoomContext } from "../context";
import StarRate from "../components/StarRate";

const SingleRoom = ({ match }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [room, setRoom] = useState(null);
  const { getRoom } = useContext(RoomContext);

  useEffect(() => {
    const roomData = getRoom(match.params.slug);
    setRoom(roomData);
  }, [getRoom, match.params.slug]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("votre_url_api/reviews", {
        roomId: match.params.slug,
        rating,
        comment,
      });

      if (response.status === 200) {
        console.log("Review submitted successfully");
        setRating(0);
        setComment("");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!room) {
    return (
      <div className="error">
        <h3>No such room could be found...</h3>
        <Link to="/rooms" className="btn-primary">
          Back to rooms
        </Link>
      </div>
    );
  }

  const {
    name,
    description,
    capacity,
    size,
    price,
    extras,
    breakfast,
    pets,
    images,
  } = room;

  const [/*main, */ ...defaultImages] = images;

  return (
    <>
      <section className="single-room">
        <div className="single-room-images">
          {defaultImages.map((item, index) => (
            <img key={index} src={item} alt={name} />
          ))}
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>Details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>Info</h3>
            <h6>Price : ${price}</h6>
            <h6>Size : {size} SQFT</h6>
            <h6>
              Max Capacity :
              {capacity > 1 ? `${capacity} people` : `${capacity} person`}
            </h6>
            <h6>{pets ? "Pets allowed" : "No pets allowed"}</h6>
            <h6>{breakfast && "Free breakfast included"}</h6>
          </article>
        </div>
      </section>
      <section className="room-extras">
        <h6>Extras </h6>
        <ul className="extras">
          {extras.map((item, index) => (
            <li key={index}>- {item}</li>
          ))}
        </ul>
      </section>
      <section className="room-reviews">
        <h3 style={{ marginLeft: '110px', marginTop: '20px' }}>Leave Your Review</h3>
        <form className="review-form" onSubmit={handleSubmit} style={{ marginLeft: '110px'}}>
          <div className="form-group">
            <label htmlFor="rating">Rating:</label>
            {/* Utilisation du composant StarRate pour la notation */}
            {/* ... (Affichage du composant StarRate avec value={rating} et onChange={setRating}) */}
            <StarRate value={rating} onChange={setRating} />
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default SingleRoom;
