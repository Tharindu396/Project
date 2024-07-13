import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Select, Grid, GridItem, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import '../Styles/Form.css';

const Form = () => {
    const [recipe, setRecipe] = useState({
        name: '',
        ingredients: [""],
        steps: [""],
        image: '',
        link: '',
        description: '',
        category: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(null);
    const navigate = useNavigate();
    const toast = useToast();

    const handleChange = (e) => {
        if (e.target.dataset.type === "ingredient") {
            let items = [...recipe.ingredients];
            items[e.target.dataset.id] = e.target.value;
            setRecipe({ ...recipe, ingredients: items });
        } else if (e.target.dataset.type === "step") {
            let items = [...recipe.steps];
            items[e.target.dataset.id] = e.target.value;
            setRecipe({ ...recipe, steps: items });
        } else {
            setRecipe({ ...recipe, [e.target.name]: e.target.value });
        }
    }

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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/Recipe', recipe, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
        })
        .then(response => {
            console.log('Success:', response.data);
            setSubmissionSuccess(true);
            setShowModal(true);
        })
        .catch(error => {
            console.error('Error:', error);
            setSubmissionSuccess(false);
            setShowModal(true);
        });
    }

    const handleClose = () => setShowModal(false);
    const handleGoHome = () => {
        setShowModal(false);
        navigate('/');
    };

    return (
        <Box p={5} maxW="600px" mx="auto">
            <h1 className="recipe-title">Add Your Recipe Here</h1>
            <form onSubmit={handleSubmit} className="recipe-form">
                <FormControl isRequired mb={3}>
                    <FormLabel>Recipe Name:</FormLabel>
                    <Input type="text" name="name" onChange={handleChange} />
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
                                            data-id={idx}
                                            data-type="ingredient"
                                            id={ingredientId}
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
                    <Input type="text" name="image" onChange={handleChange} />
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
                                            data-id={idx}
                                            data-type="step"
                                            id={stepId}
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
                    <Input type="text" name="link" onChange={handleChange} />
                </FormControl>

                <FormControl isRequired mb={3}>
                    <FormLabel>Description:</FormLabel>
                    <Textarea name="description" onChange={handleChange} />
                </FormControl>

                <FormControl isRequired mb={3}>
                    <FormLabel>Category:</FormLabel>
                    <Select name="category" onChange={handleChange}>
                        <option value="">Select a category</option>
                        <option value="Healthy">Healthy</option>
                        <option value="Party">Party</option>
                    </Select>
                </FormControl>

                <Button type="submit" colorScheme="teal" mb={3}>Submit</Button>
            </form>

            <Modal isOpen={showModal} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{submissionSuccess ? 'Success!' : 'Error'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {submissionSuccess ? 'Your recipe has been added successfully. Do you want to go to the home page?' : 'There was an error submitting your recipe. Please try again.'}
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" onClick={handleClose}>
                            No
                        </Button>
                        {submissionSuccess && (
                            <Button colorScheme="blue" onClick={handleGoHome}>
                                Yes
                            </Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default Form;
