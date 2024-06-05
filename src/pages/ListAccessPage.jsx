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
  Link,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Sidebar from '../components/Sidebar';
import { useAccessList } from '../contexts/AccessListContext';

const ListAccessPage = () => {
  const { accessList, addAccessItem, deleteAccessItem } = useAccessList();
  const toast = useToast();


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
          </Flex>
          <TableContainer>
            <Table variant="simple" size="lg">
              <Thead bg="blue.900">
                <Tr>
                  <Th color="white">No</Th>
                  <Th color="white">Nama</Th>
                  <Th color="white">Tujuan</Th>
                  <Th color="white">Date Time</Th>
                  <Th color="white">Foto KTP</Th>
                </Tr>
              </Thead>
              <Tbody>
                {accessList.map((item, index) => (
                  <Tr key={index}>
                    <Td>{index+1}</Td>
                    <Td>{item.Nama}</Td>
                    <Td>{item.Tujuan}</Td>
                    <Td>{item.Datetime}</Td>
                    <Td>
                    <Link href={item.FotoKTP} isExternal color="blue.500">
                        Link Photo
                      </Link>
                    </Td>
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
