import React from "react";
import { Box } from "@chakra-ui/react";

export type WrapperVariant = "small" | "large";

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "medium",
}) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "medium" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};
