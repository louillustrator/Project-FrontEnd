import React from "react";
import Tracker from "../components/Tracker";
import { shallow } from 'enzyme';

import renderer from "react-test-renderer";

test('renders without crashing', () => {
    const rendered = renderer.create(<Tracker />).toJSON();
    expect(rendered).toBeTruthy();
});

test("renders correctly", () => {
    const tree = renderer.create(<Tracker />).toJSON();
    expect(tree).toMatchSnapshot();
});
