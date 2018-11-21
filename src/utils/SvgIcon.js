import React, { Component } from 'react';
import { View } from 'react-native';
import svgList from '../assets/styles/svgList';

class SvgIcon extends Component {
  render() {
    let icon = svgList[this.props.name];
    if (!icon) {
      return <View {...this.props}></View>
    }
    return (
      <View {...this.props}>
        {icon}
      </View>
    );
  }
}

export default SvgIcon;