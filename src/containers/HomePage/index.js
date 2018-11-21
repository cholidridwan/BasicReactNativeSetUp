import React from 'react';
import {View, Text, Image} from 'react-native';
//import svgList from '../../assets/styles/svgList';
import SvgIcon from '../../utils/SvgIcon';

const HomePage = ()=> {
    return(
        <View>
            <Text>te</Text>
            {/* <Image source={require('../../assets/images/png/example2.png')}/> */}
            {/* {svgList['icoLaunch']} */}
            <SvgIcon name="icoLaunch" />
        </View>
    )
} 

export default HomePage;
