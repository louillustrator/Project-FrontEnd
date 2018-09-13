import React from "react";
import { Platform, View } from "react-native";
import MapView from "react-native-maps";
import { mount } from 'enzyme';
import renderer from "react-test-renderer";
import Polylines from "../components/Polylines";


describe('Polylines', () => {
    let props;
    beforeEach(() => {
        props = {
            route: []
        };
    });
    it('renders without crashing', () => {
        mount(<Polylines {...props} />);
    });
    it("renders correctly", () => {
        const tree = renderer.create(<Polylines {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("checks render for android platform", () => {
        Platform.OS = 'android';
        const wrapper = mount(<Polylines {...props} />);
        expect(wrapper.find(View)).toHaveLength(1);
    });
    it("checks render for ios platform", () => {
        Platform.OS = 'ios';
        const wrapper = mount(<Polylines {...props} />);
        expect(wrapper.find(MapView.Polyline)).toHaveLength(21);
    });
});