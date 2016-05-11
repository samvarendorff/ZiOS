'use strict';
 
var React = require('react-native');
var BookList = require('./BookList');

 
var {
    StyleSheet,
    NavigatorIOS,
    Component
   } = React;
 
var styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Helvetica Neue',
        fontSize: 20,
        fontWeight: "200"
    }
});
 
class Featured extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    title: 'Jobs Details',
                    component: BookList
            }}/>            
        );
    }
}
 
module.exports = Featured;