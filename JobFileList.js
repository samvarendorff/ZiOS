'use strict';
 
var React = require('react-native');
var JobFileDetails = require('./JobFileDetails');
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
   }
});

var REQUEST_URL = 'http://localhost:3000/zosmf/restjobs/jobs';
 
class JobFileList extends Component {

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
       .then((response) => response.json())
       .then((responseData) => {
           this.setState({
               dataSource: this.state.dataSource.cloneWithRows(responseData.jobs),
               data: responseData.jobs,
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
          <SearchBar
            onChangeText={this._filterJobs.bind(this)}             
            value={this.state.text}
            placeholder='Filter by JOBNAME'/>
          <ListView style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={this.renderBook.bind(this)}/>
        </View>
      );
    }

    renderBook(job) {

      if (job.status == "OUTPUT") {
        var jobImage = "output_icon"
      }
      else if (job.status == "STARTED")  {
        var jobImage = "started_icon"
      }
      else if (job.status == "WAITING")  {
        var jobImage = "waiting_icon"
      }
      else {
        var jobImage = "unknown_icon"
      }

      return (
            <TouchableHighlight onPress={() => this.showBookDetail(job)}  underlayColor='#dddddd'>
                <View>
                    <View style={styles.container}>
                      <Image
                          source={{uri: jobImage, scale: 1}}
                          style={styles.thumbnail} />
                        <View style={styles.rightContainer}>
                            <Text style={styles.title}>{job.jobid} - {job.jobname}</Text>
                            <Text style={styles.author}>Owner - {job.owner}</Text>
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
           component: JobFileDetails,
           passProps: {job}
       });
   }

   _filterJobs(text) {

    var filteredJobs = this.state.data.filter(
      function (value) {
        return (value.jobname.toLowerCase().indexOf(text.toLowerCase()) > -1);
      });
    
    this.setState ({
      dataSource: this.state.dataSource.cloneWithRows(filteredJobs)
    });

  }

}

module.exports = JobFileList;