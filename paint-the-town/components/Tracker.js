import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Switch, Text } from "react-native";
import { MapView } from "expo";
import ButtAction from "./ButtAction";
import * as tracker from "../utils/Tracker";
import Polylines from "./Polylines";
import * as api from "../utils/api";
import { takeSnapshotAsync } from "expo";
import exportStyles from "../styles";
import WidthPicker from './WidthPicker';

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
    toggle: false,
    showSlider: false
  };
  //getting current user postion at the start and setting region in state with it
  componentDidMount = async () => {
    let location = await this._getLocationAsync();
    this.setState({
      status: "granted",
      region: {
        ...this.state.region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
    });
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
        <View style={styles.navBar}>
          <Text style={styles.navBarText}>My Journey</Text>
        </View>

        <View style={styles.toggle}>
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
        {this.state.showSlider && <WidthPicker setShowSlider={this.setShowSlider} setWidth={this.setWidth} currentWidth={this.state.width}/>}
        <ButtAction
          style={styles.butt}
          changeColour={this.changeColour}
          navigation={this.props.navigation}
          colour={this.state.colour}
          start={this.start}
          pause={this.pause}
          stop={this.stop}
          setShowSlider={this.setShowSlider}
        />
        {/* <Text>{_haversine(this.state.route)}</Text> */}
      </View>
    );
  }

  changeColour = async (colour) => {
    this.props.navigation.navigate("Tracker");
    if(this.state.watching) {
      let location = await this._getLocationAsync();
      let object = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: location.timestamp
      };
      let route = [...this.state.route]
      let currentObj = {...route[route.length -1]}
      let latLng = [...currentObj.latLng, object]
      currentObj.latLng = latLng
      route[route.length-1] = currentObj
      let newObj = { latLng: [object], colour, width: this.state.width };
      route.push(newObj)
      this.setState({
        route,
        colour
      });
    } else {
    let route = [...this.state.route]
    let currentObj = {...route[route.length -1]}
    currentObj.colour = colour
    route[route.length-1] = currentObj
      this.setState({
        route,
        colour
      })
    }
    
  };

  pause = async () => {
    this._watchPosition(0);
    let location = await this._getLocationAsync()
    let object = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timestamp: location.timestamp
    };
    let route = [...this.state.route]
    let currentObj = {...route[route.length -1]}
    let latLng = [...currentObj.latLng, object]
    currentObj.latLng = latLng
    route[route.length-1] = currentObj
    let newObj = { latLng: [], colour: this.state.colour, width: this.state.width };
    route.push(newObj)
    this.setState({
      route,
      watching: false
    });
  };

  start = async () => {
    let location = await this._getLocationAsync()
    let object = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timestamp: location.timestamp
    };
    let route = [...this.state.route]
    let currentObj = {...route[route.length -1]}
    let latLng = [...currentObj.latLng, object]
    currentObj.latLng = latLng
    route[route.length-1] = currentObj
    this._watchPosition(1);
    this.setState({
      route,
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

  setShowSlider = (val) => {
    this.setState({
      showSlider: val
    })
  }

  setWidth = async (width) => {
    if(this.state.watching) {
      let location = await this._getLocationAsync();
      let object = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: location.timestamp
      };
      let route = [...this.state.route]
      let currentObj = {...route[route.length -1]}
      let latLng = [...currentObj.latLng, object]
      currentObj.latLng = latLng
      route[route.length-1] = currentObj
      let newObj = { latLng: [object], colour: this.state.colour, width };
      route.push(newObj)
      this.setState({
        route,
        width
      });
    } else {
    let route = [...this.state.route]
    let currentObj = {...route[route.length -1]}
    currentObj.width = width
    route[route.length-1] = currentObj
      this.setState({
        route,
        width
      })
    }
  }
}

const styles = StyleSheet.create({
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
  toggle: {
    position: "relative",
    top: 65,
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

export default Tracker;
