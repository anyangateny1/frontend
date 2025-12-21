import React from 'react';
import { keyframes } from '@emotion/react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Badge,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  FaCode,
  FaReact,
  FaPython,
  FaJava,
  FaAws,
  FaGitAlt,
  FaCloud
} from 'react-icons/fa';
import { 
  SiTypescript,
  SiDocker,
  SiCplusplus,
  SiRust,
  SiSpringboot,
  SiVuedotjs
} from 'react-icons/si';
import ProjectTiles from './components/projectTiles';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

function FloatingElements() {
  const elements = [
    // Top area
    { icon: FaReact, color: "blue.400", size: "34px", top: "5vh", left: "10%" },
    { icon: SiCplusplus, color: "blue.600", size: "30px", top: "12vh", right: "12%" },
    { icon: SiVuedotjs, color: "green.400", size: "26px", top: "8vh", left: "55%" },
    // Middle area
    { icon: FaJava, color: "red.500", size: "32px", top: "35vh", left: "8%" },
    { icon: SiTypescript, color: "blue.500", size: "28px", top: "40vh", right: "10%" },
    { icon: SiRust, color: "orange.600", size: "30px", top: "50vh", left: "70%" },
    { icon: FaPython, color: "yellow.500", size: "32px", top: "60vh", left: "15%" },
    // Lower area
    { icon: FaAws, color: "orange.400", size: "34px", top: "70vh", right: "5%" },
    { icon: SiSpringboot, color: "green.500", size: "28px", top: "90vh", left: "12%" },
    { icon: FaCloud, color: "blue.300", size: "32px", top: "95vh", right: "20%" }
  ];

  return (
    <Box position="absolute" top={0} left={0} right={0} height="120vh" overflow="visible" zIndex={0} pointerEvents="none">
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

function Projects() {
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} position="relative" overflow="hidden">
      <FloatingElements />
      <Container maxW="container.xl" pt={8} pb={16} position="relative" zIndex={1}>
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
          <Heading 
            as="h1" 
            size="2xl" 
            color={textColor} 
            fontWeight="extrabold"
          >
            My Projects
          </Heading>
          <Text 
            color={subtitleColor} 
            fontSize="lg" 
            maxW="2xl"
          >
            A collection of projects showcasing my skills and passion for development
          </Text>
        </VStack>

        {/* Projects Grid */}
        <ProjectTiles />
      </Container>
    </Box>
  );
}

export default Projects;
