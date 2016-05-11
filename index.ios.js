'use strict';

var React = require('react-native');
var Featured = require('./Featured');
var Files = require('./Files');
var Home = require('./Home');

var {
    StyleSheet,
    AppRegistry,
    TabBarIOS,
    Component
    } = React;
    
var styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#4178be'
    }
});

class BookSearch extends Component {

    constructor(props) {
        super(props);   
        this.state = {
            selectedTab: 'home'
        };
    }

    render() {
        return (
                <TabBarIOS 
                style={styles.tabBar}
                selectedTab={this.state.selectedTab}>
                    <TabBarIOS.Item
                    selected={this.state.selectedTab === 'home'}
                    icon={{uri:'home', scale: 4}}
                    title='Home'
                    onPress={() => {
                        this.setState({
                            selectedTab: 'home'
                        });
                    }}>
                    <Home/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'featured'}
                    icon={{uri:'featured', scale: 4}}
                    title='Job List'
                    onPress={() => {
                        this.setState({
                            selectedTab: 'featured'
                        });
                    }}>
                    <Featured/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'files'}
                    icon={{uri:'view_file', scale: 4}}
                    title='Files'
                    onPress={() => {
                        this.setState({
                            selectedTab: 'files'
                        });
                    }}>
                    <Files/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

AppRegistry.registerComponent('BookSearch', () => BookSearch);
