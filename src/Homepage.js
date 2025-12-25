import React from 'react';
import useResume from './hooks/useResume';
import { keyframes } from '@emotion/react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Container,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Card,
  CardBody,
  Avatar,
  Divider,
  Badge,
  Circle
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaJava, 
  FaCloud,
  FaAws, 
  FaGitAlt,
  FaExternalLinkAlt,
  FaPalette,
  FaProjectDiagram,
  FaTools,
  FaBug,
  FaWrench,
  FaRocket,
  FaCode,
  FaLightbulb,
  FaStar
} from 'react-icons/fa';
import { 
  SiCmake,
  SiJavascript, 
  SiTypescript, 
  SiDocker,
  SiSpringboot,
  SiVuedotjs,
  SiCplusplus,
  SiRust
} from 'react-icons/si';
import ProjectTiles from './components/projectTiles';
import { trackResumeDownload, trackButtonClick } from './utils/analytics';

const skillCategories = [
  {
    title: "Systems",
    icon: FaRocket,
    gradient: "linear(to-br, blue.400, purple.500)",
    skills: [
      { name: "C++", icon: SiCplusplus, color: "blue.600" },
      { name: "Python", icon: FaPython, color: "blue.500" },
      { name: "Multithreading", icon: FaProjectDiagram, color: "purple.500" }
    ]
  },
  {
   title: "Tooling",
    icon: FaTools,
    gradient: "linear(to-br, green.400, teal.500)",
    skills: [
      { name: "CMake", icon: SiCmake, color: "blue.500" },
      { name: "GDB", icon: FaBug, color: "green.500" },
      { name: "Git", icon: FaGitAlt, color: "red.600" }
    ]
  },
  {
    title: "Cloud",
    icon: FaCloud,
    gradient: "linear(to-br, orange.400, red.500)",
    skills: [
      { name: "AWS", icon: FaAws, color: "orange.400" },
      { name: "Docker", icon: SiDocker, color: "blue.500" },
    ]
  },
  {
    title: "Frontend",
    icon: FaPalette,
    gradient: "linear(to-br, purple.400, pink.500)",
    skills: [
      { name: "Vue.js", icon: SiVuedotjs, color: "green.500" },
      { name: "TypeScript", icon: SiTypescript, color: "blue.600" },
      { name: "React", icon: FaReact, color: "blue.400" }
    ]
  }
];

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

function FloatingElements() {
  const elements = [
    // Hero section (0-90vh)
    { icon: FaReact, color: "blue.400", size: "38px", top: "5vh", left: "12%" },
    { icon: SiCplusplus, color: "blue.600", size: "34px", top: "15vh", right: "15%" },
    { icon: SiVuedotjs, color: "green.400", size: "28px", top: "8vh", left: "50%" },
    { icon: FaGitAlt, color: "orange.500", size: "26px", top: "25vh", left: "75%" },
    { icon: FaJava, color: "red.500", size: "32px", top: "40vh", left: "8%" },
    { icon: SiTypescript, color: "blue.500", size: "30px", top: "35vh", right: "10%" },
    { icon: FaPython, color: "yellow.500", size: "34px", top: "70vh", left: "15%" },
    { icon: FaAws, color: "orange.400", size: "38px", top: "65vh", right: "12%" },
    
    // Skills section (90-180vh)
    { icon: SiDocker, color: "blue.400", size: "32px", top: "95vh", left: "80%" },
    { icon: SiSpringboot, color: "green.500", size: "30px", top: "105vh", left: "10%" },
    { icon: FaReact, color: "cyan.400", size: "28px", top: "115vh", right: "18%" },
    { icon: SiCplusplus, color: "blue.500", size: "26px", top: "125vh", left: "55%" },
    { icon: FaCloud, color: "blue.300", size: "34px", top: "140vh", left: "8%" },
    { icon: FaPython, color: "blue.500", size: "30px", top: "135vh", right: "10%" },
    { icon: SiTypescript, color: "blue.600", size: "28px", top: "150vh", left: "70%" },
    { icon: SiRust, color: "orange.700", size: "30px", top: "160vh", left: "25%" },
    
    // Projects section (180-280vh)
    { icon: FaAws, color: "orange.500", size: "32px", top: "185vh", right: "15%" },
    { icon: FaJava, color: "red.500", size: "34px", top: "195vh", left: "12%" },
    { icon: SiVuedotjs, color: "green.400", size: "30px", top: "210vh", right: "8%" },
    { icon: SiDocker, color: "blue.500", size: "28px", top: "220vh", left: "65%" },
    { icon: FaGitAlt, color: "orange.600", size: "32px", top: "235vh", left: "18%" },
    { icon: SiSpringboot, color: "green.600", size: "26px", top: "245vh", right: "22%" },
    { icon: FaReact, color: "blue.400", size: "34px", top: "260vh", left: "75%" },
    { icon: SiCplusplus, color: "blue.600", size: "30px", top: "270vh", left: "10%" }
  ];

  return (
    <Box position="absolute" top={0} left={0} right={0} height="280vh" overflow="visible" zIndex={0} pointerEvents="none">
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

function HeroSection() {
  const { resumeUrl, loading: resumeLoading } = useResume();
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');
  const gradientBg = useColorModeValue(
    'linear(to-r, blue.800, purple.900)',
    'linear(to-r, blue.800, purple.400)'
  );

  return (
    <Box position="relative" overflow="hidden" minH="90vh" display="flex" alignItems="center">
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
                Hi, I'm{' '}
                <Text
                  as="span"
                  bgGradient={gradientBg}
                  bgClip="text"
                  fontWeight="extrabold"
                >
                  Anyang Ateny
                </Text>
              </Heading>
              
              <Text
                fontSize="2xl"
                color="blue.500"
                fontWeight="semibold"
              >
              Graduate Software Engineer
              </Text>

              <Text
                fontSize="xl"
                color={subtitleColor}
                maxW="3xl"
                lineHeight="tall"
                fontWeight="medium"
              >
                Distributed Systems and Networking major with systems programming experience interested in learning and building innovative solutions to tackle interesting projects. 
              </Text>

            <HStack spacing={6} flexWrap="wrap" justify="center">
              <Button
                as="a"
                href={resumeUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<FaExternalLinkAlt />}
                size="lg"
                bgGradient="linear(to-r, blue.500, purple.600)"
                color="white"
                _hover={{
                  bgGradient: "linear(to-r, blue.600, purple.700)"
                }}
                borderRadius="full"
                px={10}
                py={6}
                fontSize="md"
                fontWeight="semibold"
                onClick={trackResumeDownload}
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
                  borderColor: 'blue.500'
                }}
                borderRadius="full"
                px={10}
                py={6}
                fontSize="md"
                fontWeight="semibold"
                borderWidth="2px"
                onClick={() => trackButtonClick('view_projects', 'hero_section')}
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
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');

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
            <Heading as="h2" size="2xl" color={textColor} fontWeight="extrabold" letterSpacing="tight">
              Skills & Technologies
            </Heading>
            <Text color={useColorModeValue('gray.600', 'gray.300')} fontSize="xl" maxW="2xl" fontWeight="medium">
              Technologies I'm learning and applying in my personal projects and work experience
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
                <Box
                  h="5px"
                  bgGradient={category.gradient}
                  w="full"
                />
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
                      <Heading as="h3" size="lg" color={textColor} fontWeight="bold" textAlign="center">
                        {category.title}
                      </Heading>
                    </VStack>
                    <Divider />
                    <VStack spacing={4} flex={1}>
                      {category.skills.map((skill) => (
                        <Box key={skill.name} w="full">
                          <HStack spacing={4} w="full" justify="start" p={2} borderRadius="lg">
                            <Icon as={skill.icon} color={skill.color} boxSize={5} />
                            <Text color={textColor} fontWeight="semibold" fontSize="md">
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
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');

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
            <Heading as="h2" size="2xl" color={textColor} fontWeight="extrabold" letterSpacing="tight">
              Featured Projects
            </Heading>
            <Text color={subtitleColor} fontSize="xl" maxW="2xl" fontWeight="medium">
              A showcase of my personal projects
            </Text>
          </VStack>

          <Box w="full">
            <ProjectTiles />
          </Box>

          <Button
            as={Link}
            to="/projects"
            rightIcon={<FaExternalLinkAlt />}
            size="lg"
            bgGradient="linear(to-r, purple.500, pink.600)"
            color="white"
            _hover={{
              bgGradient: "linear(to-r, purple.600, pink.700)"
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
      <FloatingElements />
      <Box position="relative" zIndex={1}>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
      </Box>
    </Box>
  );
}

export default Homepage;
