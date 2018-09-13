import { StyleSheet, Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");

export const universalStyles = StyleSheet.create({
  text: {
    fontFamily: Platform.OS === "android" ? "sans-serif" : "Avenir"
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
    fontFamily: Platform.OS === "android" ? "sans-serif" : "raleway-regular"
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
    fontFamily: Platform.OS === "android" ? "sans-serif" : "raleway-regular"
  },
  grey: {
    color: "#898989",
    fontFamily: Platform.OS === "android" ? "sans-serif" : "raleway-regular"
  }
});

export const trackerStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",

    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  navBar: {
    backgroundColor: "#63cdda",
    height: 50,
    width: width,
    position: "absolute"
  },
  navBarText: {
    color: "white",
    fontSize: 16,
    top: 15,
    fontWeight: "700",
    textAlign: "center"
  },
  text: {
    fontSize: 13,
    padding: 5,
    fontStyle: "italic"
  },
  map: {
    top: 90,
    flex: 0.7,
    width: width,
    height: height
  },
  butt: {
    position: "absolute",
    width: 20,
    height: 20,
    top: 10,
    left: 10,
    zIndex: 10
  },
  toggleButt: {
    position: "relative",
    top: 65,
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
