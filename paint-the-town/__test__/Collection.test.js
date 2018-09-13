import React from "react";
import { mount } from "enzyme";
import { View, TouchableHighlight } from "react-native";
import renderer from "react-test-renderer";
import Collection from "../components/Collection";

describe('Polylines', () => {
    let props;
    let state;
    beforeEach(() => {
        props = {
            navigation: {
                navigate: jest.fn()
            },
            screenProps: {
                currentUser: undefined,
                updateUser: undefined
            }
        };
        state = {
            images: null,
            loading: true
        };
    });
    it('renders without crashing', () => {
        mount(<Collection {...props} />);
    });
    it("renders correctly", () => {
        const tree = renderer.create(<Collection {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
