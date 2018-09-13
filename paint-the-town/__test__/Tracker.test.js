import React from "react";
import Tracker from "../components/Tracker";
import { View } from "react-native";
import { shallow } from 'enzyme';

import renderer from "react-test-renderer";


describe('Tracker', () => {
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
            region: {
                latitude: 55.3781,
                longitude: 3.436,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            },
            errorMessage: null,
            subscrition: {},
            route: [{ latLng: [], colour: "#3600ff", width: 1 }],
            width: 1,
            status: null,
            watching: false,
            colour: "#3600ff",
            blueDot: true,
            toggle: false,
            showSlider: false
        };
        jest.mock('react-native-maps', () => 'MapView');
    });
    it('renders without crashing', () => {
        const rendered = renderer.create(<Tracker />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it("renders correctly", () => {
        const tree = renderer.create(<Tracker />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("a view component is always rendered", () => {
        const wrapper = shallow(<Tracker />);
        expect(wrapper.find(View)).toHaveLength(3);
    });
    it('contains 2 children elements', () => {
        const wrapper = shallow(<Tracker />);
        expect(wrapper.find(View).children()).toHaveLength(7);
    });
});

