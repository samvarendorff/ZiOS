'use strict';

var React = require('react-native');
var Search = require('./Search');
var Featured = require('./Featured');
var Files = require('./Files');
var Home = require('./Home');
var Settings = require('./Settings');

var {
    AppRegistry,
    TabBarIOS,
    Component
    } = React;

class BookSearch extends Component {

    constructor(props) {
        super(props);   
        this.state = {
            selectedTab: 'home'
        };
    }

    render() {
        return (
                <TabBarIOS selectedTab={this.state.selectedTab}>
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
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'search'}
                    icon={{uri:'search', scale: 4}}
                    title='Search'
                    onPress={() => {
                        this.setState({
                            selectedTab: 'search'
                        });
                    }}>
                    <Search/>
                </TabBarIOS.Item>
                
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'settings'}
                    icon={{uri:'settings', scale: 4}}
                    title='Settings'
                    onPress={() => {
                        this.setState({
                            selectedTab: 'settings'
                        });
                    }}>
                    <Settings/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

AppRegistry.registerComponent('BookSearch', () => BookSearch);
