import React from "react";
import { View, TouchableHighlight } from "react-native";
import { FormInput } from 'react-native-elements'
import { mount } from 'enzyme';
import renderer from "react-test-renderer";
import LoginOut from "../components/LoginOut";


describe('LoginOut', () => {
    let props;
    let state;
    beforeEach(() => {
        props = {
            screenProps: {
                currentUser: undefined,
                updateUser: undefined
            }
        };
        state = {
            allUsernames: [],
            username: "",
            password: "",
            usernameError: "",
            passwordError: "",
            fontLoaded: false
        };
    });
    it('renders without crashing', () => {
        mount(<LoginOut {...props} />);
    });
    it("renders correctly", () => {
        const tree = renderer.create(<LoginOut {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('contains 9 children elements', () => {
        const wrapper = mount(<LoginOut {...props} />);
        wrapper.setState({
            fontLoaded: true
        });
        expect(wrapper.find(View).children()).toHaveLength(9);
    });
    it('contains 2 FormInput elements', () => {
        const wrapper = mount(<LoginOut {...props} />);
        wrapper.setState({
            fontLoaded: true
        });
        expect(wrapper.find(FormInput)).toHaveLength(2);
    });
    it('first FormInput element receives props', () => {
        const wrapper = mount(<LoginOut {...props} />);
        wrapper.setState({
            fontLoaded: true
        });
        expect((wrapper.find(FormInput)).at(0).props()).toHaveProperty('value', 'onChangeText', 'normalizeFontSize');
    });
    it('second FormInput element receives props', () => {
        const wrapper = mount(<LoginOut {...props} />);
        wrapper.setState({
            fontLoaded: true
        });
        expect((wrapper.find(FormInput)).at(0).props()).toHaveProperty('value', 'secureTextEntry', 'onChangeText', 'normalizeFontSize');
    });
    it('contains 2 TouchableHighlight elements', () => {
        const wrapper = mount(<LoginOut {...props} />);
        wrapper.setState({
            fontLoaded: true
        });
        expect(wrapper.find(TouchableHighlight)).toHaveLength(2);
    });
    it('the 2 TouchableHighlight elements receive props', () => {
        const wrapper = mount(<LoginOut {...props} />);
        wrapper.setState({
            fontLoaded: true
        });
        expect((wrapper.find(TouchableHighlight)).at(0).props()).toHaveProperty('disabled', 'onPress', 'style');
        expect((wrapper.find(TouchableHighlight)).at(1).props()).toHaveProperty('disabled', 'onPress', 'style');
    });
    it('checks that Login & SignUp TouchableHighlights are disabled by default', () => {
        const wrapper = mount(<LoginOut {...props} />);
        wrapper.setState({
            fontLoaded: true
        });
        const spy = jest.spyOn(wrapper.instance(), 'handleSignUp');
        expect(wrapper.find('TouchableHighlight').at(0).props().disabled).toBe(true);
        expect(wrapper.find('TouchableHighlight').at(1).props().disabled).toBe(true);
    });
    it('checks that onPress function has been called for TouchableHighlights when btns are disabled', () => {
        const wrapper = mount(<LoginOut {...props} />);
        wrapper.setState({
            username: "pwr",
            password: "rgrs",
            fontLoaded: true
        });
        const spyLogin = jest.spyOn(wrapper.instance(), 'handleLogin');
        const spySignUp = jest.spyOn(wrapper.instance(), 'handleSignUp');
        wrapper.find(TouchableHighlight).at(0).props().onPress();
        wrapper.find(TouchableHighlight).at(1).props().onPress();
        expect(wrapper.find(TouchableHighlight).at(0).props().disabled).toBe(false);
        expect(spyLogin).toHaveBeenCalledTimes(1);
        expect(wrapper.find(TouchableHighlight).at(1).props().disabled).toBe(false);
        expect(spySignUp).toHaveBeenCalledTimes(1);
    });
});

// console.warn(wrapper.find('TouchableHighlight').at(0).debug())