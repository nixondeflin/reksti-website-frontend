import React from 'react';
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../contexts/AuthenticationContext';

const ResidentPage = () => {
  const { users, loading, error } = useAuth();

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
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Residences</Text>
          <TableContainer>
            <Table variant="simple" size="lg">
              <Thead bg="blue.900">
                <Tr>
                  <Th color="white">Nama</Th>
                  <Th color="white">Alamat</Th>
                  <Th color="white">Nomor Telepon</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((residence, index) => (
                  <Tr key={index}>
                    <Td>{residence.Nama}</Td>
                    <Td>{residence.Alamat}</Td>
                    <Td>{residence.NomorTelepon}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ResidentPage;
