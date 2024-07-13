import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Select, Grid, GridItem, useToast } from '@chakra-ui/react';

const UpdateForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    const [recipe, setRecipe] = useState({
        name: '',
        ingredients: [],
        steps: [],
        image: '',
        link: '',
        description: '',
        category: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/Recipe/${id}`)
            .then(response => {
                setRecipe(response.data);
            })
            .catch(error => {
                console.error('Error fetching recipe:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("ingredients")) {
            const index = parseInt(name.split("[")[1].split("]")[0]);
            const updatedIngredients = [...recipe.ingredients];
            updatedIngredients[index] = value;
            setRecipe({ ...recipe, ingredients: updatedIngredients });
        } else if (name.startsWith("steps")) {
            const index = parseInt(name.split("[")[1].split("]")[0]);
            const updatedSteps = [...recipe.steps];
            updatedSteps[index] = value;
            setRecipe({ ...recipe, steps: updatedSteps });
        } else {
            setRecipe({ ...recipe, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/Recipe/${id}`, recipe, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
        })
            .then(response => {
                console.log('Success:', response.data);
                toast({
                    title: "Recipe Updated",
                    description: "Your recipe has been successfully updated.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                navigate(`/details/${id}`);
            })
            .catch(error => {
                console.error('Error:', error);
                toast({
                    title: "Error",
                    description: "An error occurred while updating your recipe. Please try again later.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            });
    };

    const addIngredient = () => {
        setRecipe((prevState) => ({
            ...prevState,
            ingredients: [...prevState.ingredients, ""],
        }));
    };

    const removeIngredient = (index) => {
        setRecipe((prevState) => ({
            ...prevState,
            ingredients: prevState.ingredients.filter((_, i) => i !== index),
        }));
    };

    const addStep = () => {
        setRecipe((prevState) => ({
            ...prevState,
            steps: [...prevState.steps, ""],
        }));
    };

    const removeStep = (index) => {
        setRecipe((prevState) => ({
            ...prevState,
            steps: prevState.steps.filter((_, i) => i !== index),
        }));
    };

    return (
        <Box p={5} maxW="600px" mx="auto">
            <h1 className="recipe-title">Update Your Recipe</h1>
            <form onSubmit={handleSubmit} className="recipe-form">
                <FormControl isRequired mb={3}>
                    <FormLabel>Recipe Name:</FormLabel>
                    <Input type="text" name="name" value={recipe.name} onChange={handleChange} />
                </FormControl>

                <FormControl mb={3}>
                    {recipe.ingredients.map((val, idx) => {
                        let ingredientId = `ingredient-${idx}`;
                        return (
                            <Box key={idx} mb={2}>
                                <FormLabel htmlFor={ingredientId}>{`Ingredient #${idx + 1}`}</FormLabel>
                                <Grid templateColumns="repeat(10, 1fr)" gap={2}>
                                    <GridItem colSpan={8}>
                                        <Input
                                            type="text"
                                            name={`ingredients[${idx}]`}
                                            value={recipe.ingredients[idx]}
                                            onChange={handleChange}
                                        />
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <Button type="button" colorScheme="red" onClick={() => removeIngredient(idx)}>Remove</Button>
                                    </GridItem>
                                </Grid>
                            </Box>
                        )
                    })}
                    <Button type="button" colorScheme="blue" onClick={addIngredient}>Add New Ingredient</Button>
                </FormControl>

                <FormControl isRequired mb={3}>
                    <FormLabel>Image URL:</FormLabel>
                    <Input type="text" name="image" value={recipe.image} onChange={handleChange} />
                </FormControl>

                <FormControl mb={3}>
                    {recipe.steps.map((val, idx) => {
                        let stepId = `step-${idx}`;
                        return (
                            <Box key={idx} mb={2}>
                                <FormLabel htmlFor={stepId}>{`Step #${idx + 1}`}</FormLabel>
                                <Grid templateColumns="repeat(10, 1fr)" gap={2}>
                                    <GridItem colSpan={8}>
                                        <Input
                                            type="text"
                                            name={`steps[${idx}]`}
                                            value={recipe.steps[idx]}
                                            onChange={handleChange}
                                        />
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <Button type="button" colorScheme="red" onClick={() => removeStep(idx)}>Remove</Button>
                                    </GridItem>
                                </Grid>
                            </Box>
                        )
                    })}
                    <Button type="button" colorScheme="blue" onClick={addStep}>Add New Step</Button>
                </FormControl>

                <FormControl isRequired mb={3}>
                    <FormLabel>Link:</FormLabel>
                    <Input type="text" name="link" value={recipe.link} onChange={handleChange} />
                </FormControl>

                <FormControl isRequired mb={3}>
                    <FormLabel>Description:</FormLabel>
                    <Textarea name="description" value={recipe.description} onChange={handleChange} />
                </FormControl>

                <FormControl isRequired mb={3}>
                    <FormLabel>Category:</FormLabel>
                    <Select name="category" value={recipe.category} onChange={handleChange}>
                        <option value="">Select a category</option>
                        <option value="Healthy">Healthy</option>
                        <option value="Party">Party</option>
                    </Select>
                </FormControl>

                <Button type="submit" colorScheme="teal" mb={3}>Update Recipe</Button>
            </form>
        </Box>
    );
}

export default UpdateForm;
