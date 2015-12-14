'use strict';

var React = require('react-native');
var Search = require('./Search');
var Featured = require('./Featured');

var {
    AppRegistry,
    TabBarIOS,
    Component
    } = React;

class BookSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'featured'
        };
    }

    render() {
        return (
                    <TabBarIOS selectedTab={this.state.selectedTab}>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'featured'}
                    icon={{uri:'featured', scale: 4}}
                    title='JOB LIST'
                    onPress={() => {
                        this.setState({
                            selectedTab: 'featured'
                        });
                    }}>
                    <Featured/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'search'}
                    icon={{uri:'search', scale: 4}}
                    title='SEARCH'
                    onPress={() => {
                        this.setState({
                            selectedTab: 'search'
                        });
                    }}>
                    <Search/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

AppRegistry.registerComponent('BookSearch', () => BookSearch);
