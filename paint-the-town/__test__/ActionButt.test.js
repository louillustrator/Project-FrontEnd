import React from "react";
import { mount } from 'enzyme';
import renderer from "react-test-renderer";
import ActionButt from "../components/ActionButt";


describe('ActionButt', () => {
    let props;
    beforeEach(() => {
        props = {
            colour: "#228B22",
            navigation: undefined,
            changeColour: undefined,
            stop: undefined,
            start: undefined,
            pause: undefined,
            setShowSlider: undefined
        };
    });
    it('renders without crashing', () => {
        let wrapper = mount(<ActionButt {...props} />);
    });
    it("renders correctly", () => {
        const tree = renderer.create(<ActionButt {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});