import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  HStack,
  useToast,
  Image
} from '@chakra-ui/react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { useAccessList } from '../contexts/AccessListContext';

const GuestPage = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [need, setNeed] = useState('');
  const [resident, setResident] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const { addAccessItem } = useAccessList(); // Get the addAccessItem function from context
  const toast = useToast();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'your_upload_preset'); // replace with your upload preset
    formData.append('cloud_name', 'your_cloud_name'); // replace with your cloud name

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', // replace with your cloud name
        formData
      );
      setImageUrl(res.data.url);
      return res.data.url;
    } catch (error) {
      console.error('Error uploading image', error);
      toast({
        title: "Image upload failed.",
        description: "There was an error uploading the image.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedImageUrl = await handleImageUpload();
    if (!uploadedImageUrl) return;

    // Create a new item to add
    const newItem = {
      tamuID: 'AQ0002', // You might want to generate this ID dynamically
      cardID: 'ELIJA124', // You might want to generate this ID dynamically
      name,
      guestResident: resident,
      tujuan: address,
      dateTime: new Date().toLocaleString(), // Current date and time
      fotoKTP: uploadedImageUrl, // Use the URL of the uploaded image
      status: 'IN',
    };
    addAccessItem(newItem);
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
    setContact('');
    setAddress('');
    setNeed('');
    setResident('');
    setImage(null);
    setImageUrl('');
  };

  return (
    <Flex height="100vh" width="100vw">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Flex
        width={['100%', '100%', '60%']}
        flexDirection="column"
        p={8}
        bg="gray.50"
        alignItems="center"
      >
        <Box width="100%" maxWidth="800px">
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Scan KTP</Text>
          <Box width="100%" height="200px" bg="gray.300" mb={8}>
            {imageUrl && <Image src={imageUrl} alt="Uploaded Image" />}
          </Box>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl id="image">
                <FormLabel>Upload Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </FormControl>
              <HStack width="100%" spacing={4}>
                
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="eg. Alan Sleeper"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="contact">
                  <FormLabel>Contact</FormLabel>
                  <Input
                    type="text"
                    placeholder="Phone number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </FormControl>
              </HStack>
              <FormControl id="address">
                <FormLabel>Destination Address</FormLabel>
                <Input
                  type="text"
                  placeholder="eg. alaa.mohamed"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
              <FormControl id="need">
                <FormLabel>Need</FormLabel>
                <Input
                  type="text"
                  placeholder="Reason for visit"
                  value={need}
                  onChange={(e) => setNeed(e.target.value)}
                />
              </FormControl>
              <FormControl id="resident">
                <FormLabel>Resident / Guest?</FormLabel>
                <Input
                  type="text"
                  placeholder="eg. Resident"
                  value={resident}
                  onChange={(e) => setResident(e.target.value)}
                />
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
