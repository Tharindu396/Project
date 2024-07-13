import React, { useContext } from 'react';
import { Box, Flex, Image, Text, Button, Avatar, Link as ChakraLink, useColorModeValue, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Logo from '../assets/Logo.png';

function Navigationbar() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const bgColor = useColorModeValue('orange.600', 'orange.800');
  const navLinkColor = useColorModeValue('whiteAlpha.900', 'whiteAlpha.900');
  const navLinkHoverColor = useColorModeValue('yellow.400', 'yellow.500');
  const brandColor = useColorModeValue('yellow.300', 'yellow.400');
  const navLinkFontWeight = 'bold';

  const isActive = (path) => location.pathname === path;

  return (
    <Box bg={bgColor} py={3} px={8}>
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <NavLink to="/">
            <Image src={Logo} alt="Logo" h="4rem" w="6rem" />
          </NavLink>
          <Text ml={4} fontSize="2xl" fontWeight="bold" color={brandColor}>Recipe King</Text>
        </Flex>
        <Flex align="center">
          <NavLink to="/" exact>
            <ChakraLink
              as="span"
              mx={2}
              color={isActive('/') ? navLinkHoverColor : navLinkColor}
              _hover={{ color: navLinkHoverColor }}
              fontWeight={navLinkFontWeight}
            >
              HOME
            </ChakraLink>
          </NavLink>
          <NavLink to="/healthy">
            <ChakraLink
              as="span"
              mx={2}
              color={isActive('/healthy') ? navLinkHoverColor : navLinkColor}
              _hover={{ color: navLinkHoverColor }}
              fontWeight={navLinkFontWeight}
            >
              HEALTHY
            </ChakraLink>
          </NavLink>
          <NavLink to="/events">
            <ChakraLink
              as="span"
              mx={2}
              color={isActive('/events') ? navLinkHoverColor : navLinkColor}
              _hover={{ color: navLinkHoverColor }}
              fontWeight={navLinkFontWeight}
            >
              EVENTS
            </ChakraLink>
          </NavLink>
        </Flex>
        <Flex align="center">
          {isAuthenticated ? (
            <>
              <Menu>
                <MenuButton as={Button} bg="transparent" _hover={{ bg: 'transparent' }} _expanded={{ bg: 'transparent' }}>
                  <Flex align="center">
                    <Avatar src={user.image} name={user.username} size="sm" />
                    <Text ml={2} color={navLinkColor} fontWeight={navLinkFontWeight}>{user.username}</Text>
                  </Flex>
                </MenuButton>
                <MenuList zIndex={30}>
                  <MenuItem onClick={() => navigate('/profile')}>Go to Profile</MenuItem>
                  <MenuItem onClick={() => navigate('/editprofile')}>Edit Profile</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => navigate('/create')}>Add Recipe</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <NavLink to="/login">
              <Button colorScheme="teal">Login</Button>
            </NavLink>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navigationbar;
