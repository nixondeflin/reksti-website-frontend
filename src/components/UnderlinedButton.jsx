import React from 'react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const UnderlinedButton = ({ children, to, ...props }) => {
  return (
    <Button
      as={Link}
      to={to}
      {...props}
      variant="ghost"
      _hover={{
        textDecoration: 'underline',
      }}
      _focus={{
        boxShadow: 'none',
        textDecoration: 'underline',
      }}
    >
      {children}
    </Button>
  );
};

export default UnderlinedButton;
