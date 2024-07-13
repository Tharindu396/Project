import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../src/context/AuthContext';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, VStack, useToast, Flex, Link } from '@chakra-ui/react';
import '../src/Styles/Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
      toast({
        title: "Login failed.",
        description: "Invalid username or password.",
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
        className="login-container"
        p={9}
        maxW="800px"
        bg="white"
        boxShadow="md"
        borderRadius="md"
        zIndex={1}
      >
        <form onSubmit={handleLogin}>
          <VStack spacing={6}>
            <Heading as="h2" size="lg">Login</Heading>
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
            <Button type="submit" colorScheme="teal" width="full">Login</Button>
            <Text>
              Don't have an account? <Link color="teal.500" onClick={() => navigate('/signup')}>Sign Up</Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
