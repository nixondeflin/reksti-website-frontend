import React, { useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Image, Text, Alert, AlertIcon, AlertTitle, AlertDescription, Stack } from '@chakra-ui/react';
import UnderlineInput from '../components/UnderlineInput';
import UnderlinedButton from '../components/UnderlinedButton';

const SignupPage = ({ errmsg }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send data to the backend
  };

  return (
    <Flex height="100vh" width="100vw">
      <Box
        width={['100%', '100%', '35%']}
        bg="#001F54"
        color="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={8}
      >
        <Box textAlign="center">
          <Image src="rumahku.png" alt="rumahku Logo" width="200px" marginBottom={4} />
          <Text mt={2}>Reliable system cluster <br />management website is here!</Text>
        </Box>
      </Box>

      <Flex
        width={['100%', '100%', '65%']}
        alignItems="center"
        justifyContent="center"
        p={8}
      >
        <Box width="100%" maxWidth="md">
          {errmsg && (
            <Alert status="error" marginBottom={4}>
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errmsg}</AlertDescription>
              </Box>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Text fontSize="5xl" fontWeight="bold" marginBottom={4} textAlign="left">Register</Text>
            <FormControl id="name" marginBottom={6}>
              <UnderlineInput
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                marginBottom="4"
              />
            </FormControl>
            <FormControl id="username" marginBottom={6}>
              <UnderlineInput
                type="text"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                marginBottom="4"
              />
            </FormControl>
            <FormControl id="password" marginBottom={6}>
              <UnderlineInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                marginBottom="4"
              />
            </FormControl>
            <FormControl id="confirmpassword" marginBottom={6}>
              <UnderlineInput
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                marginBottom="4"
              />
            </FormControl>
            <Box marginY={8} marginX={10}>
              <Button type="submit" width="full" colorScheme="teal" marginBottom={2}>Sign Up</Button>
              <UnderlinedButton
                  width="full"
                  colorScheme="teal"
                  marginBottom={2}
                  to="/login" // Set the path to navigate to
                >
                  Login
              </UnderlinedButton>
            </Box>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
};

export default SignupPage;
