import React from "react";
import { View } from "react-native";
import { mount } from 'enzyme';
import renderer from "react-test-renderer";
import WidthPicker from "../components/WidthPicker";


describe('Polylines', () => {
    let props;
    let state;
    beforeEach(() => {
        props = {
            currentWidth: 1,
            setShowSlider: jest.fn(),
            setWidth: jest.fn()
        };
        state = {
            width: 0
        };
    });
    it('renders without crashing', () => {
        mount(<WidthPicker {...props} />);
    });
    it("renders correctly", () => {
        const tree = renderer.create(<WidthPicker {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
