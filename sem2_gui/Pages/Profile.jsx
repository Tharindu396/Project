import React, { useContext } from 'react';
import { Box, Avatar, Text, Flex, Button, Stack, Heading, SimpleGrid, Divider } from '@chakra-ui/react';
import { AuthContext } from '../src/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../src/Styles/Signup.css';

function Profile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className='dd'>
    <Box maxW="xl" mx="auto" p={5} h={100} bgSize="cover">
      <Flex direction="column" align="center" bg="white" p={6} borderRadius="md" boxShadow="md">
        <Avatar size="2xl" src={user.image} name={user.username} mb={4} />
        <Heading as="h2" size="xl" mb={2}>{user.username}</Heading>
        <Text fontSize="md" color="gray.500" mb={4} textAlign="center">{user.bio}</Text>
        
        <Stack direction="row" spacing={4} mt={4}>
          <Button colorScheme="teal" onClick={() => navigate('/editprofile')}>Edit Profile</Button>
          <Button colorScheme="orange" onClick={() => navigate('/create')}>Add Recipe</Button>
        </Stack>

        <Divider my={6} />

        <Box mt={6} width="100%">
          <Heading as="h3" size="md" mb={4} textAlign="center">Statistics</Heading>
          <SimpleGrid columns={2} spacing={10}>
            <Text><strong>Followers:</strong> {user.followers.length}</Text>
            <Text><strong>Following:</strong> {user.following.length}</Text>
            <Text><strong>Recipes Rated:</strong> {user.ratings.length}</Text>
            <Text><strong>Average Rating:</strong> {user.averageRating.toFixed(2)}</Text>
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
    </div>
  );
}

export default Profile;
