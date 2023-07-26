import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

const PopoverButton = ({ buttonText, popoverContent }) => {
  const [isPopoverVisible, setPopoverVisible] = useState(false);

  const togglePopover = () => {
    setPopoverVisible(!isPopoverVisible);
  };

  return (
    <View>
      <TouchableOpacity onPress={togglePopover}>
        <Text style={styles.button}>{buttonText}</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isPopoverVisible}
        onRequestClose={() => setPopoverVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={() => setPopoverVisible(false)}
        >
          <View style={styles.popover}>
            {popoverContent()}

            <TouchableOpacity
              onPress={togglePopover}
              style={styles.closeButton}
            ></TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#262758",
    color: "white",
    borderRadius: 24,
    textAlign: "center",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width : "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popover: {
    width : "100%",
    height : "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  closeButtonText: {
    color: "blue",
    fontSize: 16,
  },
});

export default PopoverButton;
