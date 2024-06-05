import React, { useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Image, Text, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import UnderlineInput from '../components/UnderlineInput';
import UnderlinedButton from '../components/UnderlinedButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthenticationContext';

const LoginPage = ({ errmsg }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    const result = await login(username, password);
    console.log(result)
    if (result.success) {
      navigate('/guest'); // Navigate to the dashboard or home page on successful login
    } else {
      setError(result.error);
    }
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
          <Text mt={2}>Reliable system cluster <br/>management website is here!</Text>
        </Box>
      </Box>

      <Flex
        width={['100%', '100%', '65%']}
        alignItems="center"
        justifyContent="center"
        p={8}
      >
        <Box width="100%" maxWidth="md">
          {error && (
            <Alert status="error" marginBottom={4}>
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Box>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Text fontSize="5xl" fontWeight="bold" marginBottom={4} textAlign="left">Sign in</Text>
            <FormControl id="username" marginBottom={6}>
              <UnderlineInput
                type="text"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" marginBottom={6}>
              <UnderlineInput
                type="password" // Changed to password type
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Box marginY={8} marginX={10}>
                <Button type="submit" width="full" colorScheme="teal" marginBottom={2}>Sign in</Button>
                <UnderlinedButton
                    width="full"
                    colorScheme="teal"
                    marginBottom={2}
                    to="/signup" // Set the path to navigate to
                >
                    Register
                 </UnderlinedButton>
            </Box>
     
          </form>
        </Box>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
