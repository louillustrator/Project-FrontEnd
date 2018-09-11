import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { MapView } from "expo";
import ButtAction from "./ButtAction";
import * as tracker from "../utils/Tracker";
import Polylines from "./Polylines";
import * as api from "../api";
import { takeSnapshotAsync } from "expo";

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
    subscrition: {},
    route: [{ latLng: [], colour: "#3600ff", width: 1 }],
    width: 1,
    status: null,
    watching: false,
    colour: "#3600ff"
  };
  //getting current user postion at the start and setting region in state with it
  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = tracker._getLocationAsync.bind(this);
  _watchPosition = tracker._watchPosition.bind(this);

  render() {
    return (
      <View style={styles.container}>
        <MapView
          collapsable={false}
          style={styles.map}
          ref="routeMap"
          region={this.state.region}
          showsUserLocation
          showsMyLocationButton
          followUserLocation={true}
          zoomEnabled={true}
          onRegionChangeComplete={this.setZoom}
        >
          <Polylines route={this.state.route} />
        </MapView>
        <ButtAction
          style={styles.butt}
          changeColour={this.changeColour}
          navigation={this.props.navigation}
          colour={this.state.colour}
          start={this.start}
          pause={this.pause}
          stop={this.stop}
        />
        {/* <Text>{_haversine(this.state.route)}</Text> */}
      </View>
    );
  }

  changeColour = colour => {
    let path = { latLng: [], colour, width: this.state.width };
    this.setState({
      route: [...this.state.route, path],
      colour
    });
    this.props.navigation.navigate("Tracker");
  };

  pause = () => {
    this._watchPosition(0);
    this.setState({
      watching: false
    });
  };

  start = () => {
    this._watchPosition(1);
    this.setState({
      watching: true
    });
  };

  stop = async () => {
    const { currentUser } = this.props.screenProps;

    this._watchPosition(0);

    const newJourney = {
      user: currentUser,
      route: this.state.route
    };

    const newID = await api.storeJourney(newJourney);

    const newPic = await takeSnapshotAsync(this.refs.routeMap, {
      result: "base64",
      height: 1080,
      width: 1080,
      quality: 0,
      format: "jpeg"
    });

    api.storePic(newPic, newID, currentUser);

    this.setState({
      watching: false
    });
  };

  setZoom = region => {
    let currentRegion = {
      ...this.state.region,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta
    };
    this.setState({
      region: currentRegion
    });
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
    position: "absolute",
    width: 20,
    height: 20,
    top: 10,
    left: 10,
    zIndex: 10
  }
});

export default Tracker;
