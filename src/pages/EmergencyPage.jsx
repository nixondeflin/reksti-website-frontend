import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Avatar,
  IconButton,
  Spinner,
  Alert,
  AlertIcon,
  SimpleGrid,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import Sidebar from '../components/Sidebar';
import { useEmergencies } from '../contexts/EmergenciesContext';
import { useAuth } from '../contexts/AuthenticationContext';

const EmergencyPage = () => {
  const { emergencies, loading, error, deleteEmergency, setEmergencies } = useEmergencies();
  const { users, setUsers } = useAuth();
  const [joinedData, setJoinedData] = useState([]);

  useEffect(() => {
    if (emergencies && users) {
      const joined = emergencies.map((emergency) => {
        const user = users.find((user) => user.UserID === emergency.UserID);
        return {
          ...emergency,
          ...user,
        };
      });
      setJoinedData(joined);
    }
  }, [emergencies, users]);

 

  const handleDelete = (id) => {
    deleteEmergency(id);
  };

  if (loading) {
    return (
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Flex>
    );
  }

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
          <SimpleGrid columns={[1, null, 2]} spacing={8}>
            {joinedData.length > 0 ? (
              joinedData.map((emergency) => (
                <Box
                  key={emergency.EmergencyID}
                  bg="red.600"
                  borderRadius="md"
                  p={4}
                  display="flex"
                  alignItems="center"
                  position="relative"
                >
                  <Avatar
                    size="xl"
                    name={`User ${emergency.UserID}`}
                    src={emergency.photo} // Replace with actual photo URL if available
                    marginRight={4}
                  />
                  <Box color="white">
                    <Text fontWeight="bold">User ID: {emergency.Alamat}</Text>
                    <Text>Emergency ID: {emergency.EmergencyID}</Text>
                    <Text>Date Time: {new Date(emergency.Timedate).toLocaleString()}</Text>
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
                    onClick={() => handleDelete(emergency.EmergencyID)}
                  />
                </Box>
              ))
            ) : (
              <Box p={4} bg="gray.100" borderRadius="md" textAlign="center">
                <Text fontSize="lg" fontWeight="bold" color="gray.600">
                  No Emergencies
                </Text>
              </Box>
            )}
          </SimpleGrid>
        </Box>
      </Flex>
    </Flex>
  );
};

export default EmergencyPage;
