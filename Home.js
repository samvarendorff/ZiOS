'use strict';
 
var React = require('react-native');
var Homepage = require('./Homepage')
 
var {
    StyleSheet,
    NavigatorIOS,
    Component,
    View,
    Image
   } = React;
 
var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
 
class Home extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                title: 'Home',
                component: Homepage}}/>
        );
    }
}
 
module.exports = Home;