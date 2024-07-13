import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Heading, Text, VStack, useToast, Flex, Link } from '@chakra-ui/react';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:3000/signup', { username, password, image, bio });
      navigate('/login');
    } catch (err) {
      setError('Failed to create an account');
      toast({
        title: "Account creation failed.",
        description: "Please check your details and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      position="relative"
      py={12} // Add padding top and bottom
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bgImage="url('https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1720310400&semt=sph')"
        bgSize="cover"
        bgPosition="center"
        filter="blur(5px)"
      />
      <Box
        className="signup-container"
        p={8}
        maxW="700px"
        bg="white"
        boxShadow="md"
        borderRadius="md"
        zIndex={1}
      >
        <form onSubmit={handleSignup}>
          <VStack spacing={6}>
            <Heading as="h2" size="lg">Sign Up</Heading>
            {error && <Text color="red.500">{error}</Text>}
            <FormControl isRequired>
              <FormLabel>Username:</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password:</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Confirm Password:</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Profile Image URL:</FormLabel>
              <Input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Bio:</FormLabel>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">Sign Up</Button>
            <Text>
              Already have an account? <Link color="teal.500" onClick={() => navigate('/login')}>Login</Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Signup;
