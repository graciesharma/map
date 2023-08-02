import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Box, Divider } from '../core';

const ModalContent2 = () => {
  return (
    <Box bg="$primary500" p="$5">
      <Text>This is the Box in Modal Content 2</Text>
      <Divider />
      <TouchableOpacity onPress={() => console.log('Button in Modal Content 2 clicked')}>
        <Text>Click me!</Text>
      </TouchableOpacity>
    </Box>
  );
};

export default ModalContent2;
