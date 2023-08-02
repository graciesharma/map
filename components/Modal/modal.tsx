import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Box, Divider } from "../core";

const ModalContent1 = () => {
  return (
    <Box bg="$rose100" p="$5">
      <Text>This is the Box in Modal Content 1</Text>
      <Divider />
      <TouchableOpacity
        onPress={() => console.log("Button in Modal Content 1 clicked")}
      >
        <Text>Click me!</Text>
      </TouchableOpacity>
    </Box>
  );
};

export default ModalContent1;
