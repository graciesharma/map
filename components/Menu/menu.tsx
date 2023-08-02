import React, { useState } from "react";
import { Text, Box, Divider } from "../core";
import { styles } from "../../styles";
import { LatLng } from "react-native-maps";
import { TouchableOpacity } from "react-native";
import { ILLMap } from "../../illustration";

const getRandomText = () => {
  const texts = [
    "Lorem ipsum",
    "Consectetur ",
    "Sed do ",
    "Incididunt ",
    "Magna a",
    "Ut enim iam",
    "Quis nostitation",
    "Ullamisi",
    "Aliquip ex ea commodo consequat",
    "Duis aute irure dolor",
  ];
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
};

const randomText = getRandomText(); // Generate the random text outside the component

const MenuDetail = () => {
  const [selectedMarkerDetails, setSelectedMarkerDetails] = useState<LatLng>(
    {} as LatLng
  );
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ flex: 1, marginRight: 10 }}>{randomText}</Text>
        <Box
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <ILLMap />
          <TouchableOpacity
            style={styles.buttonContainer2}
            onPress={() => {
              setSelectedMarkerDetails({
                latitude: 0,
                longitude: 0,
              });
              setShowDetailsModal(true);
            }}
          >
            <Text style={styles.buttonText2}>View Details</Text>
          </TouchableOpacity>
        </Box>
      </Box>
      <Divider style={styles.divider} />
    </>
  );
};

export default MenuDetail;
