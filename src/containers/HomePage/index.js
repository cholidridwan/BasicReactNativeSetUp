import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
//import svgList from '../../assets/styles/svgList';
import SvgIcon from '../../utils/SvgIcon';
import {Container, Header, Body, Left, Right, 
    Button, Title, Icon, Content} from 'native-base';

const HomePage = ()=> {
    let {left, body} = styles;
    return(
        <Container>
            <Header>
                <Left  style={left}>
                    <Button transparent>
                        <SvgIcon name="icoLanch"/>
                        {/* <Image source={require('../../assets/images/png/example2.png')}/>  */}
                    </Button>
                </Left>
                <Body>
                    <Title>Header</Title>
                </Body>
                <Right/>
            </Header>
            <Content>
                <SvgIcon name="icoLanch"/>
                <Image source={require('../../assets/images/png/example2.png')}/> 
            </Content>
        </Container>

        // <View>
        //     {/* <Image source={require('../../assets/images/png/example2.png')}/> */}
        //     {/* {svgList['icoLaunch']} */}
        //     <SvgIcon name="icoLaunch" />
        // </View>
    )
} 

const styles = StyleSheet.create({
    left: {
        flex: 1
    },
    body: {
        flex: 7
    }
})


export default HomePage;
