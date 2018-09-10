import React from "react";
import { Text, View, ScrollView } from "react-native";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Collection from "../components/Collection";


test('renders without crashing', () => {
    const rendered = renderer.create(<Collection />).toJSON();
    expect(rendered).toBeTruthy();
});

test("renders correctly", () => {
    const tree = renderer.create(<Collection />).toJSON();
    expect(tree).toMatchSnapshot();
});

test("contains matching elements", () => {
    const wrapper = shallow(<Collection />);
    expect(wrapper.find(View).shallow().containsAnyMatchingElements([<Text>My Gallery</Text>, ScrollView
    ])).toBeTruthy();
});
// ^ to be revised after new elements have been introduced