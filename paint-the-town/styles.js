import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

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
  }
});

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#63cdda"
  },
  logText: {
    color: "white",
    fontSize: 16,
    fontFamily: "raleway-regular"
  },
  login: {
    alignSelf: "flex-end",
    position: "absolute",
    top: "2%",
    right: "5%"
  },
  logoutButton: {
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
    opacity: 100,
    padding: 8,
    margin: 10,
    marginLeft: 25,
    width: 80
  },
  image: { width: 170, height: 119 }
});

export const imageStyles = StyleSheet.create({
  image: {
    margin: 10,
    width: width,
    height: width
  }
});

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#63cdda"
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    opacity: 100,
    padding: 17,
    margin: 10,
    width: "50%"
  },
  disabledButton: {
    alignItems: "center",
    backgroundColor: "#c4c4c4",
    opacity: 100,
    padding: 17,
    margin: 10,
    width: "50%"
  },
  text: {
    color: "white",
    padding: 10,
    fontFamily: "raleway-regular"
  },
  grey: { color: "#898989", fontFamily: "raleway-regular" }
});
