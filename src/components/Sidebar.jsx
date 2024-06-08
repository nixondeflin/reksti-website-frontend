import React from 'react';
import { Box, Button, VStack, Icon, Text } from '@chakra-ui/react';
import { FaUser, FaList, FaBell, FaSignOutAlt, FaLock } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthenticationContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // Redirect to the login page after logout
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      height="100vh"
      width={['100%', '100%', '20%']}
      bg="#001F54"
      color="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      position="fixed"
      p={8}
    >
      <VStack spacing={8} align="flex-start" width="100%">
        <Box textAlign="center" width="100%">
          <Text fontSize="2xl" fontWeight="bold">Tamu</Text>
        </Box>
        <VStack spacing={4} align="flex-start" width="100%">
          <Button
            as={Link}
            to="/guest"
            variant="ghost"
            justifyContent="flex-start"
            leftIcon={<Icon as={FaUser} />}
            width="100%"
            color={isActive('/guest') ? 'yellow.400' : 'white'}
            _hover={{ bg: 'whiteAlpha.300' }}
          >
            Guest
          </Button>
          <Button
            as={Link}
            to="/list-access"
            variant="ghost"
            justifyContent="flex-start"
            leftIcon={<Icon as={FaList} />}
            width="100%"
            color={isActive('/list-access') ? 'yellow.400' : 'white'}
            _hover={{ bg: 'whiteAlpha.300' }}
          >
            List Access
          </Button>
          <Button
            as={Link}
            to="/resident"
            variant="ghost"
            justifyContent="flex-start"
            leftIcon={<Icon as={FaUser} />}
            width="100%"
            color={isActive('/resident') ? 'yellow.400' : 'white'}
            _hover={{ bg: 'whiteAlpha.300' }}
          >
            Resident
          </Button>
          <Button
            as={Link}
            to="/emergency"
            variant="ghost"
            justifyContent="flex-start"
            leftIcon={<Icon as={FaBell} />}
            width="100%"
            color={isActive('/emergency') ? 'yellow.400' : 'white'}
            _hover={{ bg: 'whiteAlpha.300' }}
          >
            Emergency
          </Button>
          <Button
            as={Link}
            to="/authorization"
            variant="ghost"
            justifyContent="flex-start"
            leftIcon={<Icon as={FaLock} />}
            width="100%"
            color={isActive('/authorization') ? 'yellow.400' : 'white'}
            _hover={{ bg: 'whiteAlpha.300' }}
          >
            Authorization
          </Button>
        </VStack>
      </VStack>
      <Button
        variant="ghost"
        justifyContent="flex-start"
        leftIcon={<Icon as={FaSignOutAlt} />}
        width="100%"
        color="white"
        _hover={{ bg: 'whiteAlpha.300' }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;
