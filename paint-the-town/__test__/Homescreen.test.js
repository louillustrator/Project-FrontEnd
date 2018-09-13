import React from "react";
import { mount } from "enzyme";
import { View, TouchableHighlight } from "react-native";
import renderer from "react-test-renderer";
import HomeScreen from "../components/HomeScreen";

describe('HomeScreen', () => {
    let props;
    let state;
    beforeEach(() => {
        props = {
            screenProps: {
                currentUser: 'Lou',
                updateUser: undefined
            },
            navigation: {
                navigate: jest.fn()
            }
        }
        state = {
            fontLoaded: false
        }
    });
    it('renders without crashing', () => {
        mount(<HomeScreen {...props} />);
    });
    it("renders correctly", () => {
        const tree = renderer.create(<HomeScreen {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    //test below will not take into account nested <Text> elements within TouchableHighlight
    it('View contains 5 children elements', () => {
        const wrapper = mount(<HomeScreen {...props} />);
        wrapper.setState({
            fontLoaded: true
        });
        expect(wrapper.find(View).children()).toHaveLength(5);
    });
    it("receives props", () => {
        const wrapper = mount(<HomeScreen {...props} />);
        wrapper.setState({
            fontLoaded: true
        });
        expect(Object.keys(wrapper.props()).length).toBe(2);
    });
});

