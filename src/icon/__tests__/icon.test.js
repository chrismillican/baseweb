/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */

import * as React from 'react';
import {render} from '@testing-library/react';
import {Icon} from '../index.js';
import * as Icons from '../icon-exports.js';

describe('Icon', () => {
  it('renders an icon with viewBox and title', () => {
    const viewBox = '0 0 23px 23px';
    const title = 'Test';

    const {container} = render(
      <Icon viewBox={viewBox} title={title}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z"
        />
      </Icon>,
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement.getAttribute('viewBox')).toBe(viewBox);
    const titleElement = container.querySelector('title');
    expect(titleElement.textContent).toBe(title);
  });

  it('renders with expected overrides', () => {
    const overrides = {Svg: {style: {fill: 'purple'}}};
    const {container} = render(
      <Icon overrides={overrides}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z"
        />
      </Icon>,
    );
    const svgElement = container.querySelector('svg');
    const style = JSON.parse(svgElement.getAttribute('test-style'));
    expect(style.fill).toBe(overrides.Svg.style.fill);
  });

  it('maintains color/size overrides passed to dollar prefix props', () => {
    const overrides = {Svg: {props: {size: '54px', color: 'blue'}}};
    const {container} = render(
      <Icon overrides={overrides}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z"
        />
      </Icon>,
    );
    const svgElement = container.querySelector('svg');
    const style = JSON.parse(svgElement.getAttribute('test-style'));
    expect(style.width).toBe(overrides.Svg.props.size);
    expect(style.height).toBe(overrides.Svg.props.size);
    expect(style.color).toBe(overrides.Svg.props.color);
    expect(style.fill).toBe(overrides.Svg.props.color);
  });

  // Test that all the icons render
  Object.keys(Icons).forEach(key => {
    const Component = Icons[key];
    test(`renders ${key} icon`, () => {
      const {container} = render(<Component />);
      const svgElement = container.querySelector('svg');
      expect(svgElement).not.toBeNull();
    });
  });
});
