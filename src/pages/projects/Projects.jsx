import {
  Badge,
  Box,
  Container,
  Heading,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaCode } from "react-icons/fa";
import FloatingBackground from "../../components/FloatingBackground";
import ProjectTiles from "../../components/ProjectTiles";

function Projects() {
  const textColor = useColorModeValue("gray.800", "white");
  const subtitleColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("gray.50", "gray.900")}
      position="relative"
      overflow="hidden"
    >
      <FloatingBackground variant="projects" />
      <Container
        maxW="container.xl"
        pt={8}
        pb={16}
        position="relative"
        zIndex={1}
      >
        {/* Header */}
        <VStack spacing={4} textAlign="center" mb={10}>
          <Badge
            colorScheme="purple"
            variant="subtle"
            px={6}
            py={2}
            borderRadius="full"
            fontSize="sm"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            <Icon as={FaCode} mr={2} />
            Portfolio
          </Badge>
          <Heading as="h1" size="2xl" color={textColor} fontWeight="extrabold">
            My Projects
          </Heading>
          <Text color={subtitleColor} fontSize="lg" maxW="2xl">
            A collection of projects showcasing my skills and passion for
            development
          </Text>
        </VStack>

        {/* Projects Grid */}
        <ProjectTiles />
      </Container>
    </Box>
  );
}

export default Projects;
