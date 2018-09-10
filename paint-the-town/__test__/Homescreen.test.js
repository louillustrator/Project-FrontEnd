import React from "react";
import { shallow } from "enzyme";
import { View, TouchableHighlight } from "react-native";
import renderer from "react-test-renderer";
import HomeScreen from "../components/HomeScreen";

test('renders without crashing', () => {
    const rendered = renderer.create(<HomeScreen />).toJSON();
    expect(rendered).toBeTruthy();
});

test("renders correctly", () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('it should render 1 view component', () => {
    const wrapper = shallow(<HomeScreen />);
    expect(wrapper.find(View)).toHaveLength(1);
});

test('contains 2 <TouchableHighlight/> elements', () => {
    const wrapper = shallow(<HomeScreen />);
    expect(wrapper.find(View).shallow().find(TouchableHighlight)).toHaveLength(2);
});

test('contains 4 children elements', () => {
    const wrapper = shallow(<HomeScreen />);
    expect(wrapper.find(View).children()).toHaveLength(4);
});

