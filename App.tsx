import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "./environment";
import Constants from "expo-constants";
import React, { useEffect, useRef, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import {
  Button,
  GluestackUIProvider,
  Icon,
  Modal,
  SearchIcon,
} from "./components";
import { config } from "./gluestack-ui.config";
import PopoverButton from "./ui/buttonPopover";
import { PlayIcon } from "./components";

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

export default function App() {
  const [showModal, setShowModal] = useState(false);

  const [origin, setOrigin] = useState<LatLng | null>();
  const [destination, setDestination] = useState<LatLng | null>();
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const mapRef = useRef<MapView>(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
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
  };

  // Array of items
  const items = [
    { name: "Item 1" },
    { name: "Item 2" },
    { name: "Item 3" },
    { name: "Item 4" },
    { name: "Item 5" },
    { name: "Item 6" },
    { name: "Item 7" },
    { name: "Item 8" },
  ];

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
        </MapView>
        <View style={styles.searchContainer}>
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
      </View>

        {/* Add the full-page modal */}
        <Modal isOpen={showModal} onClose={closeModal}>
          {/* Contents of the full-page modal */}
          <TouchableOpacity
            style={styles.fullPageModalContent}
            activeOpacity={1} // Prevent unwanted clicks behind the modal
            onPress={closeModal} // Close modal on click
          >
            <View style={styles.modalContent}>
              {/* Close button */}
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>x</Text>
              </TouchableOpacity>

              {/* List of items */}
              {items.map((item, index) => (
                <View key={index}>
                  {/* <Divider style={styles.divider} /> Divider below each item */}
                  <View style={styles.itemContainer}>
                    {/* "View Details" button */}
                    <TouchableOpacity style={styles.viewDetailsButton}>
                      <Text style={styles.viewDetailsButtonText}>
                        View Details
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.itemName}>{item.name}</Text>
                    {/* PlayIcon */}
                    <PlayIcon size="md" />
                  </View>
                </View>
              ))}
              {/* <Divider style={styles.divider} /> Divider after the last item */}
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Button to open the full-page modal */}
        <TouchableOpacity
          style={styles.openModalButton}
          onPress={() => setShowModal(true)}
        >
          <SearchIcon size="md" color="white" />
        </TouchableOpacity>
      </View>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#262758",
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
  icon: {
    color: "white",
  },

  fullPageModalContent: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a transparent background to overlay the map
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  // Style for the button to open the modal
  openModalButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#262758",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  openModalButtonText: {
    color: "white",
  },
  // Style for the close button
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#ccc",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  // Style for the item container in the modal
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  // Style for the "View Details" button
  viewDetailsButton: {
    backgroundColor: "#262758",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  viewDetailsButtonText: {
    color: "white",
    fontSize: 14,
  },
  // Style for the item name text
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 16,
    flex: 1,
  },
  // Style for the divider
  // divider: {
  //   height: 1,
  //   backgroundColor: "#ccc",
  // },
  traceRoute: {
    

  },
});
