import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigationbar from '../src/Components/Navigationbar';
import axios from 'axios';
import { 
  Box, 
  Button, 
  Heading, 
  Text, 
  Image, 
  UnorderedList, 
  ListItem, 
  Spinner, 
  VStack, 
  HStack, 
  Divider,
  Textarea,
  Flex,
  Avatar,
  Tag,
  useColorModeValue
} from '@chakra-ui/react';
import { AuthContext } from '../src/context/AuthContext';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);

  const getRecipeDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/Recipe/${id}`);
      setRecipe(response.data);
      setIsLoading(false);
      if (response.data.userId.followers.includes(user._id)) {
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('API call error:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecipeDetails();
  }, [id]);

  const handleUpdate = () => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/Recipe/${id}`, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
      });
      navigate('/');
    } catch (error) {
      console.error('API call error:', error);
    }
  };

  const handleRate = async (rating) => {
    if (recipe.userId && recipe.userId._id === user._id) {
      console.log("You cannot rate your own recipe");
      return;
    }
    try {
      await axios.post(`http://localhost:3000/Recipe/${recipe._id}/rate`, { rating, comment }, {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      setComment(""); // Clear comment input after submitting
      // Handle success (e.g., refresh the recipe rating)
      getRecipeDetails(); // Refresh recipe details to update rating
    } catch (error) {
      console.error('Error rating recipe:', error);
    }
  };

  const handleFollow = async () => {
    try {
      await axios.post(`http://localhost:3000/users/${recipe.userId._id}/follow`, {}, {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      setIsFollowing(true);
      getRecipeDetails();
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.post(`http://localhost:3000/users/${recipe.userId._id}/unfollow`, {}, {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      setIsFollowing(false);
      getRecipeDetails();
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  if (isLoading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Spinner size="xl" />
    </Box>;
  }

  if (!recipe) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Text fontSize="xl">Recipe not found</Text>
    </Box>;
  }

  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  const steps = Array.isArray(recipe.steps) ? recipe.steps : [];
  
  const bg = useColorModeValue('white', 'gray.800');
  const boxShadow = useColorModeValue('md', 'dark-lg');

  return (
    <div>
      <Navigationbar />
      <Box p={8} maxW="3xl" mx="auto" bg={bg} boxShadow={boxShadow} borderRadius="lg">
        <Flex justify="space-between" align="center" mb={6}>
          <Box textAlign="center">
            <Heading as="h1" size="2xl" color="teal.500">{recipe.name}</Heading>
            <Text fontSize="lg" color="gray.500" mt={2}>{recipe.description}</Text>
            <HStack justifyContent="center" mt={2}>
              <Tag size="lg" colorScheme="teal">{recipe.category}</Tag>
              <Divider orientation="vertical" />
              <Tag size="lg" colorScheme="yellow">{recipe.rating.toFixed(1)} Stars</Tag>
            </HStack>
          </Box>
          <Flex align="center">
            <Avatar src={recipe.userId.image} name={recipe.userId.username} size="lg" />
            <Box ml={3}>
              <Text fontWeight="bold" fontSize="lg">{recipe.userId.username}</Text>
            </Box>
            {isAuthenticated && recipe.userId && user && recipe.userId._id !== user._id && (
              <Button
                ml={4}
                onClick={isFollowing ? handleUnfollow : handleFollow}
                colorScheme={isFollowing ? "red" : "green"}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </Flex>
        </Flex>
        <Image src={recipe.image} alt={recipe.name} borderRadius="md" mb={6} />
        <VStack align="start" spacing={4}>
          <Box>
            <Heading as="h2" size="lg" mb={2} color="teal.600">Ingredients</Heading>
            <UnorderedList pl={4} spacing={2}>
              {ingredients.map((ingredient, index) => (
                <ListItem key={index} fontSize="md">{ingredient}</ListItem>
              ))}
            </UnorderedList>
          </Box>
          <Box>
            <Heading as="h2" size="lg" mb={2} color="teal.600">Preparation</Heading>
            <VStack align="start" spacing={6}>
              {steps.map((step, index) => (
                <Box key={index}>
                  <Heading as="h3" size="md" color="teal.600">Step {index + 1}</Heading>
                  <Text fontSize="md">{step}</Text>
                </Box>
              ))}
            </VStack>
          </Box>
        </VStack>
        {isAuthenticated && recipe.userId && user && recipe.userId._id === user._id && (
          <HStack spacing={4} mt={6}>
            <Button onClick={handleUpdate} colorScheme="blue">Update</Button>
            <Button onClick={handleDelete} colorScheme="red">Delete</Button>
          </HStack>
        )}
        {isAuthenticated && recipe.userId && user && recipe.userId._id !== user._id && (
          <Box mt={6} p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md" boxShadow={boxShadow}>
            <Heading as="h2" size="lg" mb={4} color="teal.600">Rate this recipe</Heading>
            <Textarea 
              placeholder="Leave a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              mb={4}
            />
            <HStack spacing={2}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button key={rating} onClick={() => handleRate(rating)}>{rating} Star</Button>
              ))}
            </HStack>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Details;
