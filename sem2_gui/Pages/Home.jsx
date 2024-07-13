import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigationbar from '../src/Components/Navigationbar';
import Curd from '../src/Components/Curd';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import '../src/Styles/Home.css';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [followedRecipes, setFollowedRecipes] = useState([]);
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

  const getFollowedRecipes = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/followedRecipes', {
        headers: { Authorization: token }
      });
      setFollowedRecipes(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecipes();
    getFollowedRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => recipe.rating > 3);

  return (
    <div className="home_s">
      <Navigationbar />
      <div className="curd-grid">
        {isLoading ? (
          'Loading'
        ) : (
          <>
            {filteredRecipes.map((recipe, index) => (
              <div className="col-lg-4 mt-5 mx-4" key={index} onClick={() => handleCardClick(recipe._id)}>
                <Curd
                  Recipe={recipe}
                  index={index}
                  isActive={activeCard === index}
                  isBlurred={activeCard !== null && activeCard !== index}
                  onClick={() => setActiveCard(index)}
                />
              </div>
            ))}
            
            {followedRecipes.map((recipe, index) => (
              <div className="col-lg-4 mt-5 mx-4" key={index + filteredRecipes.length} onClick={() => handleCardClick(recipe._id)}>
                <Curd
                  Recipe={recipe}
                  index={index + filteredRecipes.length}
                  isActive={activeCard === index + filteredRecipes.length}
                  isBlurred={activeCard !== null && activeCard !== index + filteredRecipes.length}
                  onClick={() => setActiveCard(index + filteredRecipes.length)}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
