import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaCode } from "react-icons/fa";
import useProjects from "../hooks/useProjects";
import ProjectImage from "./ProjectImage";

// Marquee component for tags that overflow
const TagMarquee = ({ tags }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);

  const checkOverflow = useCallback(() => {
    if (containerRef.current && contentRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const scrollWidth = contentRef.current.scrollWidth;
      const needsMarquee = scrollWidth > containerWidth || tags.length > 2;
      setShouldAnimate(needsMarquee);
      setContentWidth(scrollWidth);
    }
  }, [tags.length]);

  useEffect(() => {
    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [checkOverflow, tags]);

  const renderBadges = () =>
    tags.map((tag, tagIndex) =>
      tag ? (
        <Badge
          key={tagIndex}
          colorScheme="blue"
          variant="subtle"
          fontSize="xs"
          px={3}
          py={1}
          borderRadius="full"
          fontWeight="semibold"
          flexShrink={0}
          whiteSpace="nowrap"
          letterSpacing="wide"
          textTransform="uppercase"
        >
          {tag}
        </Badge>
      ) : null,
    );

  if (!shouldAnimate) {
    return (
      <Box ref={containerRef} overflow="hidden" width="100%">
        <HStack ref={contentRef} spacing={2} flexWrap="nowrap">
          {renderBadges()}
        </HStack>
      </Box>
    );
  }

  // Animation duration scales with content width for consistent speed
  const duration = Math.max(8, contentWidth / 30);

  return (
    <Box
      ref={containerRef}
      overflow="hidden"
      width="100%"
      position="relative"
      className="tag-marquee-container"
      sx={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <HStack
        ref={contentRef}
        spacing={2}
        flexWrap="nowrap"
        className="tag-marquee"
        sx={{
          display: "inline-flex",
          animation: `marquee ${duration}s linear infinite`,
          "&:hover": {
            animationPlayState: "paused",
          },
          "@keyframes marquee": {
            "0%": { transform: "translateX(0)" },
            "100%": { transform: `translateX(-50%)` },
          },
        }}
      >
        {/* Duplicate content for seamless loop */}
        {renderBadges()}
        {renderBadges()}
      </HStack>
    </Box>
  );
};

const ProjectTiles = ({ limit }) => {
  const { projects, error, loading } = useProjects();
  const displayProjects = limit ? projects.slice(0, limit) : projects;
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  if (loading) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {[1, 2, 3].map((index) => (
          <Card
            key={index}
            bg={bgColor}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="2xl"
            h="full"
            boxShadow="sm"
            overflow="hidden"
          >
            <Box h="3px" bg="blue.200" />
            <CardBody p={0}>
              <VStack spacing={0} align="stretch" h="full">
                <Skeleton height="200px" />
                <VStack spacing={5} p={6} align="stretch" flex={1}>
                  <VStack spacing={2} align="stretch">
                    <Skeleton height="20px" width="70%" />
                    <Skeleton height="16px" width="40%" />
                  </VStack>
                  <SkeletonText noOfLines={3} spacing={2} flex={1} />
                  <HStack spacing={2} pt={2}>
                    <Skeleton height="24px" width="60px" borderRadius="full" />
                    <Skeleton height="24px" width="80px" borderRadius="full" />
                    <Skeleton height="24px" width="70px" borderRadius="full" />
                  </HStack>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    );
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
      {displayProjects.map((project, index) => (
        <Card
          key={project.id}
          bg={bgColor}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="2xl"
          overflow="hidden"
          h="full"
          boxShadow="sm"
          transition="all 0.2s ease"
          _hover={{
            transform: "translateY(-4px)",
            boxShadow: "lg",
          }}
          position="relative"
        >
          {/* Gradient accent bar */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            h="3px"
            bgGradient="linear(to-r, blue.400, blue.600)"
          />
          <CardBody p={0}>
            <VStack spacing={0} align="stretch" h="full">
              <Box position="relative" overflow="hidden">
                <ProjectImage
                  imageUrl={project.imgUrl}
                  alt={project.projectName}
                  size="medium"
                />
                <Box
                  position="absolute"
                  top={3}
                  right={3}
                  bg="blue.500"
                  borderRadius="md"
                  p={1.5}
                  boxShadow="sm"
                >
                  <Icon as={FaCode} color="white" boxSize={3} />
                </Box>
              </Box>

              <VStack spacing={5} p={6} align="stretch" flex={1}>
                <VStack spacing={2} align="stretch">
                  <Heading
                    as="h3"
                    size="md"
                    color={textColor}
                    fontWeight="bold"
                    noOfLines={1}
                    title={project.projectName}
                  >
                    {project.projectName}
                  </Heading>
                  <Text fontSize="sm" color="blue.500" fontWeight="medium">
                    {project.projectDate || project.date}
                  </Text>
                </VStack>

                <Text
                  color={subtitleColor}
                  fontSize="sm"
                  lineHeight="tall"
                  noOfLines={3}
                  flex={1}
                >
                  {project.desc || project.description}
                </Text>

                {project.tags && project.tags.length > 0 && (
                  <Box pt={2}>
                    <TagMarquee tags={project.tags} />
                  </Box>
                )}
              </VStack>
            </VStack>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default ProjectTiles;
