import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Text,
  VStack,
  HStack,
  useToast,
  Image,
  Select
} from '@chakra-ui/react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { useAccessList } from '../contexts/AccessListContext';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../contexts/AuthenticationContext';

const GuestPage = () => {
  const [name, setName] = useState('');
  const [need, setNeed] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({});
  const { addAccessItem,accessList,uploadPhoto, addGuest } = useAccessList(); // Get the addAccessItem function from context
  const toast = useToast();
  const fileInputRef = useRef(null);
  const { users, loading, error } = useAuth();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!need) newErrors.need = "Need is required";
    if (!image) newErrors.image = "Image is required"; 
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const generateRandomNumber = (min = 0, max = 1000000) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const uploadedImageUrl = await uploadPhoto(image);
    // setImageUrl(uploadedImageUrl)
    // Create a new item to add
    const newItem = {
      No: generateRandomNumber(),
      Nama:name,
      Tujuan: need,
      Datetime: new Date().toLocaleString(), // Current date and time
      FotoKTP: uploadedImageUrl, // Use the URL of the uploaded image
    };
    const postResult = await addGuest(newItem);
    console.log(postResult)
    toast({
      title: "Guest added.",
      description: "The new guest has been added to the access list.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    // Reset form fields
    handleReset();
  };

  const handleReset = () => {
    setName('');
    setNeed('');
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input value
    }
    setErrors({});
  };

  return (
    <Flex width="100vw">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Flex
        width={['100%', '100%', '60%']}
        height="100vh"
        ml={['0', '0', '20%']} 
        flexDirection="column"
        p={8}
        alignItems="center"
      >
        <Box width="100%" maxWidth="800px">
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Scan KTP</Text>
          {/* <Box width="100%" height="200px" bg="gray.300" mb={8}>
            {imageUrl && <Image src={imageUrl} alt="Uploaded Image" />}
          </Box> */}
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
            <FormControl id="image" isInvalid={errors.image}>
                <FormLabel>Upload Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />
                <FormErrorMessage>{errors.image}</FormErrorMessage>
              </FormControl>
              <HStack width="100%" spacing={4}>
                <FormControl id="name" isInvalid={errors.name}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="eg. Alan Sleeper"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
               
              </HStack>
              {/* <FormControl id="need" isInvalid={errors.need}>
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  placeholder="Destination Address"
                  value={need}
                  onChange={(e) => setNeed(e.target.value)}
                />
                <FormErrorMessage>{errors.need}</FormErrorMessage>
              </FormControl> */}
                      <FormControl id="need" isInvalid={errors.need}>
                <FormLabel>Destination</FormLabel>
                <Select
                  placeholder="Select destination"
                  value={need}
                  onChange={(e) => setNeed(e.target.value)}
                >
                  {users&&users.map((user) => (
                    <option key={user.id} value={user.Alamat}>
                      {user.Alamat}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.need}</FormErrorMessage>
              </FormControl>
 
            </VStack>
            <HStack spacing={4} mt={8}>
              <Button onClick={handleReset} colorScheme="gray">
                Reset
              </Button>
              <Button type="submit" colorScheme="blue">
                Add
              </Button>
            </HStack>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
};

export default GuestPage;
