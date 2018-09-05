import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import { Constants, Location, Permissions, MapView } from "expo";
import pick from "lodash/pick";

const { width, height } = Dimensions.get("window");

class Tracker extends Component {
  state = {
    region: {
      latitude: 55.3781,
      longitude: 3.436,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    },
    location: null,
    errorMessage: null,
    route: null
  };
  //did mount please
  componentDidMount() {
    this._getLocationAsync().then(
      Permissions.askAsync(Permissions.LOCATION)
        .then(response => {
          if (response.status === "granted") {
            console.log("Starting watchPositionAsync");
            this.watchId = Location.watchPositionAsync(
              {
                enableHighAccuracy: true,
                distanceInterval: 1,
                timeInterval: 1
              },
              newLoc => {
                if (newLoc.timestamp) {
                  console.log(newLoc);
                } else {
                  console.log("ignored newLoc");
                }
              }
            );
          } else {
            console.log(
              "Error in getLocationAsync: Permission to access location was denied"
            );
          }
        })
        .catch(error =>
          console.log("Error in componentWillMount: ", error.message)
        )
        .done()
    );

    // this._watchPosition();
  }

  _getLocationAsync = async () => {
    console.log("getting current location");
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({});

    this.setState({
      location,
      region: {
        ...this.state.region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
    });
  };

  //get postion in motion, update the state, and hopefully rerender each time :)

  //   _watchPosition = () => {
  //     let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //     if (status !== "granted") {
  //     console.log("watching you");
  //     Location.watchPositionAsync(
  //       { enableHighAccuracy: true, timeInterval: 1, distanceInterval: 1 },
  //       result => {
  //         if (result.timestamp) {
  //           console.log(result + "I'm a result");
  //         } else {
  //           console.log("no results");
  //         }
  //       }
  //     );
  //   }
  // };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          showsUserLocation
          showsMyLocationButton
          followUserLocation={true}
          zoomEnabled={true}
        />
        <View style={styles.navBar}>
          <Text style={styles.navBarText}>Run for it</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  navBar: {
    backgroundColor: "rgba(0,0,0,0.7)",
    height: 64,
    width: width,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  navBarText: {
    color: "#19B5FE",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    paddingTop: 30
  },
  map: {
    flex: 0.7,
    width: width,
    height: height
  }
});

export default Tracker;
