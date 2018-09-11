import React from "react";
import { Button, Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import * as api from '../utils/api';
import { Font } from 'expo';

class LoginOut extends React.Component {
    state = {
        allUsernames: [],
        username: "",
        password: "",
        usernameError: "",
        passwordError: "",
        fontLoaded: false
    } 
    render () {
    // if (this.props.screenProps.currentUser) this.props.navigation.navigate("Home")
    return (
        this.state.fontLoaded ? (
        <View style={styles.container}>
    <Text style={{fontSize: 25, fontFamily: 'bubblegum-sans-regular'}}>
          <Text style={{color: '#f43d3d'}}>Paint</Text><Text style={{color: "#f7f02a"}}> the </Text><Text style={{color: '#5d67ef'}}>Town</Text>
        </Text> 
        <Text style={{color: "white", padding: 10, fontFamily: "raleway-regular"}}>Login or Sign Up to get started</Text>
        <FormLabel labelStyle={{color: "#898989"}}>USERNAME</FormLabel>
        <FormInput inputContainerStyle={{color:"#898989"}} value={this.state.username} onChangeText={(text) => this.handleChange("username", text)}/>
        <FormValidationMessage>{this.state.usernameError}</FormValidationMessage>
        <FormLabel labelStyle={{color: "#898989"}}>PASSWORD</FormLabel>
        <FormInput value={this.state.password} secureTextEntry={true} onChangeText={(text) => this.handleChange("password", text)}/>
        <FormValidationMessage>{this.state.passwordError}</FormValidationMessage>
        <TouchableHighlight
          style={!this.state.username || !this.state.password ? styles.disabledButton : styles.button}
          disabled={!this.state.username || !this.state.password}
          onPress={() => this.handleLogin()}
        >
          <Text style={{ color: "#898989", fontFamily: "raleway-regular"}}>Login</Text>
        </TouchableHighlight>
        {/* <Button
        style={styles.button}
        disabled={!this.state.username || !this.state.password ? true : false}
        title={"Login"}
        accessibilityLabel={"Login"}
        //color={"#786fa6"}
        onPress={() => this.handleLogin()}/> */}
        <TouchableHighlight
          style={!this.state.username || !this.state.password ? styles.disabledButton : styles.button}
          disabled={!this.state.username || !this.state.password}
          onPress={() => this.handleSignUp()}
        >
          <Text style={{ fontFamily: "raleway-regular", color: "#898989" }}>Sign Up</Text>
        </TouchableHighlight>
        {/* <Button
        disabled={!this.state.username || !this.state.password ? true : false}
        title={"Sign Up"}
        accessibilityLabel={"Sign up"}
        color={"#786fa6"}
        onPress={() => this.handleSignUp()}/> */}
        </View> ) : null 

        )
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

    componentDidUpdate() {
        if (this.props.screenProps.currentUser) this.props.navigation.navigate("Home");
        api.getUsernames()
        .then(allUsernames => {
            if (this.state.allUsernames.length !== allUsernames.length) {
                this.setState({
                    allUsernames
                })
            } 
        })     
    };

    handleChange = (field, input) => {
        if (field === "username") {
            this.setState({
                username: input,
                usernameError: ""
            })
        } else if (field === "password") {
            this.setState({
                password: input,
                passwordError: ""
            })
        }
    }

    handleLogin = () => {
        if (this.state.allUsernames.includes(this.state.username.toLowerCase())) {
            api.checkPassword(this.state.username.toLowerCase(), this.state.password)
            .then(message => {
                if (message === "Password accepted") {
                    this.props.screenProps.updateUser(this.state.username.toLowerCase());
                    this.setState({
                        username: "",
                        password: ""
                    })
                    this.props.navigation.navigate("Home");
                } else {
                    this.setState({
                        passwordError: "Incorrect password"
                    })
                }
            })
        } else {
            this.setState({
                usernameError: "Username not found!"
            })
        }
    }
    handleSignUp = () => {
        if (this.state.allUsernames.includes(this.state.username.toLowerCase())) {
            this.setState({
                usernameError: "Username already exists!"
            })
        } else {
            api.addUser(this.state.username.toLowerCase(), this.state.password)
            .then(message => {
                if (message === "OK") {
                    this.props.screenProps.updateUser(this.state.username.toLowerCase());
                    this.setState({
                        username: "",
                        password: ""
                    })
                    this.props.navigation.navigate("Home");
                }
            })
        }
    }
}

const styles = StyleSheet.create({
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
      }
});

export default LoginOut;