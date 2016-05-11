'use strict';
 
var React = require('react-native');
var SearchBar = require('react-native-search-bar');
 
var {
    Image,
    StyleSheet,
    Text,
    View,
    NativeModules,
    Platform,
    Component,
    ListView,
    TouchableHighlight,
    ActivityIndicatorIOS,
    NavigatorIOS
   } = React;
 
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#000000',
        padding: 10
    },
    thumbnail: {
        width: 35,
        height: 35,
        marginRight: 10
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 10
    },
    title: {
        fontFamily: 'Helvetica Neue',
        fontSize: 16,
        fontWeight: "400",
        marginBottom: 8
    },
    author: {
        fontFamily: 'Helvetica Neue',
        fontWeight: "200",
        fontSize: 16,
        color: '#656565'
    },
    separator: {
       height: 1,
       backgroundColor: '#dddddd'
   },
   listView: {
      flex: 1,
      marginBottom: 48,
      backgroundColor: '#F5FCFF'
   },
   searchBar: {
        flex: 1,
        paddingTop: 64,
        backgroundColor: '#F5FCFF'
   },
   loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   },
   body: {
        flex: 1,
        fontFamily: 'Courier New',
        fontSize: 16,
        fontWeight: "200",
        padding: 10,
        textAlign: 'center',
        color: '#01DF3A'
    }
});

var REQUEST_URL = 'http://localhost:3000/zosmf/restjobs/jobs/TESTJOB2/JOB00023/files/1/records';
 
class RecordContents extends Component {
    
     constructor(props) {
       super(props);
       this.state = {
           isLoading: true,
           data: [],
           dataSource: new ListView.DataSource({
               rowHasChanged: (row1, row2) => row1 !== row2
           })
       };
   }

    componentDidMount() {
       this.fetchData();
   }
 
   fetchData() {
       fetch(REQUEST_URL)
       .then((response) => response.text())
       .then((responseData) => {
           this.setState({
               dataSource: this.state.dataSource,
               data: responseData,
               isLoading: false
           });
       })
       .done();
    }

    render() {
                
       if (this.state.isLoading) {
           return this.renderLoadingView();
       }
 
      return (
        <View style={styles.searchBar}>
            <View style={styles.container}>
            <Text style={styles.body}>
                {this.state.data}
            </Text>
            </View>
        </View>
      );
    }
   
   renderLoadingView() {
    return (
        <View style={styles.loading}>
            <ActivityIndicatorIOS
                size='large'/>
            <Text>
                Loading files...
            </Text>
        </View>
        );
    }
}
 
module.exports = RecordContents;