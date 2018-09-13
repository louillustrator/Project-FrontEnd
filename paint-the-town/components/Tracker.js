import React, { Component } from "react";
import { View, Switch, Text } from "react-native";
import PropTypes from 'prop-types';
import { MapView } from "expo";
import ActionButt from "./ActionButt";
import * as tracker from "../utils/Tracker";
import Polylines from "./Polylines";
import * as api from "../utils/api";
import { takeSnapshotAsync } from "expo";
import { trackerStyles } from "../styles";
import WidthPicker from "./WidthPicker";

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
    showSlider: false,
    loadedMap: false
  };

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
        route: journey.route,
        loadedMap: true
      });
  };

  _getLocationAsync = tracker._getLocationAsync.bind(this);
  _watchPosition = tracker._watchPosition.bind(this);

  render() {
    const {
      container,
      navBar,
      navBarText,
      text,
      map,
      butt,
      toggleButt
    } = trackerStyles;
    const {
      toggle,
      region,
      blueDot,
      route,
      colour,
      width,
      showSlider
    } = this.state;

    return (
      <View style={container}>
        <View style={navBar}>
          <Text style={navBarText}>My Journey</Text>
        </View>

        <View style={toggleButt}>
          <Switch onValueChange={this.toggle} value={toggle} />
          <Text style={text}>Satellite View</Text>
        </View>

        <MapView
          collapsable={false}
          style={map}
          ref="routeMap"
          region={region}
          showsUserLocation={blueDot}
          showsMyLocationButton={true}
          showsCompass={true}
          followUserLocation={true}
          zoomEnabled={true}
          onRegionChangeComplete={this.setZoom}
          rotateEnabled={true}
          mapType={toggle ? "satellite" : "standard"}
        >
          <Polylines route={route} />
        </MapView>
        {showSlider && (
          <WidthPicker
            setShowSlider={this.setShowSlider}
            setWidth={this.setWidth}
            currentWidth={width}
          />
        )}
        <ActionButt
          style={butt}
          changeColour={this.changeColour}
          navigation={this.props.navigation}
          colour={colour}
          start={this.start}
          pause={this.pause}
          stop={this.stop}
          setShowSlider={this.setShowSlider}
        />
      </View>
    );
  }

  changeColour = async colour => {
    const { watching, width } = this.state;

    this.props.navigation.navigate("Tracker");
    if (watching) {
      let location = await this._getLocationAsync();
      let object = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: location.timestamp
      };
      let route = [...this.state.route];
      let currentObj = { ...route[route.length - 1] };
      let latLng = [...currentObj.latLng, object];
      currentObj.latLng = latLng;
      route[route.length - 1] = currentObj;
      let newObj = { latLng: [object], colour, width: this.state.width };
      route.push(newObj);
      this.setState({
        route,
        colour
      });
    } else {
      let route = [...this.state.route];
      let currentObj = { ...route[route.length - 1] };
      currentObj.colour = colour;
      route[route.length - 1] = currentObj;
      this.setState({
        route,
        colour
      });
    }
  };

  pause = async () => {
    this._watchPosition(0);
    let location = await this._getLocationAsync();
    let object = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timestamp: location.timestamp
    };
    let route = [...this.state.route];
    let currentObj = { ...route[route.length - 1] };
    let latLng = [...currentObj.latLng, object];
    currentObj.latLng = latLng;
    route[route.length - 1] = currentObj;
    let newObj = {
      latLng: [],
      colour: this.state.colour,
      width: this.state.width
    };
    route.push(newObj);
    this.setState({
      route,
      watching: false
    });
  };

  start = async () => {
    let location = await this._getLocationAsync();
    let object = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timestamp: location.timestamp
    };
    let route = [...this.state.route];
    if (!this.state.loadedMap) {
      let currentObj = { ...route[route.length - 1] };
      let latLng = [...currentObj.latLng, object];
      currentObj.latLng = latLng;
      route[route.length - 1] = currentObj;
      this._watchPosition(1);
      this.setState({
        route,
        watching: true
      });
    } else {
      let newObj = {
        latLng: [object],
        colour: this.state.colour,
        width: this.state.width
      };
      route = [...route, newObj];
      this._watchPosition(1);
      this.setState({
        route,
        loadedMap: false,
        watching: true
      });
    }
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
    this.props.navigation.navigate("Collection");
    this.setState({ blueDot: true });
  };

  setZoom = region => {
    this.setState({
      region
    });
  };

  toggle = () => this.setState({ toggle: !this.state.toggle });

  setShowSlider = val => {
    this.setState({
      showSlider: val
    });
  };

  setWidth = async width => {
    if (this.state.watching) {
      let location = await this._getLocationAsync();
      let object = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: location.timestamp
      };
      let route = [...this.state.route];
      let currentObj = { ...route[route.length - 1] };
      let latLng = [...currentObj.latLng, object];
      currentObj.latLng = latLng;
      route[route.length - 1] = currentObj;
      let newObj = { latLng: [object], colour: this.state.colour, width };
      route.push(newObj);
      this.setState({
        route,
        width
      });
    } else {
      let route = [...this.state.route];
      let currentObj = { ...route[route.length - 1] };
      currentObj.width = width;
      route[route.length - 1] = currentObj;
      this.setState({
        route,
        width
      });
    }
  };
}

Tracker.propTypes = {
  navigation: PropTypes.object.isRequired,
  screenProps: {
    currentUser: PropTypes.string.isRequired
  }
};

export default Tracker;
