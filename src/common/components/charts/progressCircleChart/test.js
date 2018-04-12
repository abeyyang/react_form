import React from 'react';
import { shallow } from 'enzyme';
import ProgressCircleChart from './';

describe('ProgressCircleChart test', () => {
    const max = 100;

    it('should render one <svg> component', () => {
        const testApp = shallow(<ProgressCircleChart max={max} value={0} />);
        expect(testApp.find('svg').length).toBe(1);
    });

    it('should render two <circle> component', () => {
        const testApp = shallow(<ProgressCircleChart max={max} value={0} />);
        expect(testApp.find('circle').length).toBe(2);
    });
});
