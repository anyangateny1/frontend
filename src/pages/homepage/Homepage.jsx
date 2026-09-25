import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import config from "../../config";

function HeroSection() {
  const textColor = useColorModeValue("gray.800", "white");
  const subtitleColor = useColorModeValue("gray.600", "gray.300");
  const projectsHoverBg = useColorModeValue("blue.50", "blue.900");

  return (
    <Box
      position="relative"
      overflow="hidden"
      h={{ base: "calc(100dvh - 68px)", md: "calc(100dvh - 88px)" }}
      display="flex"
      alignItems="center"
    >
      <Container maxW="container.xl" py={0} position="relative" zIndex={1}>
        <Box textAlign="center">
          <VStack spacing={6}>
            <Heading
              as="h1"
              size="3xl"
              color={textColor}
              fontWeight="extrabold"
              lineHeight="shorter"
              letterSpacing="tight"
            >
              Anyang Ateny
            </Heading>

            <Text fontSize="2xl" color="blue.600" fontWeight="semibold">
              Graduate Software Engineer
            </Text>

            <Text
              fontSize="xl"
              color={subtitleColor}
              maxW="3xl"
              lineHeight="tall"
              fontWeight="medium"
            >
              Distributed Systems and Networking major with systems programming
              experience interested in learning and building innovative
              solutions to tackle interesting projects.
            </Text>

            <HStack spacing={6} flexWrap="wrap" justify="center">
              <Button
                as="a"
                href={config.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<FaExternalLinkAlt />}
                size="lg"
                bgColor="blue.400"
                color="white"
                _hover={{
                  bgColor: "blue.500",
                }}
                borderRadius="full"
                px={10}
                py={6}
                fontSize="md"
                fontWeight="semibold"
              >
                View Resume
              </Button>

              <Button
                as={Link}
                to="/projects"
                variant="outline"
                colorScheme="blue"
                size="lg"
                _hover={{
                  borderColor: "blue.500",
                  bgColor: projectsHoverBg,
                }}
                borderRadius="full"
                px={10}
                py={6}
                fontSize="md"
                fontWeight="semibold"
                borderWidth="2px"
              >
                View Projects
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

function Homepage() {
  return (
    <Box position="relative" overflow="hidden">
      <Box position="relative" zIndex={1}>
        <HeroSection />
      </Box>
    </Box>
  );
}

export default Homepage;
