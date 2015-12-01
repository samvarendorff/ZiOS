'use strict';
 
var React = require('react-native');
var BookDetail = require('./BookDetail');
 
var {
    Image,
    StyleSheet,
    Text,
    View,
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 20,
        marginBottom: 8
    },
    author: {
        color: '#656565'
    },
    separator: {
       height: 1,
       backgroundColor: '#dddddd'
   },
   listView: {
        paddingTop: 64,
        backgroundColor: '#F5FCFF'
   },
   loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   }
});

// var REQUEST_URL = 'http://localhost:3000/v1/books/fictionbooks';
var REQUEST_URL = 'http://localhost:3000/zosmf/restjobs/jobs';
 
class BookList extends Component {

    constructor(props) {
       super(props);
       this.state = {
           isLoading: true,
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
       .then((response) => response.json())
       .then((responseData) => {
           this.setState({
               dataSource: this.state.dataSource.cloneWithRows(responseData.jobs),
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
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderBook.bind(this)}
                style={styles.listView}/>
        );
    }

    renderBook(job) {
       return (
            <TouchableHighlight onPress={() => this.showBookDetail(job)}  underlayColor='#dddddd'>
                <View>
                    <View style={styles.container}>
                        <Image
                            icon={{uri: 'featured_pressed'}}
                            style={styles.thumbnail} />
                        <View style={styles.rightContainer}>
                            <Text style={styles.title}>{job.jobid} - {job.jobname}</Text>
                            <Text style={styles.author}>Owner: {job.owner}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>

       );
   }

   renderLoadingView() {
    return (
        <View style={styles.loading}>
            <ActivityIndicatorIOS
                size='large'/>
            <Text>
                Loading books...
            </Text>
        </View>
        );
    }

   showBookDetail(job) {
       this.props.navigator.push({
           title: job.jobid,
           component: BookDetail,
           passProps: {job}
       });
   }

}

module.exports = BookList;