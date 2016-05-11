'use strict';
 
var React = require('react-native');
var JobFileList = require('./JobFileList');

 
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
 
class Files extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    title: 'Job Spool Files',
                    component: JobFileList
            }}/>            
        );
    }
}
 
module.exports = Files;