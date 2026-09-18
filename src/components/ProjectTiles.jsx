import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import useProjects from "../hooks/useProjects";
import ProjectImage from "./ProjectImage";

const MARQUEE_MIN_DURATION_S = 8;
const MARQUEE_PX_PER_SECOND = 15;

const TagBadges = ({ tags, innerRef }) => (
  <HStack ref={innerRef} spacing={2} flexWrap="nowrap" display="inline-flex">
    {tags.map((tag, i) =>
      tag ? (
        <Badge
          key={i}
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
    )}
  </HStack>
);

const TagMarquee = ({ tags }) => {
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);

  const checkOverflow = useCallback(() => {
    if (!containerRef.current || !measureRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const scrollWidth = measureRef.current.scrollWidth;
    setShouldAnimate(scrollWidth > containerWidth);
    setContentWidth(scrollWidth);
  }, []);

  const _tagsKey = tags.join("|");
  useEffect(() => {
    checkOverflow();
    const resizeObserver = new ResizeObserver(checkOverflow);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [checkOverflow]);

  const animate = shouldAnimate;

  const measuringNode = (
    <Box position="absolute" visibility="hidden" pointerEvents="none">
      <TagBadges tags={tags} innerRef={measureRef} />
    </Box>
  );

  if (!animate) {
    return (
      <Box
        ref={containerRef}
        overflow="hidden"
        width="100%"
        position="relative"
      >
        <TagBadges tags={tags} />
        {measuringNode}
      </Box>
    );
  }

  const duration = Math.max(
    MARQUEE_MIN_DURATION_S,
    contentWidth / MARQUEE_PX_PER_SECOND,
  );

  return (
    <Box
      ref={containerRef}
      overflow="hidden"
      width="100%"
      position="relative"
      sx={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <HStack
        spacing={2}
        flexWrap="nowrap"
        display="inline-flex"
        sx={{
          animation: `marquee ${duration}s linear infinite`,
          "&:hover": { animationPlayState: "paused" },
          "@keyframes marquee": {
            "0%": { transform: "translateX(0)" },
            "100%": { transform: "translateX(-50%)" },
          },
        }}
      >
        <TagBadges tags={tags} />
        <TagBadges tags={tags} />
      </HStack>
      {measuringNode}
    </Box>
  );
};

const getProjectDate = (project) => project.date;
const getProjectDescription = (project) => project.description;
const getProjectGithub = (project) =>
  project.githubUrl || project.github || project.url;

const CardShell = ({ bgColor, borderColor, accent, hoverable, children }) => (
  <Card
    bg={bgColor}
    border="1px solid"
    borderColor={borderColor}
    borderRadius="2xl"
    overflow="hidden"
    h="full"
    boxShadow="sm"
    position="relative"
    transition={hoverable ? "all 0.2s ease" : undefined}
    _hover={
      hoverable ? { transform: "translateY(-4px)", boxShadow: "lg" } : undefined
    }
  >
    {accent}
    <CardBody p={0}>{children}</CardBody>
  </Card>
);

const GradientAccentBar = () => (
  <Box
    position="absolute"
    top={0}
    left={0}
    right={0}
    h="3px"
    bgGradient="linear(to-r, blue.400, blue.600)"
  />
);

const ProjectCard = ({ project, theme }) => {
  const { bgColor, borderColor, textColor, subtitleColor } = theme;
  const githubUrl = getProjectGithub(project);

  const cardContent = (
    <CardShell
      bgColor={bgColor}
      borderColor={borderColor}
      accent={<GradientAccentBar />}
      hoverable={!!githubUrl}
    >
      {githubUrl && (
        <Box
          position="absolute"
          top={3}
          left={3}
          zIndex={2}
          p="6px"
          borderRadius="full"
          bg="blackAlpha.400"
          backdropFilter="blur(6px)"
          color="white"
          opacity={0.4}
          transition="all 0.2s ease-in-out"
          _groupHover={{
            opacity: 1,
            transform: "translate(2px, -2px)",
            bg: "blue.500",
            boxShadow: "md",
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ExternalLinkIcon boxSize="13px" />
        </Box>
      )}

      <VStack spacing={0} align="stretch" h="full">
        <ProjectImage
          imageUrl={project.imgUrl}
          alt={project.name}
          size="medium"
        />

        <VStack spacing={5} p={6} align="stretch" flex={1}>
          <VStack spacing={2} align="stretch">
            <Heading
              as="h3"
              size="md"
              color={textColor}
              fontWeight="bold"
              noOfLines={1}
              title={project.name}
            >
              {project.name}
            </Heading>
            <Text fontSize="sm" color="blue.500" fontWeight="medium">
              {getProjectDate(project)}
            </Text>
          </VStack>

          <Text
            color={subtitleColor}
            fontSize="sm"
            lineHeight="tall"
            noOfLines={3}
            flex={1}
          >
            {getProjectDescription(project)}
          </Text>

          {project.tags?.length > 0 && (
            <Box pt={2}>
              <TagMarquee tags={project.tags} />
            </Box>
          )}
        </VStack>
      </VStack>
    </CardShell>
  );

  if (!githubUrl) {
    return cardContent;
  }

  return (
    <Link
      href={githubUrl}
      isExternal
      _hover={{ textDecoration: "none" }}
      h="full"
      display="block"
      role="group"
    >
      {cardContent}
    </Link>
  );
};

const ProjectTiles = ({ limit }) => {
  const { projects, error, loading } = useProjects();
  const displayProjects = limit ? projects.slice(0, limit) : projects;

  const theme = {
    bgColor: useColorModeValue("white", "gray.800"),
    borderColor: useColorModeValue("gray.200", "gray.700"),
    textColor: useColorModeValue("gray.800", "white"),
    subtitleColor: useColorModeValue("gray.600", "gray.400"),
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={12}>
        <Spinner size="lg" color="blue.500" />
      </Box>
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
      {displayProjects.map((project) => (
        <ProjectCard key={project.id} project={project} theme={theme} />
      ))}
    </SimpleGrid>
  );
};

export default ProjectTiles;
