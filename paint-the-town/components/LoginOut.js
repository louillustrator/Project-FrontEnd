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
        <FormInput onChangeText={(text) => this.handleChange("username", text)}/>
        <FormValidationMessage>{this.state.usernameError}</FormValidationMessage>
        <FormLabel>PASSWORD</FormLabel>
        <FormInput secureTextEntry={true} onChangeText={(text) => this.handleChange("password", text)}/>
        <FormValidationMessage>{this.state.passwordError}</FormValidationMessage>
        <Button
        disabled={!this.state.username || !this.state.password ? true : false}
        title={"Login"}
        accessibilityLabel={"Login"}
        color={"#786fa6"}
        onPress={() => this.handleLogin()}/>
    </View>
        
    }

    componentDidMount() {
        api.getUsernames()
        .then(allUsernames => {
            this.setState({
                allUsernames
            })
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
}

export default LoginOut;