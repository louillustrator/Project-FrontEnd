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

    errorMessage: null,
    route: [],
    status: null,
    watching: false
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  //getting current postion and setting state with it
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });

    this.setState({
      status: "granted",
      region: {
        ...this.state.region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
    });
  };

  //bringing back postion tracking.

  _watchPosition = () => {
    console.log("watching");
    Permissions.askAsync(Permissions.LOCATION)
      .then(res => {
        if (res.status === "granted") {
          this.watchId = Location.watchPositionAsync(
            {
              enableHighAccuracy: true,
              distanceInterval: 2,
              timeInterval: 2000
            },
            newLocation => {
              if (newLocation.timestamp) {
                let object = {
                  latitude: newLocation.coords.latitude,
                  longitude: newLocation.coords.longitude,
                  timestamp: newLocation.timestamp
                };

                this.setState({
                  route: [...this.state.route, object]
                });
              } else {
                console.log("ignored newLocation");
              }
            }
          );
        }
      })
      .catch(err => console.log("Error in componentDidMount: ", err.message));
  };

  render() {
    console.log(this.state);
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

  componentDidUpdate() {
    if (
      this.state.status === "granted" &&
      !this.state.watching

      //this might want to happen on a button press/ so to start your tracking....
    ) {
      this._watchPosition();
      this.setState({
        watching: true
      });
    }
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
