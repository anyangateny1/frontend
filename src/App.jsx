import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Contact from "./contact/Contact";
import Homepage from "./homepage/Homepage";
import Projects from "./projects/Projects";
import "./index.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function NavLinkButton({ to, isActive, children, onNavigate }) {
  return (
    <Link to={to} style={{ textDecoration: "none" }} onClick={onNavigate}>
      <Button
        variant={isActive ? "solid" : "ghost"}
        colorScheme={isActive ? "blue" : "gray"}
        size="sm"
        fontWeight="medium"
        width={{ base: "full", md: "auto" }}
        justifyContent={{ base: "flex-start", md: "center" }}
        _hover={{ transform: "translateY(-1px)" }}
        transition="all 0.2s"
      >
        {children}
      </Button>
    </Link>
  );
}

function Navigation() {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.8)",
    "rgba(26, 32, 44, 0.8)",
  );
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      backdropFilter="blur(10px)"
      bg={bgColor}
      borderBottom="1px solid"
      borderColor={borderColor}
      boxShadow="sm"
    >
      <Container
        maxW="container.xl"
        py={{ base: 2, md: 4 }}
        px={{ base: 3, md: 4 }}
      >
        <Grid
          display={{ base: "grid", md: "none" }}
          templateColumns="minmax(0, 1fr) auto minmax(0, 1fr)"
          alignItems="center"
          minH="40px"
          w="100%"
        >
          <GridItem justifySelf="start" minW={0}>
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon boxSize={5} />}
              onClick={onOpen}
              size="md"
              variant="ghost"
            />
          </GridItem>
          <GridItem px={2} minW={0} textAlign="center">
            <Link to="/" style={{ textDecoration: "none" }}>
              <Text
                fontSize={{ base: "md", sm: "lg" }}
                fontWeight="bold"
                color={textColor}
                lineHeight="short"
              >
                Anyang Ateny
              </Text>
            </Link>
          </GridItem>
          <GridItem justifySelf="end" minW={0}>
            <IconButton
              aria-label="Toggle color mode"
              icon={
                colorMode === "light" ? (
                  <MoonIcon boxSize={4} />
                ) : (
                  <SunIcon boxSize={4} />
                )
              }
              onClick={toggleColorMode}
              size="sm"
              variant="ghost"
            />
          </GridItem>
        </Grid>

        {/* Desktop */}
        <Flex
          display={{ base: "none", md: "flex" }}
          align="center"
          gap={2}
          w="100%"
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={textColor}
              noOfLines={1}
            >
              Anyang Ateny
            </Text>
          </Link>

          <Spacer />

          <HStack spacing={6}>
            <HStack spacing={4}>
              <NavLinkButton to="/" isActive={isActive("/")}>
                Home
              </NavLinkButton>
              <NavLinkButton to="/projects" isActive={isActive("/projects")}>
                Projects
              </NavLinkButton>
              <NavLinkButton to="/contact" isActive={isActive("/contact")}>
                Contact
              </NavLinkButton>
            </HStack>

            <Divider orientation="vertical" height="20px" />

            <HStack spacing={2}>
              <IconButton
                as="a"
                href="https://github.com/anyangateny1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                icon={<BsGithub />}
                size="sm"
                variant="ghost"
              />
              <IconButton
                as="a"
                href="https://www.linkedin.com/in/anyangateny1/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                icon={<BsLinkedin />}
                size="sm"
                variant="ghost"
              />
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                size="sm"
                variant="ghost"
              />
            </HStack>
          </HStack>
        </Flex>
      </Container>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch" pt={2}>
              <NavLinkButton
                to="/"
                isActive={isActive("/")}
                onNavigate={onClose}
              >
                Home
              </NavLinkButton>
              <NavLinkButton
                to="/projects"
                isActive={isActive("/projects")}
                onNavigate={onClose}
              >
                Projects
              </NavLinkButton>
              <NavLinkButton
                to="/contact"
                isActive={isActive("/contact")}
                onNavigate={onClose}
              >
                Contact
              </NavLinkButton>
              <Divider />
              <HStack spacing={2}>
                <IconButton
                  as="a"
                  href="https://github.com/anyangateny1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  icon={<BsGithub />}
                  size="md"
                  variant="outline"
                />
                <IconButton
                  as="a"
                  href="https://www.linkedin.com/in/anyangateny1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  icon={<BsLinkedin />}
                  size="md"
                  variant="outline"
                />
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

function App() {
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Router>
      <ScrollToTop />
      <Box minHeight="100vh" bg={bgColor} display="flex" flexDirection="column">
        <Navigation />

        <Box flex="1" pt={{ base: "68px", md: "88px" }}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
