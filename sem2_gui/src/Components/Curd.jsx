import React, { useState } from 'react';
import '../Styles/Curd.css';

const Curd = ({ Recipe, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={`cont_modal ${isActive ? 'cont_modal_active' : ''}`} onClick={onClick}>
      <div className={`overlay ${isActive ? 'active' : ''}`}></div>
      <div
        className={`cont_photo ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="cont_img_back">
          <img src={Recipe.image} alt={Recipe.name} />
        </div>
        <div className="cont_mins">
          <div className="sub_mins">
            <h3>{Recipe.time}</h3>
            <span>MINS</span>
          </div>
          <div className="cont_icon_right">
            <a href="#"><i className="material-icons"></i></a>
          </div>
        </div>
        <div className="cont_servings">
          <h3>{Recipe.servings}</h3>
          <span>SERVINGS</span>
        </div>
        <div className="cont_detalles">
          <h3>{Recipe.name}</h3>
          <p>{Recipe.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Curd;
