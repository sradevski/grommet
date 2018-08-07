var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Children, Component } from 'react';
import { compose } from 'recompose';
import { ThemeContext as IconThemeContext } from 'grommet-icons';

import ThemeContext from '../../contexts/ThemeContext';
import { backgroundIsDark } from '../../utils';
import { withForwardRef, withTheme } from '../hocs';

import StyledBox, { StyledBoxGap } from './StyledBox';

import doc from './doc';

var styledComponents = {
  div: StyledBox
}; // tag -> styled component

var Box = function (_Component) {
  _inherits(Box, _Component);

  function Box() {
    var _temp, _this, _ret;

    _classCallCheck(this, Box);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Box.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var background = nextProps.background,
        theme = nextProps.theme;
    var stateTheme = prevState.theme;


    var dark = theme.dark;
    if (background) {
      dark = backgroundIsDark(background, theme);
    }

    if (dark !== theme.dark && (!stateTheme || dark !== stateTheme.dark)) {
      return {
        theme: _extends({}, theme, {
          dark: dark,
          icon: dark ? theme.iconThemes.dark : theme.iconThemes.light
        })
      };
    } else if (dark === theme.dark && stateTheme) {
      return { theme: undefined };
    }
    return null;
  };

  Box.prototype.render = function render() {
    var _props = this.props,
        a11yTitle = _props.a11yTitle,
        children = _props.children,
        direction = _props.direction,
        elevation = _props.elevation,
        fill = _props.fill,
        forwardRef = _props.forwardRef,
        gap = _props.gap,
        overflow = _props.overflow,
        responsive = _props.responsive,
        tag = _props.tag,
        propsTheme = _props.theme,
        wrap = _props.wrap,
        rest = _objectWithoutProperties(_props, ['a11yTitle', 'children', 'direction', 'elevation', 'fill', 'forwardRef', 'gap', 'overflow', 'responsive', 'tag', 'theme', 'wrap']);

    var stateTheme = this.state.theme;

    var theme = stateTheme || propsTheme;

    var StyledComponent = styledComponents[tag];
    if (!StyledComponent) {
      StyledComponent = StyledBox.withComponent(tag);
      styledComponents[tag] = StyledComponent;
    }

    var contents = children;
    if (gap) {
      contents = [];
      var firstIndex = void 0;
      Children.forEach(children, function (child, index) {
        if (child) {
          if (firstIndex === undefined) {
            firstIndex = index;
          } else {
            contents.push(React.createElement(StyledBoxGap, {
              key: index,
              gap: gap,
              directionProp: direction,
              responsive: responsive,
              theme: theme
            }));
          }
        }
        contents.push(child);
      });
    }

    var content = React.createElement(
      StyledComponent,
      _extends({
        'aria-label': a11yTitle,
        innerRef: forwardRef,
        directionProp: direction,
        elevationProp: elevation,
        fillProp: fill,
        overflowProp: overflow,
        wrapProp: wrap,
        responsive: responsive,
        theme: theme
      }, rest),
      contents
    );

    if (stateTheme) {
      if (stateTheme.dark !== propsTheme.dark && stateTheme.icon) {
        content = React.createElement(
          IconThemeContext.Provider,
          { value: stateTheme.icon },
          content
        );
      }
      content = React.createElement(
        ThemeContext.Provider,
        { value: stateTheme },
        content
      );
    }

    return content;
  };

  return Box;
}(Component);

Box.defaultProps = {
  direction: 'column',
  margin: 'none',
  pad: 'none',
  responsive: true,
  tag: 'div'
};


if (process.env.NODE_ENV !== 'production') {
  doc(Box);
}

export default compose(withTheme, withForwardRef // needed for RangeSelector
)(Box);