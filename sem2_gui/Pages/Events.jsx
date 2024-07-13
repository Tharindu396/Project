import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Curd from '../src/Components/Curd'
import Navigationbar from '../src/Components/Navigationbar';
import '../src/Styles/Home.css';

function Events() {
  const [Recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/details/${id}`);
  };

  const getRecipes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3000/Recipe');
      setRecipes(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const healthyRecipes = Recipes.filter((recipe) => recipe.category === "Party");

  return (
    <div className="home_s">
      <Navigationbar />
      <div className="curd-grid">
        {isLoading ? (
          'Loading'
        ) : (
          healthyRecipes.map((recipe, index) => (
            <div className="col-lg-4 mt-5 mx-4" key={index} onClick={() => handleCardClick(recipe._id)}>
              <Curd
                Recipe={recipe}
                index={index}
                isActive={activeCard === index}
                isBlurred={activeCard !== null && activeCard !== index}
                onClick={() => setActiveCard(index)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Events;
