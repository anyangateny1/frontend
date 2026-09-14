import {
  Box,
  Button,
  Link as ChakraLink,
  Container,
  Heading,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import config from "../../config";

const EMPTY_FORM = { name: "", email: "", message: "" };

function Contact() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const mutedColor = useColorModeValue("gray.600", "gray.400");
  const inputBg = useColorModeValue("white", "gray.800");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${config.apiBaseUrl}${config.endpoints.contact}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to send message");
      }

      toast({
        title: "Sent.",
        description: "I'll get back to you when I can.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFormData(EMPTY_FORM);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Didn't go through",
        description: "LinkedIn or GitHub works too.",
        status: "warning",
        duration: 8000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxW="container.sm" py={16}>
      <VStack spacing={2} align="start" mb={2}>
        <Heading as="h1" size="lg">
          Say Hi
        </Heading>
        <Text color={mutedColor}>
          Drop me a message below, or reach out on{" "}
          <ChakraLink
            href="https://linkedin.com/in/anyangateny1"
            isExternal
            fontWeight="medium"
          >
            LinkedIn
          </ChakraLink>{" "}
          or{" "}
          <ChakraLink
            href="https://github.com/anyangateny1"
            isExternal
            fontWeight="medium"
          >
            GitHub
          </ChakraLink>
          .
        </Text>
      </VStack>

      <Box as="form" onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
            bg={inputBg}
            size="md"
          />
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            bg={inputBg}
            size="md"
          />
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="What's up?"
            required
            rows={6}
            bg={inputBg}
            resize="vertical"
          />
          <Button
            type="submit"
            colorScheme="blue"
            bgColor="blue.400"
            isLoading={isSubmitting}
            loadingText="Sending..."
            alignSelf="flex-start"
          >
            Send Message
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}

export default Contact;
