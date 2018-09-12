import { StyleSheet } from "react-native";

export const universalStyles = StyleSheet.create({
  text: {
    fontFamily: "Avenir"
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    opacity: 100,
    padding: 17,
    margin: 10,
    width: "45%"
  },
  navBarText: {
    backgroundColor: "#63cdda",
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 10
  }
});

export const collectionStyles = StyleSheet.create({
  container: {
    flexDirection: "row",

    justifyContent: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "#fff"
  },
  text: {
    alignSelf: "center"
  },
  image: {
    margin: 10,

    width: 160,
    height: 160
  },

  navBarText: {
    backgroundColor: "#63cdda",
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 10
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
