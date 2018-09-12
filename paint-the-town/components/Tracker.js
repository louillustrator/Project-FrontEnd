import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Switch, Text } from "react-native";
import { MapView } from "expo";
import ButtAction from "./ButtAction";
import * as tracker from "../utils/Tracker";
import Polylines from "./Polylines";
import * as api from "../utils/api";
import { takeSnapshotAsync } from "expo";
import exportStyles from "../styles";

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
    colour: "#3600ff",
    blueDot: true,
    toggle: false
  };
  //getting current user postion at the start and setting region in state with it
  componentDidMount() {
    this._getLocationAsync();
    let journey = this.props.navigation.getParam("journey");
    if (journey)
      this.setState({
        route: journey.route
      });
  }

  _getLocationAsync = tracker._getLocationAsync.bind(this);
  _watchPosition = tracker._watchPosition.bind(this);

  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={exportStyles.navBarText}>New Journey</Text> */}
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Switch onValueChange={this.toggle} value={this.state.toggle} />
          <Text style={styles.text}>Satellite View</Text>
        </View>
        <MapView
          collapsable={false}
          style={styles.map}
          ref="routeMap"
          region={this.state.region}
          showsUserLocation={this.state.blueDot}
          showsMyLocationButton={true}
          showsCompass={true}
          followUserLocation={true}
          zoomEnabled={true}
          onRegionChangeComplete={this.setZoom}
          rotateEnabled={true}
          mapType={this.state.toggle ? "satellite" : "standard"}
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
    //{" "}
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

    await this.setState({
      watching: false,
      blueDot: false
    });

    const newPic = await takeSnapshotAsync(this.refs.routeMap, {
      result: "base64",
      height: 1080,
      width: 1080,
      quality: 0,
      format: "jpeg"
    });
    api.storePic(newPic, newID, currentUser);

    this.setState({ blueDot: true });
  };

  setZoom = region => {
    // let currentRegion = {
    //   ...this.state.region,
    //   latitudeDelta: region.latitudeDelta,
    //   longitudeDelta: region.longitudeDelta
    // };
    this.setState({
      region
    });
  };

  toggle = () => this.setState({ toggle: !this.state.toggle });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    //justifyContent: "center",
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
    alignSelf: "stretch",
    //height: height,
    width: width,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    paddingTop: 30
  },
  text: {
    padding: 5,
    fontStyle: "italic"
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
