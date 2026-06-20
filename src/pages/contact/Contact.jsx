import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Link as ChakraLink,
  Circle,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaPaperPlane, FaUser } from "react-icons/fa";
import FloatingBackground from "../../components/FloatingBackground";
import config from "../../config";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const subtitleColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const inputBg = useColorModeValue("gray.50", "gray.700");

  const contactMethods = [
    {
      icon: FaLinkedin,
      title: "LinkedIn",
      value: "Connect with me",
      href: "https://linkedin.com/in/anyangateny1",
      color: "blue.600",
      gradient: "linear(to-r, blue.500, blue.700)",
    },
    {
      icon: FaGithub,
      title: "GitHub",
      value: "View my code",
      href: "https://github.com/anyangateny1",
      color: "gray.700",
      gradient: "linear(to-r, gray.600, gray.800)",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${config.apiBaseUrl}${config.endpoints.contact}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const errorData = await response.json().catch(() => ({}));
        if (errorData.message && errorData.message.includes("not verified")) {
          toast({
            title: "Contact form temporarily unavailable",
            description: "Please reach out directly via LinkedIn",
            status: "warning",
            duration: 8000,
            isClosable: true,
          });
        } else {
          throw new Error("Failed to send message");
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
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
    <Box
      minH="100vh"
      bg={useColorModeValue("gray.50", "gray.900")}
      position="relative"
      overflow="hidden"
    >
      <FloatingBackground variant="contact" />
      <Container
        maxW="container.xl"
        pt={8}
        pb={16}
        position="relative"
        zIndex={1}
      >
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16}>
          {/* Contact Form */}
          <Box>
            <Card
              bg={bgColor}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="3xl"
              boxShadow="0 10px 30px rgba(0,0,0,0.1)"
            >
              <CardBody p={10}>
                <VStack spacing={8} align="stretch">
                  <HStack spacing={4}>
                    <Circle size="60px" bg="green.500" color="white">
                      <Icon as={FaPaperPlane} boxSize={7} />
                    </Circle>
                    <Heading
                      as="h2"
                      size="xl"
                      color={textColor}
                      fontWeight="bold"
                    >
                      Send a Message
                    </Heading>
                  </HStack>

                  <Box as="form" onSubmit={handleSubmit}>
                    <VStack spacing={6}>
                      <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        spacing={6}
                        w="full"
                      >
                        <FormControl isRequired>
                          <FormLabel
                            color={textColor}
                            fontWeight="semibold"
                            fontSize="md"
                          >
                            Name
                          </FormLabel>
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
                            _hover={{ borderColor: "green.300" }}
                            _focus={{
                              borderColor: "green.500",
                              boxShadow: "0 0 0 1px green.500",
                            }}
                          />
                        </FormControl>

                        <FormControl isRequired>
                          <FormLabel
                            color={textColor}
                            fontWeight="semibold"
                            fontSize="md"
                          >
                            Email
                          </FormLabel>
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
                            _hover={{ borderColor: "green.300" }}
                            _focus={{
                              borderColor: "green.500",
                              boxShadow: "0 0 0 1px green.500",
                            }}
                          />
                        </FormControl>
                      </SimpleGrid>

                      <FormControl isRequired>
                        <FormLabel
                          color={textColor}
                          fontWeight="semibold"
                          fontSize="md"
                        >
                          Subject
                        </FormLabel>
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
                          _hover={{ borderColor: "green.300" }}
                          _focus={{
                            borderColor: "green.500",
                            boxShadow: "0 0 0 1px green.500",
                          }}
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel
                          color={textColor}
                          fontWeight="semibold"
                          fontSize="md"
                        >
                          Message
                        </FormLabel>
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
                          _hover={{ borderColor: "green.300" }}
                          _focus={{
                            borderColor: "green.500",
                            boxShadow: "0 0 0 1px green.500",
                          }}
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
                          bgGradient: "linear(to-r, green.600, teal.700)",
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
                    <Box h="4px" bgGradient={method.gradient} w="full" />
                    <CardBody p={8}>
                      <ChakraLink
                        href={method.href}
                        isExternal
                        _hover={{ textDecoration: "none" }}
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
                            <Heading
                              as="h3"
                              size="lg"
                              color={textColor}
                              fontWeight="bold"
                            >
                              {method.title}
                            </Heading>
                            <Text
                              color={subtitleColor}
                              fontSize="md"
                              fontWeight="medium"
                            >
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
