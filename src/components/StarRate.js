import React from "react";

const StarRate = ({ value, onChange }) => {
  const renderStars = () => {
    const stars = [];
    const maxValue = 5;

    for (let i = 1; i <= maxValue; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => onChange(i)} // Appel de la fonction onChange pour mettre à jour la valeur de l'évaluation
          style={{ cursor: "pointer", color: i <= value ? "gold" : "grey" }}
        >
          &#9733;
        </span>
      );
    }

    return stars;
  };

  return <div>{renderStars()}</div>;
};

export default StarRate;
