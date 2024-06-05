import React from 'react';
import { Input, InputGroup, InputLeftElement, FormControl, FormLabel, Box } from '@chakra-ui/react';

const UnderlineInput = ({ label, type = 'text', placeholder, value, onChange }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Box
          position="relative"
          width="100%"
          _after={{
            content: `""`,
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: '1px',
            bg: 'gray.300',
            transition: 'all 0.2s',
          }}
        >
          <Input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            variant="unstyled"
            borderBottom="1px"
            borderColor="transparent"
            _focus={{
              outline: 'none',
              borderColor: 'gray.300',
              boxShadow: 'none',
            }}
            _hover={{
              borderColor: 'gray.300',
            }}
          />
        </Box>
      </InputGroup>
    </FormControl>
  );
};

export default UnderlineInput;
