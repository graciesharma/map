import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "./environment";
import React, { useEffect, useRef, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import {
  Box,
  CloseIcon,
  Divider,
  GluestackUIProvider,
  MenuIcon,
  Modal,
  SearchIcon,
} from "./components";
import { config } from "./gluestack-ui.config";
import { styles } from "./styles";
import MenuDetail from "./components/Menu/menu";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const INITIAL_POSITION = {
  latitude: 27.67054,
  longitude: 85.30992,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

type InputAutocompleteProps = {
  label: string;
  placeholder?: string;
  onPlaceSelected: (details: GooglePlaceDetail | null) => void;
};

function InputAutocomplete({
  label,
  placeholder,
  onPlaceSelected,
}: InputAutocompleteProps) {
  return (
    <>
      <Text>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={placeholder || ""}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "pt-BR",
        }}
      />
    </>
  );
}

const Flex = () => {
  const numberOfItems = 8;

  return (
    <View style={styles.modalContainer}>
      {[...Array(numberOfItems)].map((_, index) => (
        <MenuDetail key={index} />
      ))}
    </View>
  );
};

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedMarkerDetails, setSelectedMarkerDetails] = useState<LatLng>(
    {} as LatLng
  );

  const [origin, setOrigin] = useState<LatLng | null>();
  const [destination, setDestination] = useState<LatLng | null>();
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const mapRef = useRef<MapView>(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  //my location
  const CURRENT_LATITUDE = 27.65167;
  const CURRENT_LONGITUDE = 85.31348;

  // range around my current location
  const MAX_LATITUDE = CURRENT_LATITUDE + 0.01;
  const MIN_LATITUDE = CURRENT_LATITUDE - 0.01;
  const MAX_LONGITUDE = CURRENT_LONGITUDE + 0.01;
  const MIN_LONGITUDE = CURRENT_LONGITUDE - 0.01;

  const generateRandomCoordinates = () => {
    const latitude =
      Math.random() * (MAX_LATITUDE - MIN_LATITUDE) + MIN_LATITUDE;
    const longitude =
      Math.random() * (MAX_LONGITUDE - MIN_LONGITUDE) + MIN_LONGITUDE;
    return { latitude, longitude };
  };

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const randomMarkers = Array.from({ length: 5 }, () =>
      generateRandomCoordinates()
    );
    setMarkers(randomMarkers);
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  console.log({ location });

  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRouteOnReady = (args: any) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], {
        edgePadding,
      });
    }
  };

  const onPlaceSelected = (
    details: GooglePlaceDetail | null,
    flag: "origin" | "destination"
  ) => {
    const set = flag === "origin" ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    set(position);
    moveTo(position);
  };

  const currentLocation = {
    latitude: location?.coords?.latitude || 0,
    longitude: location?.coords?.longitude || 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  console.log({ currentLocation });

  const closeModal = () => {
    setShowModal(false);
    setShowDetailsModal(false);
  };

  const closeModalDetails = () => {
    setShowDetailsModal(false);
  };

  const [showAutoCompleteButton, setShowAutoCompleteButton] = useState(false);
  const toggleBox = () => {
    setShowAutoCompleteButton(
      (prevShowAutoCompleteButton) => !prevShowAutoCompleteButton
    );
  };

  return (
    <GluestackUIProvider config={config.theme}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_POSITION}
          region={currentLocation}
          showsUserLocation={true}
        >
          {origin && <Marker coordinate={currentLocation} />}
          {destination && <Marker coordinate={destination} />}
          {showDirections && origin && destination && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_API_KEY}
              strokeColor="#0073cf"
              strokeWidth={4}
              onReady={traceRouteOnReady}
            />
          )}
          {/* Render random markers  */}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker}
              title={`Marker ${index + 1}`}
            />
          ))}
        </MapView>

        <TouchableOpacity style={styles.iconButton} onPress={toggleBox}>
          {showAutoCompleteButton ? (
            <CloseIcon size="md" color="white" />
          ) : (
            <SearchIcon size="md" color="white" />
          )}
        </TouchableOpacity>
        {showAutoCompleteButton ? (
          <View style={styles.searchContainer}>
            <>
              <InputAutocomplete
                label="Origin"
                onPlaceSelected={(details) => {
                  onPlaceSelected(details, "origin");
                }}
              />
              <InputAutocomplete
                label="Destination"
                onPlaceSelected={(details) => {
                  onPlaceSelected(details, "destination");
                }}
              />
              <TouchableOpacity style={styles.button} onPress={traceRoute}>
                <Text style={styles.buttonText}>Trace route</Text>
              </TouchableOpacity>
              {distance && duration ? (
                <View>
                  <Text>Distance: {distance.toFixed(2)}</Text>
                  <Text>Duration: {Math.ceil(duration)} min</Text>
                </View>
              ) : null}
            </>
          </View>
        ) : null}

        <Modal isOpen={showModal} onClose={closeModal}>
          <TouchableOpacity
            style={styles.fullPageModalContent}
            activeOpacity={1}
            onPress={closeModal}
          >
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <CloseIcon size="md" color="black" />
              </TouchableOpacity>
              <Flex />
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Second Modal */}

        <Modal isOpen={showDetailsModal} onClose={closeModalDetails}>
          <TouchableOpacity
            style={styles.fullPageModalContent}
            activeOpacity={1}
            onPress={closeModalDetails}
          >
            <View style={styles.detailsModalContent}>
              <Box bg="$rose100" p="$5">
                <Text>This is the Box</Text>
              </Box>
              <Divider />
              <Box bg="$primary500" p="$5">
                <Text>This is the Box</Text>
              </Box>
            </View>
          </TouchableOpacity>
        </Modal>

        <TouchableOpacity
          style={styles.openModalButton}
          onPress={() => setShowModal(true)}
        >
          <MenuIcon size="md" color="white" />
        </TouchableOpacity>
      </View>
    </GluestackUIProvider>
  );
}
