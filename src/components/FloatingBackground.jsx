import { Box, Icon } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import {
  FaAws,
  FaCloud,
  FaGitAlt,
  FaJava,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiDocker,
  SiRust,
  SiSpringboot,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const ELEMENT_SETS = {
  homepage: [
    // Hero section (0–90vh)
    { icon: FaReact, color: "blue.400", size: "38px", top: "5vh", left: "12%" },
    {
      icon: SiCplusplus,
      color: "blue.600",
      size: "34px",
      top: "15vh",
      right: "15%",
    },
    {
      icon: SiVuedotjs,
      color: "green.400",
      size: "28px",
      top: "8vh",
      left: "50%",
    },
    {
      icon: FaGitAlt,
      color: "orange.500",
      size: "26px",
      top: "25vh",
      left: "75%",
    },
    { icon: FaJava, color: "red.500", size: "32px", top: "40vh", left: "8%" },
    {
      icon: SiTypescript,
      color: "blue.500",
      size: "30px",
      top: "35vh",
      right: "10%",
    },
    {
      icon: FaPython,
      color: "yellow.500",
      size: "34px",
      top: "70vh",
      left: "15%",
    },
    {
      icon: FaAws,
      color: "orange.400",
      size: "38px",
      top: "65vh",
      right: "12%",
    },
    // Skills section (90–180vh)
    {
      icon: SiDocker,
      color: "blue.400",
      size: "32px",
      top: "95vh",
      left: "80%",
    },
    {
      icon: SiSpringboot,
      color: "green.500",
      size: "30px",
      top: "105vh",
      left: "10%",
    },
    {
      icon: FaReact,
      color: "cyan.400",
      size: "28px",
      top: "115vh",
      right: "18%",
    },
    {
      icon: SiCplusplus,
      color: "blue.500",
      size: "26px",
      top: "125vh",
      left: "55%",
    },
    {
      icon: FaCloud,
      color: "blue.300",
      size: "34px",
      top: "140vh",
      left: "8%",
    },
    {
      icon: FaPython,
      color: "blue.500",
      size: "30px",
      top: "135vh",
      right: "10%",
    },
    {
      icon: SiTypescript,
      color: "blue.600",
      size: "28px",
      top: "150vh",
      left: "70%",
    },
    {
      icon: SiRust,
      color: "orange.700",
      size: "30px",
      top: "160vh",
      left: "25%",
    },
    // Projects section (180–280vh)
    {
      icon: FaAws,
      color: "orange.500",
      size: "32px",
      top: "185vh",
      right: "15%",
    },
    { icon: FaJava, color: "red.500", size: "34px", top: "195vh", left: "12%" },
    {
      icon: SiVuedotjs,
      color: "green.400",
      size: "30px",
      top: "210vh",
      right: "8%",
    },
    {
      icon: SiDocker,
      color: "blue.500",
      size: "28px",
      top: "220vh",
      left: "65%",
    },
    {
      icon: FaGitAlt,
      color: "orange.600",
      size: "32px",
      top: "235vh",
      left: "18%",
    },
    {
      icon: SiSpringboot,
      color: "green.600",
      size: "26px",
      top: "245vh",
      right: "22%",
    },
    {
      icon: FaReact,
      color: "blue.400",
      size: "34px",
      top: "260vh",
      left: "75%",
    },
    {
      icon: SiCplusplus,
      color: "blue.600",
      size: "30px",
      top: "270vh",
      left: "10%",
    },
  ],
  projects: [
    { icon: FaReact, color: "blue.400", size: "34px", top: "5vh", left: "10%" },
    {
      icon: SiCplusplus,
      color: "blue.600",
      size: "30px",
      top: "12vh",
      right: "12%",
    },
    {
      icon: SiVuedotjs,
      color: "green.400",
      size: "26px",
      top: "8vh",
      left: "55%",
    },
    { icon: FaJava, color: "red.500", size: "32px", top: "35vh", left: "8%" },
    {
      icon: SiTypescript,
      color: "blue.500",
      size: "28px",
      top: "40vh",
      right: "10%",
    },
    {
      icon: SiRust,
      color: "orange.600",
      size: "30px",
      top: "50vh",
      left: "70%",
    },
    {
      icon: FaPython,
      color: "yellow.500",
      size: "32px",
      top: "60vh",
      left: "15%",
    },
    {
      icon: FaAws,
      color: "orange.400",
      size: "34px",
      top: "70vh",
      right: "5%",
    },
    {
      icon: SiSpringboot,
      color: "green.500",
      size: "28px",
      top: "90vh",
      left: "12%",
    },
    {
      icon: FaCloud,
      color: "blue.300",
      size: "32px",
      top: "95vh",
      right: "20%",
    },
  ],
  contact: [
    { icon: FaReact, color: "blue.400", size: "32px", top: "8vh", left: "8%" },
    {
      icon: SiCplusplus,
      color: "blue.600",
      size: "28px",
      top: "15vh",
      right: "10%",
    },
    {
      icon: SiVuedotjs,
      color: "green.400",
      size: "26px",
      top: "5vh",
      left: "50%",
    },
    { icon: FaJava, color: "red.500", size: "30px", top: "35vh", left: "5%" },
    {
      icon: SiTypescript,
      color: "blue.500",
      size: "26px",
      top: "30vh",
      right: "8%",
    },
    {
      icon: SiRust,
      color: "orange.600",
      size: "28px",
      top: "45vh",
      left: "85%",
    },
    {
      icon: FaPython,
      color: "yellow.500",
      size: "30px",
      top: "55vh",
      left: "10%",
    },
    {
      icon: FaAws,
      color: "orange.400",
      size: "32px",
      top: "65vh",
      right: "12%",
    },
    {
      icon: SiDocker,
      color: "blue.400",
      size: "28px",
      top: "75vh",
      left: "70%",
    },
    {
      icon: FaCloud,
      color: "blue.300",
      size: "30px",
      top: "85vh",
      left: "15%",
    },
  ],
};

const HEIGHT_DEFAULTS = {
  homepage: "280vh",
  projects: "120vh",
  contact: "100vh",
};

const FloatingBackground = ({ variant = "homepage", height }) => {
  const elements = ELEMENT_SETS[variant] ?? [];
  const resolvedHeight = height ?? HEIGHT_DEFAULTS[variant] ?? "100vh";

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      height={resolvedHeight}
      overflow="visible"
      zIndex={0}
      pointerEvents="none"
    >
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
          <Icon
            as={element.icon}
            color={element.color}
            boxSize={element.size}
          />
        </Box>
      ))}
    </Box>
  );
};

export default FloatingBackground;
