import React, { Component } from "react";
import { Button, StyleSheet, Text, View, Dimensions } from "react-native";
import { Location, Permissions, MapView } from "expo";
import ButtAction from "./ButtAction";
import { _haversine } from "../utils/Tracker";

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
    watching: false,
    colour: '#3600ff'
  };
  //getting current user postion at the start and setting region in state with it
  componentDidMount() {
    this._getLocationAsync();
  }

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

  //bringing back postion tracking, this is setting route in state with an object containing longitude and latitude & a timestamp
  //this is started in component did update down below

  _watchPosition = () => {
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

  //rendering the view, currently holding map and a nav bar
  render() {
    // console.log(this.state); <---un comment this to see the state updating when tracking
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
        <ButtAction style={styles.butt} changeColour={this.changeColour} navigation={this.props.navigation} colour={this.state.colour} />
        {/* <View style={styles.navBar}>
          <Text style={styles.navBarText}>Run for it</Text>
        </View> */}
        {/* <Button
                title="Pick a colour"
                accessibilityLabel={"Pick Colour"}
                color={this.state.colour}
                onPress={() => this.props.navigation.navigate("ColourPicker", {
                  currentColour: this.state.colour,
                  changeColour: this.changeColour
                })}
            /> */}
        {/* <Text>{_haversine(this.state.route)}</Text> */}
      </View>
    );
  }

  //tracking is starting
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
  changeColour = (colour) => {
    this.setState({
      colour
    });
    this.props.navigation.navigate("Tracker");
  };
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
  },
  butt: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: 10,
    left: 10,
    zIndex: 10
  }
});

export default Tracker;
