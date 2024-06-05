import React, { useState } from 'react';
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
  useToast,
  Link,
  Input,
  Select,
} from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import { useAccessList } from '../contexts/AccessListContext';

const ListAccessPage = () => {
  const {
    filteredAccessList,
    deleteGuest,
    updateGuestStatus,
    filterByDay,
    filterByWeek,
    sortAccessList
  } = useAccessList();
  const toast = useToast();
  const [date, setDate] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleDelete = (no) => {
    deleteGuest(no);
    toast({
      title: "Access item deleted.",
      description: `Access item with No ${no} has been deleted.`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateStatus = (no) => {
    updateGuestStatus(no);
    toast({
      title: "Access item updated.",
      description: `Access item with No ${no} has been updated to Out.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleFilterByDay = () => {
    filterByDay(date);
  };

  const handleFilterByWeek = () => {
    filterByWeek(date);
  };

  const handleSort = () => {
    console.log(sortField,sortOrder)
    sortAccessList(sortField, sortOrder);
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

          {/* Filter and Sort Controls */}
          <Flex mb={4}>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              mr={2}
            />
            <Button onClick={handleFilterByDay} mr={2}>
              Filter by Day
            </Button>
            <Button onClick={handleFilterByWeek} mr={2}>
              Filter by Week
            </Button>
           
          </Flex>
          <Flex mb={4}>
          <Select
              placeholder="Sort by"
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              mr={2}
            >
              <option value="Nama">Name</option>
              <option value="Datetime">Date Time</option>
              <option value="Status">Status</option>
            </Select>
            <Select
              placeholder="Order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              mr={2}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </Select>
            <Button onClick={handleSort}>Sort</Button>
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
                  <Th color="white">Status</Th>
                  <Th color="white">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredAccessList.map((item, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{item.Nama}</Td>
                    <Td>{item.Tujuan}</Td>
                    <Td>{item.Datetime}</Td>
                    <Td>
                      <Link href={item.FotoKTP} isExternal color="blue.500">
                        Link Photo
                      </Link>
                    </Td>
                    <Td>{item.Status}</Td>
                    <Td>
                      {item.Status === 'In' && (
                        <Button
                          colorScheme="blue"
                          onClick={() => handleUpdateStatus(item.no)}
                          mr={2}
                        >
                          Set to Out
                        </Button>
                      )}
                      <Button
                        colorScheme="red"
                        onClick={() => handleDelete(item.no)}
                      >
                        Delete
                      </Button>
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
