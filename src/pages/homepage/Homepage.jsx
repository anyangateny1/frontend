import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Circle,
  Container,
  Divider,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {
  FaAws,
  FaBug,
  FaExternalLinkAlt,
  FaGitAlt,
  FaPalette,
  FaProjectDiagram,
  FaPython,
  FaReact,
  FaRocket,
  FaStar,
  FaTools,
} from "react-icons/fa";
import {
  SiCmake,
  SiCplusplus,
  SiDocker,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { Link } from "react-router-dom";
import FloatingBackground from "../../components/FloatingBackground";
import ProjectTiles from "../../components/ProjectTiles";
import useResume from "../../hooks/useResume";

const skillCategories = [
  {
    title: "Systems",
    icon: FaRocket,
    gradient: "linear(to-br, blue.400, purple.500)",
    skills: [
      { name: "C++", icon: SiCplusplus, color: "blue.600" },
      { name: "Python", icon: FaPython, color: "blue.500" },
      { name: "Multithreading", icon: FaProjectDiagram, color: "purple.500" },
    ],
  },
  {
    title: "Tooling",
    icon: FaTools,
    gradient: "linear(to-br, green.400, teal.500)",
    skills: [
      { name: "CMake", icon: SiCmake, color: "blue.500" },
      { name: "GDB", icon: FaBug, color: "green.500" },
      { name: "Git", icon: FaGitAlt, color: "red.600" },
    ],
  },
  {
    title: "Cloud",
    icon: FaRocket,
    gradient: "linear(to-br, orange.400, red.500)",
    skills: [
      { name: "AWS", icon: FaAws, color: "orange.400" },
      { name: "Docker", icon: SiDocker, color: "blue.500" },
    ],
  },
  {
    title: "Frontend",
    icon: FaPalette,
    gradient: "linear(to-br, purple.400, pink.500)",
    skills: [
      { name: "Vue.js", icon: SiVuedotjs, color: "green.500" },
      { name: "TypeScript", icon: SiTypescript, color: "blue.600" },
      { name: "React", icon: FaReact, color: "blue.400" },
    ],
  },
];

function HeroSection() {
  const { resumeUrl, loading: resumeLoading } = useResume();
  const textColor = useColorModeValue("gray.800", "white");
  const subtitleColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box
      position="relative"
      overflow="hidden"
      minH="90vh"
      display="flex"
      alignItems="center"
    >
      <Container maxW="container.xl" py={16} position="relative" zIndex={1}>
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

            <Text fontSize="2xl" color="blue.500" fontWeight="semibold">
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
                href={resumeUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<FaExternalLinkAlt />}
                size="lg"
                bgGradient="linear(to-r, blue.500, purple.600)"
                color="white"
                _hover={{
                  bgGradient: "linear(to-r, blue.600, purple.700)",
                }}
                borderRadius="full"
                px={10}
                py={6}
                fontSize="md"
                fontWeight="semibold"
                isLoading={resumeLoading}
                isDisabled={!resumeUrl && !resumeLoading}
              >
                View Resume
              </Button>

              <Button
                as="a"
                href="#projects"
                variant="outline"
                colorScheme="blue"
                size="lg"
                _hover={{
                  borderColor: "blue.500",
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

function SkillsSection() {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box py={24} position="relative">
      <Container maxW="container.xl">
        <VStack spacing={16}>
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
              <Icon as={FaStar} mr={2} />
              Technical Expertise
            </Badge>
            <Heading
              as="h2"
              size="2xl"
              color={textColor}
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              Skills &amp; Technologies
            </Heading>
            <Text
              color={useColorModeValue("gray.600", "gray.300")}
              fontSize="xl"
              maxW="2xl"
              fontWeight="medium"
            >
              Technologies I'm learning and applying in my personal projects and
              work experience
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
            {skillCategories.map((category) => (
              <Card
                key={category.title}
                bg={bgColor}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="3xl"
                overflow="hidden"
                h="full"
              >
                <Box h="5px" bgGradient={category.gradient} w="full" />
                <CardBody p={8} h="full">
                  <VStack spacing={6} align="stretch" h="full">
                    <VStack spacing={4}>
                      <Circle
                        size="60px"
                        bgGradient={category.gradient}
                        color="white"
                      >
                        <Icon as={category.icon} boxSize={7} />
                      </Circle>
                      <Heading
                        as="h3"
                        size="lg"
                        color={textColor}
                        fontWeight="bold"
                        textAlign="center"
                      >
                        {category.title}
                      </Heading>
                    </VStack>
                    <Divider />
                    <VStack spacing={4} flex={1}>
                      {category.skills.map((skill) => (
                        <Box key={skill.name} w="full">
                          <HStack
                            spacing={4}
                            w="full"
                            justify="start"
                            p={2}
                            borderRadius="lg"
                          >
                            <Icon
                              as={skill.icon}
                              color={skill.color}
                              boxSize={5}
                            />
                            <Text
                              color={textColor}
                              fontWeight="semibold"
                              fontSize="md"
                            >
                              {skill.name}
                            </Text>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}

function ProjectsSection() {
  const textColor = useColorModeValue("gray.800", "white");
  const subtitleColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box py={24} id="projects" position="relative">
      <Container maxW="container.xl">
        <VStack spacing={16}>
          <VStack spacing={6} textAlign="center">
            <Badge
              colorScheme="purple"
              variant="subtle"
              px={6}
              py={3}
              borderRadius="full"
              fontSize="md"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              <Icon as={FaRocket} mr={2} />
              Portfolio
            </Badge>
            <Heading
              as="h2"
              size="2xl"
              color={textColor}
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              Featured Projects
            </Heading>
            <Text
              color={subtitleColor}
              fontSize="xl"
              maxW="2xl"
              fontWeight="medium"
            >
              A showcase of some of my personal projects
            </Text>
          </VStack>

          <Box w="full">
            <ProjectTiles limit={3} />
          </Box>

          <Button
            as={Link}
            to="/projects"
            rightIcon={<FaExternalLinkAlt />}
            size="lg"
            bgGradient="linear(to-r, purple.500, pink.600)"
            color="white"
            _hover={{
              bgGradient: "linear(to-r, purple.600, pink.700)",
            }}
            borderRadius="full"
            px={10}
            py={6}
            fontSize="md"
            fontWeight="semibold"
          >
            View All Projects
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}

function Homepage() {
  return (
    <Box position="relative" overflow="hidden">
      <FloatingBackground variant="homepage" />
      <Box position="relative" zIndex={1}>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
      </Box>
    </Box>
  );
}

export default Homepage;
