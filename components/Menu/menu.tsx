import React, { useState } from "react";
import { Text, Box, Divider, Modal, Heading, Badge, GlobeIcon } from "../core";
import { styles } from "../../styles";
import { LatLng } from "react-native-maps";
import { TouchableOpacity, View } from "react-native"; // Make sure to import View from "react-native"
import { ILLMap } from "../../illustration";
import RatingAndReviewModal from "../RatingAndReview/rating";

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
    "Aliquip ex eaat",
    "Duis aute irure dolor",
  ];
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
};

const randomText = getRandomText();

const MenuDetail = () => {
  const [selectedMarkerDetails, setSelectedMarkerDetails] = useState<LatLng>(
    {} as LatLng
  );
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const badgeData = [
    { text: "New feature 1", icon: GlobeIcon },
    { text: "New feature 2", icon: GlobeIcon },
  ];
  const closeModalDetails = () => {
    setShowDetailsModal(false);
  };

  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
          marginRight: 2,
        }}
      >
        <Text style={{ flex: 1, marginLeft: 10 }}>{randomText}</Text>
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

      {showDetailsModal && (
        <Modal isOpen={showDetailsModal} onClose={closeModalDetails}>
          <TouchableOpacity
            style={styles.fullPageModalContent}
            activeOpacity={1}
            onPress={closeModalDetails}
          >
            <View style={styles.detailsModalContent}>
              <Box style={{ marginBottom: 10 }}>
                <Heading>This is Heading</Heading>
                <Text>Hi</Text>
                <Text>0.5 km</Text>
              </Box>
              <Divider />
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                {badgeData.map((data, index) => (
                  <Badge
                    mr={10}
                    key={index}
                    mt={10}
                    w={140}
                    h={22}
                    size="lg"
                    variant="solid"
                    borderRadius="$2xl"
                    action="success"
                  >
                    <Badge.Text>{data.text}</Badge.Text>
                    <Badge.Icon as={data.icon} ml="$2" />
                  </Badge>
                ))}
              </Box>
              <Divider />

              <Box marginTop={10}>
                <Text>Opening Hours : 10:00am - 5pm</Text>
              </Box>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
};

export default MenuDetail;
