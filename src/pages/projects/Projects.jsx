import {
  Box,
  Container,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
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
      <Container
        maxW="container.xl"
        pt={8}
        pb={16}
        position="relative"
        zIndex={1}
      >
        {/* Header */}
        <VStack spacing={2} textAlign="center" mb={8}>
          <Heading as="h1" size="xl" color={textColor} fontWeight="extrabold">
            My Projects
          </Heading>
          <Text color={subtitleColor} fontSize="lg" maxW="2xl">
            A collection of projects showing some of the stuff I've been able to
            do.
          </Text>
        </VStack>

        {/* Projects Grid */}
        <ProjectTiles />
      </Container>
    </Box>
  );
}

export default Projects;
