import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import * as api from '../api';

class LoginOut extends React.Component {
    state = {
        allUsernames: [],
        username: "",
        password: "",
        usernameError: "",
        passwordError: ""
    } 
    render () {
    if (this.props.screenProps.currentUser) this.props.navigation.navigate("Home")
    return <View>
        <FormLabel>USERNAME</FormLabel>
        <FormInput value={this.state.username} onChangeText={(text) => this.handleChange("username", text)}/>
        <FormValidationMessage>{this.state.usernameError}</FormValidationMessage>
        <FormLabel>PASSWORD</FormLabel>
        <FormInput value={this.state.password} secureTextEntry={true} onChangeText={(text) => this.handleChange("password", text)}/>
        <FormValidationMessage>{this.state.passwordError}</FormValidationMessage>
        <Button
        disabled={!this.state.username || !this.state.password ? true : false}
        title={"Login"}
        accessibilityLabel={"Login"}
        color={"#786fa6"}
        onPress={() => this.handleLogin()}/>
        <Button
        disabled={!this.state.username || !this.state.password ? true : false}
        title={"Sign Up"}
        accessibilityLabel={"Sign up"}
        color={"#786fa6"}
        onPress={() => this.handleSignUp()}/>
    </View>
        
    }

    componentDidUpdate() {
        api.getUsernames()
        .then(allUsernames => {
            if (this.state.allUsernames.length !== allUsernames.length) {
                this.setState({
                    allUsernames
                }, console.warn(allUsernames))
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

export default LoginOut;