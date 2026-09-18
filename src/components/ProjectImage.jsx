import { Box, Image as ChakraImage, Icon, Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";

const SIZE_CONFIG = {
  small: { paddingBottom: "40%", maxHeight: "200px" },
  medium: { paddingBottom: "56.25%", maxHeight: "300px" },
  large: { paddingBottom: "56.25%", maxHeight: "400px" },
};

const ProjectImage = React.memo(({ imageUrl, size = "medium", alt = "" }) => {
  const { paddingBottom, maxHeight } = SIZE_CONFIG[size] ?? SIZE_CONFIG.medium;

  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, []);

  const showBroken = !imageUrl || failed;

  return (
    <Box
      position="relative"
      width="100%"
      paddingBottom={paddingBottom}
      overflow="hidden"
    >
      {showBroken ? (
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          maxH={maxHeight}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="gray.100"
        >
          <Icon
            as={FiImage}
            boxSize={6}
            color="gray.400"
            aria-label={alt || "Image unavailable"}
          />
        </Box>
      ) : (
        <ChakraImage
          key={imageUrl}
          src={imageUrl}
          alt={alt}
          onError={() => {
            console.error("Image load failed for URL:", imageUrl);
            setFailed(true);
          }}
          fallback={
            <Skeleton
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
            />
          }
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
          maxH={maxHeight}
        />
      )}
    </Box>
  );
});

ProjectImage.displayName = "ProjectImage";

export default ProjectImage;

