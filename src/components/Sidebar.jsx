import React from 'react';
import { Box, Button, VStack, Icon, Text } from '@chakra-ui/react';
import { FaUser, FaList, FaBell, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
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
            color="white"
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
            color="white"
            _hover={{ bg: 'whiteAlpha.300' }}
          >
            List Access
          </Button>
          <Button
            as={Link}
            to="/emergency"
            variant="ghost"
            justifyContent="flex-start"
            leftIcon={<Icon as={FaBell} />}
            width="100%"
            color="white"
            _hover={{ bg: 'whiteAlpha.300' }}
          >
            Emergency
          </Button>
        </VStack>
      </VStack>
      <Button
        variant="ghost"
        leftIcon={<Icon as={FaSignOutAlt} />}
        width="100%"
        color="white"
        _hover={{ bg: 'whiteAlpha.300' }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;
