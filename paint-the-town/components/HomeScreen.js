import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image
} from "react-native";
import { Font } from 'expo';

class HomeScreen extends React.Component {
  state = {
    clicked: false,
    fontLoaded: false
  };

  render() {
    return (
      this.state.fontLoaded ? (
      <View style={styles.container}>
        <View style={styles.login}>
          <Text style={{ color: 'white', fontSize: 16, fontFamily: "raleway-regular" }}>Hi {this.props.screenProps.currentUser}</Text>
          <TouchableHighlight
          style={styles.logoutButton}
          onPress={this.logout}
        >
        <Text style={{ color: 'white', fontFamily: "raleway-regular" }}>Log Out</Text>
        </TouchableHighlight>
          {/* <Button
          style={styles.button}
          title={"Log Out"}
          accessibilityLabel={"Log Out"}
          color={"#786fa6"}
          onPress={this.logout}
          /> */}
          </View>
        {/* <Ionicons name="md-walk" size={100} color="white" /> */}
        <Image 
        style={{width: 170, height: 119}}
        source={require('../assets/logo.png')} />
        <Text style={{fontSize: 25, fontFamily: "bubblegum-sans-regular"}}>
          <Text style={{color: '#f43d3d'}}>Paint</Text><Text style={{color: "#f7f02a"}}> the </Text><Text style={{color: '#5d67ef'}}>Town</Text>
        </Text> 
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Tracker")}
        >
          <Text style={styles.text}>New Journey</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          color={"white"}
          onPress={() => this.props.navigation.navigate("Collection")}
        >
          <Text style={styles.text}>See Collection</Text>
          {/* title=
            {"Colour Picker"}
            accessibilityLabel=
            {"Pick a colour"}
            color=
            {"#786fa6"}
            onPress=
            {() => this.props.navigation.navigate("ColourPicker")}
            containerViewStyle=
            {{ width: "100%", marginLeft: 0 }} */}
        </TouchableHighlight>
        </View> ) : null
    );
  }

  componentDidMount() {

    Font.loadAsync({
      'bubblegum-sans-regular': require('../assets/fonts/BubblegumSans-Regular.ttf'),
      'raleway-regular': require('../assets/fonts/Raleway-Regular.ttf'),
    }).then(() => {
      this.setState({
        fontLoaded: true
      })
    });
  }

  logout = () => {
    this.props.screenProps.updateUser("");
    this.props.navigation.navigate("LoginOut");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#63cdda"
  },
  text : {
    fontFamily:'raleway-regular' 
  },
  login: {
   alignSelf: "flex-end",
   position: "absolute",
   top: "2%",
   right: "5%"
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    opacity: 100,
    padding: 17,
    margin: 10,
    width: "45%"
  },
  logoutButton: {
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
    opacity: 100,
    padding: 8,
    margin: 10,
    width: 80,
  }
});

export default HomeScreen;
