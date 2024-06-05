import React from 'react';
import {
  Box,
  Flex,
  Text,
  Avatar,
  IconButton,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import Sidebar from '../components/Sidebar';

const EmergencyPage = () => {
  // Sample data for the emergency card
  const emergencyData = {
    name: 'Damian Marvel',
    contact: '+62 844 125460',
    emergencyID: 'EMER669',
    dateTime: '4/6/2024 23:15',
    address: 'Landmark Residence, 45 E',
    photo: 'https://via.placeholder.com/150', // Replace with actual photo URL
  };

  return (
    <Flex height="100vh" width="100vw">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Flex
        width={['100%', '100%', '80%']}
        ml={['0', '0', '20%']} 
        flexDirection="column"
        p={8}
        bg="gray.50"
        alignItems="center"
      >
        <Box width="100%" maxWidth="1200px">
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Emergency</Text>
          <Box
            bg="red.600"
            borderRadius="md"
            p={4}
            display="flex"
            alignItems="center"
            position="relative"
          >
            <Avatar
              size="xl"
              name={emergencyData.name}
              src={emergencyData.photo}
              marginRight={4}
            />
            <Box color="white">
              <Text fontWeight="bold">Nama: {emergencyData.name}</Text>
              <Text>Contact: {emergencyData.contact}</Text>
              <Text>Emergency ID: {emergencyData.emergencyID}</Text>
              <Text>Date Time: {emergencyData.dateTime}</Text>
              <Text>Address: {emergencyData.address}</Text>
            </Box>
            <IconButton
              icon={<CloseIcon />}
              aria-label="Close"
              position="absolute"
              top={2}
              right={2}
              size="sm"
              color="white"
              bg="red.700"
              _hover={{ bg: 'red.800' }}
            />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default EmergencyPage;
