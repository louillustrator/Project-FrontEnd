import { StyleSheet } from "react-native";

export default (exportStyles = StyleSheet.create({
  text: {
    fontFamily: "raleway-regular"
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
}));
