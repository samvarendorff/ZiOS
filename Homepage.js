'use strict';
 
var React = require('react-native');
 
var {
    StyleSheet,
    NavigatorIOS,
    Component,
    View,
    Image,
    Text
   } = React;
 
var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4178be'
    },
    view: {
        flex: 1,
        paddingTop: 84,
        alignItems: 'center',
        backgroundColor: '#4178be'

    },
    image: {
        height: 300,
        width: 300,
        paddingTop: 20
    },
    heading: {
        fontFamily: 'Helvetica Neue',
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: "400",
        paddingTop: 10,
        textAlign: 'center'
    },
    body: {
        fontFamily: 'Helvetica Neue',
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: "400",
        padding: 10,
        textAlign: 'center'
    }
});
 
class Homepage extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
            <View style={styles.view}>
                <Image style={styles.image} source={require('image!logo')}/>
            <Text style={styles.heading}>
            Welcome to ZiOS
            </Text>
            <Text style={styles.body}>
            Bringing the Green Screen to the mobile, ZiOS provides members of your team the ability to monitor, manage and report on jobs running on a z/OS System. 
            Whether Mamagement, Programmer or Customer, ZiOS serves all equally.
            </Text>
            </View>
            </View>
        );
    }
}
 
module.exports = Homepage;