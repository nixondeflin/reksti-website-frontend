import { Box, Button, VStack } from '@chakra-ui/react'
import React from 'react'

const NavigationBar = () => {
  return (
    <Box
    width={['100%', '100%', '40%']}
    bg="#001F54"
    color="white"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="space-between"
    p={8}
  >
    <VStack spacing={8} align="flex-start" width="100%=">
      <Box textAlign="center" width="100%">
        <Text fontSize="2xl" fontWeight="bold">Tamu</Text>
      </Box>
      <VStack spacing={4} align="flex-start" width="100%">
        <Button
          as="a"
          href="#"
          variant="ghost"
          justifyContent="flex-start"
          leftIcon={<Icon as={FaUser} />}
          width="100%"
          color='white'
          _hover={{ bg: 'whiteAlpha' }}
        >
          Guest
        </Button>
        <Button
          as="a"
          href="#"
          variant="ghost"
          justifyContent="flex-start"
          leftIcon={<Icon as={FaList} />}
          width="100%"
          color='white'
          _hover={{ bg: 'whiteAlpha.300' }}
        >
          List Access
        </Button>
        <Button
          as="a"
          href="#"
          variant="ghost"
          justifyContent="flex-start"
          leftIcon={<Icon as={FaBell} />}
          width="100%"
          color='white'
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
      color='white'
      _hover={{ bg: 'whiteAlpha.300' }}
    >
      Logout
    </Button>
  </Box>
  )
}

export default NavigationBar