import Constants from "expo-constants";
import { Dimensions, StyleSheet } from "react-native"

export const styles = StyleSheet.create({
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
        padding: 20,
        borderRadius: 16,
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 2,
        borderRadius: 8,
        width: "100%",
        height: "100%",
        // justifyContent: "center",
        // alignItems: "center",

    },
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
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        // backgroundColor: "#262758",
        width: 30,
        height: 30,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },
    closeButtonText: {
        color: "black",
        fontSize: 16,
    },
    itemContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
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
    itemName: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 16,
        flex: 1,
    },
    iconButton: {
        position: "absolute",
        top: 32,
        right: 32,
        backgroundColor: "#262758",
        borderRadius: 20,
        padding: 8,
        zIndex: 50,
    },
    searchIconButton: {
        position: "absolute",
        top: 8,
        right: 40,
        backgroundColor: "#262758",
        borderRadius: 20,
        padding: 8,
    },
    containerFlatList: {
        flex: 1,
        marginTop: 10,
        paddingLeft: 0,
        marginLeft: 0,
        backgroundColor: "white",
        width: "100%",
        height: "100%",
    },

    title: {
        fontSize: 16,
    },

    // Styles for the button container
    buttonContainer: {
        flexDirection: "row", // Align children horizontally
        alignItems: "center", // Align items vertically in the center
    },

    // Additional styles for the button
    flatListButton: {
        backgroundColor: "pink", // Replace with the desired background color
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 5,
        marginRight: 10,
    },

    // Additional styles for the PlayIcon
    playIcon: {
        marginLeft: 10,
    },

    modalContainer: {
        flex: 1,
        alignItems: "flex-end",
        backgroundColor: "white",
        left: 0,
        marginTop: 50,
    },
    flexItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        // marginTop: 20
    },
    buttonContainer2: {
        padding: 10,
        backgroundColor: "#262758",
        borderRadius: 5,
        margin: 10,
    },
    buttonText2: {
        color: "white",
        fontSize: 16,
    },
    randomText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        alignItems: "flex-start"
    },
    detailsModalContent: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 20,
        width: "95%", // Adjust the width as needed
        height: "84%", // Adjust the max height as needed
    },
    detailsModalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    detailsModalText: {
        fontSize: 16,
        marginBottom: 5,
    },

    detailsModalCloseButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    divider: {
        height: 1,
        backgroundColor: "#dadada",
        marginVertical: 2,
      },
});

