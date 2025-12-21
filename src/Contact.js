import React, { useState } from 'react';
import { keyframes } from '@emotion/react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Icon,
  SimpleGrid,
  Card,
  CardBody,
  useColorModeValue,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Link as ChakraLink,
  Circle,
} from '@chakra-ui/react';
import { 
  FaLinkedin,
  FaGithub,
  FaPaperPlane,
  FaUser,
  FaReact,
  FaPython,
  FaJava,
  FaAws,
  FaCloud
} from 'react-icons/fa';
import { 
  SiTypescript,
  SiDocker,
  SiCplusplus,
  SiRust,
  SiVuedotjs
} from 'react-icons/si';
import { trackContactFormSubmit, trackExternalLinkClick } from './utils/analytics';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

function FloatingElements() {
  const elements = [
    // Top area
    { icon: FaReact, color: "blue.400", size: "32px", top: "8vh", left: "8%" },
    { icon: SiCplusplus, color: "blue.600", size: "28px", top: "15vh", right: "10%" },
    { icon: SiVuedotjs, color: "green.400", size: "26px", top: "5vh", left: "50%" },
    // Middle area
    { icon: FaJava, color: "red.500", size: "30px", top: "35vh", left: "5%" },
    { icon: SiTypescript, color: "blue.500", size: "26px", top: "30vh", right: "8%" },
    { icon: SiRust, color: "orange.600", size: "28px", top: "45vh", left: "85%" },
    { icon: FaPython, color: "yellow.500", size: "30px", top: "55vh", left: "10%" },
    // Lower area
    { icon: FaAws, color: "orange.400", size: "32px", top: "65vh", right: "12%" },
    { icon: SiDocker, color: "blue.400", size: "28px", top: "75vh", left: "70%" },
    { icon: FaCloud, color: "blue.300", size: "30px", top: "85vh", left: "15%" }
  ];

  return (
    <Box position="absolute" top={0} left={0} right={0} height="100vh" overflow="visible" zIndex={0} pointerEvents="none">
      {elements.map((element, index) => (
        <Box
          key={index}
          position="absolute"
          top={element.top}
          left={element.left}
          right={element.right}
          animation={`${float} ${4 + index * 0.3}s ease-in-out infinite`}
          opacity={0.2}
        >
          <Icon as={element.icon} color={element.color} boxSize={element.size} />
        </Box>
      ))}
    </Box>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const inputBg = useColorModeValue('gray.50', 'gray.700');

  const contactMethods = [
    {
      icon: FaLinkedin,
      title: "LinkedIn",
      value: "Connect with me",
      href: "https://linkedin.com/in/anyangateny1",
      color: "blue.600",
      gradient: "linear(to-r, blue.500, blue.700)"
    },
    {
      icon: FaGithub,
      title: "GitHub",
      value: "View my code",
      href: "https://github.com/anyangateny1",
      color: "gray.700",
      gradient: "linear(to-r, gray.600, gray.800)"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://yhrh5asyof.execute-api.ap-southeast-2.amazonaws.com/prod/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Track successful form submission
        trackContactFormSubmit();
        
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Check if it's an email verification error
        const errorData = await response.json().catch(() => ({}));
        if (errorData.message && errorData.message.includes('not verified')) {
          toast({
            title: "Contact form temporarily unavailable",
            description: "Please reach out directly via LinkedIn",
            status: "warning",
            duration: 8000,
            isClosable: true,
          });
        } else {
          throw new Error('Failed to send message');
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Contact form temporarily unavailable",
        description: "Please reach out directly via LinkedIn",
        status: "warning",
        duration: 8000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} position="relative" overflow="hidden">
      <FloatingElements />
      <Container maxW="container.xl" pt={8} pb={16} position="relative" zIndex={1}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16}>
            {/* Contact Form */}
            <Box>
              <Card bg={bgColor} border="1px solid" borderColor={borderColor} borderRadius="3xl" boxShadow="0 10px 30px rgba(0,0,0,0.1)">
                <CardBody p={10}>
                  <VStack spacing={8} align="stretch">
                    <HStack spacing={4}>
                      <Circle size="60px" bg="green.500" color="white">
                        <Icon as={FaPaperPlane} boxSize={7} />
                      </Circle>
                      <Heading as="h2" size="xl" color={textColor} fontWeight="bold">
                        Send a Message
                      </Heading>
                    </HStack>

                    <Box as="form" onSubmit={handleSubmit}>
                      <VStack spacing={6}>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                          <FormControl isRequired>
                            <FormLabel color={textColor} fontWeight="semibold" fontSize="md">Name</FormLabel>
                            <Input
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Your full name"
                              bg={inputBg}
                              border="2px solid"
                              borderColor={borderColor}
                              borderRadius="xl"
                              h="12"
                              _hover={{ borderColor: 'green.300' }}
                              _focus={{ borderColor: 'green.500', boxShadow: '0 0 0 1px green.500' }}
                            />
                          </FormControl>

                          <FormControl isRequired>
                            <FormLabel color={textColor} fontWeight="semibold" fontSize="md">Email</FormLabel>
                            <Input
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="your.email@example.com"
                              bg={inputBg}
                              border="2px solid"
                              borderColor={borderColor}
                              borderRadius="xl"
                              h="12"
                              _hover={{ borderColor: 'green.300' }}
                              _focus={{ borderColor: 'green.500', boxShadow: '0 0 0 1px green.500' }}
                            />
                          </FormControl>
                        </SimpleGrid>

                        <FormControl isRequired>
                          <FormLabel color={textColor} fontWeight="semibold" fontSize="md">Subject</FormLabel>
                          <Input
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="What's this about?"
                            bg={inputBg}
                            border="2px solid"
                            borderColor={borderColor}
                            borderRadius="xl"
                            h="12"
                            _hover={{ borderColor: 'green.300' }}
                            _focus={{ borderColor: 'green.500', boxShadow: '0 0 0 1px green.500' }}
                          />
                        </FormControl>

                        <FormControl isRequired>
                          <FormLabel color={textColor} fontWeight="semibold" fontSize="md">Message</FormLabel>
                          <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Tell me about your project or idea..."
                            rows={6}
                            bg={inputBg}
                            border="2px solid"
                            borderColor={borderColor}
                            borderRadius="xl"
                            _hover={{ borderColor: 'green.300' }}
                            _focus={{ borderColor: 'green.500', boxShadow: '0 0 0 1px green.500' }}
                          />
                        </FormControl>

                        <Button
                          type="submit"
                          leftIcon={<FaPaperPlane />}
                          bgGradient="linear(to-r, green.500, teal.600)"
                          color="white"
                          size="lg"
                          w="full"
                          h="14"
                          isLoading={isSubmitting}
                          loadingText="Sending..."
                          _hover={{
                            bgGradient: "linear(to-r, green.600, teal.700)"
                          }}
                          borderRadius="xl"
                          fontSize="md"
                          fontWeight="semibold"
                        >
                          Send Message
                        </Button>
                      </VStack>
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
            </Box>

            {/* Contact Information */}
            <Box>
              <VStack spacing={8} align="stretch">
                <VStack spacing={6} textAlign="center">
                  <Badge
                    colorScheme="blue"
                    variant="subtle"
                    px={6}
                    py={3}
                    borderRadius="full"
                    fontSize="md"
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    <Icon as={FaUser} mr={2} />
                    Connect
                  </Badge>
                  <Text color={subtitleColor} fontSize="xl" fontWeight="medium">
                    Choose your preferred way to reach out
                  </Text>
                </VStack>

                <VStack spacing={6}>
                  {contactMethods.map((method) => (
                    <Card
                      key={method.title}
                      bg={bgColor}
                      border="1px solid"
                      borderColor={borderColor}
                      borderRadius="2xl"
                      overflow="hidden"
                      w="full"
                    >
                      <Box
                        h="4px"
                        bgGradient={method.gradient}
                        w="full"
                      />
                      <CardBody p={8}>
                        <ChakraLink 
                          href={method.href} 
                          isExternal 
                          _hover={{ textDecoration: 'none' }}
                          onClick={() => trackExternalLinkClick(method.title.toLowerCase(), method.href)}
                        >
                          <HStack spacing={6}>
                            <Circle
                              size="60px"
                              bgGradient={method.gradient}
                              color="white"
                            >
                              <Icon as={method.icon} boxSize={7} />
                            </Circle>
                            <VStack spacing={2} align="start" flex={1}>
                              <Heading as="h3" size="lg" color={textColor} fontWeight="bold">
                                {method.title}
                              </Heading>
                              <Text color={subtitleColor} fontSize="md" fontWeight="medium">
                                {method.value}
                              </Text>
                            </VStack>
                          </HStack>
                        </ChakraLink>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              </VStack>
            </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default Contact; 
