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
  Button,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Sidebar from '../components/Sidebar';
import { useAccessList } from '../contexts/AccessListContext';

const ListAccessPage = () => {
  const { accessList, addAccessItem, deleteAccessItem } = useAccessList();
  const toast = useToast();

  const handleAdd = () => {
    const newItem = {
      tamuID: 'AQ0002',
      cardID: 'ELIJA124',
      name: 'John Doe',
      guestResident: 'Guest',
      tujuan: '47 B',
      dateTime: '5/6/24 10:00',
      fotoKTP: 'link photo',
      status: 'IN',
    };
    addAccessItem(newItem);
    toast({
      title: "Access item added.",
      description: "A new access item has been added.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDelete = (no) => {
    deleteAccessItem(no);
    toast({
      title: "Access item deleted.",
      description: `Access item with No ${no} has been deleted.`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
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
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontSize="2xl" fontWeight="bold">List Access</Text>
            <IconButton
              icon={<AddIcon />}
              aria-label="Add Access"
              borderRadius="50%"
              bg="gray.200"
              _hover={{ bg: 'gray.300' }}
            />
          </Flex>
          <TableContainer>
            <Table variant="simple" size="lg">
              <Thead bg="blue.900">
                <Tr>
                  <Th color="white">No</Th>
                  <Th color="white">Tamu ID</Th>
                  <Th color="white">Card ID</Th>
                  <Th color="white">Nama</Th>
                  <Th color="white">Guest/Resident?</Th>
                  <Th color="white">Tujuan</Th>
                  <Th color="white">Date Time</Th>
                  <Th color="white">Foto KTP</Th>
                  <Th color="white">Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {accessList.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.no}</Td>
                    <Td>{item.tamuID}</Td>
                    <Td>{item.cardID}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.guestResident}</Td>
                    <Td>{item.tujuan}</Td>
                    <Td>{item.dateTime}</Td>
                    <Td>
                      <Button variant="link" colorScheme="blue">
                        {item.fotoKTP}
                      </Button>
                    </Td>
                    <Td>{item.status}</Td>
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

export default ListAccessPage;
