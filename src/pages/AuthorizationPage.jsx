import React, { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import client from '../mqttService';
import Sidebar from '../components/Sidebar';

const AuthorizationPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleMessage = (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message.toString()}`);
      try {
        const payload = JSON.parse(message.toString());
        console.log('Parsed payload:', payload);
        const statusMessage = payload.status === "Authorized" ? "Authorized, gate opening" : "Access Denied";
        setMessage(statusMessage);
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    };

    client.on("message", handleMessage);
    client.on("connect", () => {
      console.log('Connected to MQTT broker');
    });
    client.on("error", (error) => {
      console.error('MQTT error:', error);
    });

    return () => {
      client.off("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <Flex width="100vw">
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
        <Box width="100%" maxWidth="800px">
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Resident Authorization</Text>
          <Box width="100%" height="200px" bg="gray.300" mb={8} display="flex" justifyContent="center" alignItems="center">
            <Text fontSize="xl" fontWeight="bold">{message}</Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default AuthorizationPage;
