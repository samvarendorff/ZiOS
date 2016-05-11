'use strict';
 
var React = require('react-native');
var SearchBar = require('react-native-search-bar');
var RecordContents = require('./RecordContents');
 
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

var REQUEST_URL = 'http://localhost:3000/zosmf/restjobs/jobs/TESTJOB2/JOB00023/files';
 
class JobFileDetails extends Component {
    
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
               dataSource: this.state.dataSource.cloneWithRows(responseData.files),
               data: responseData.files,
               isLoading: false
           });
       })
       .done();
    }

    render() {
        
       var jobid = this.props.jobid;
       var jobname = this.props.jobname;
       var subsystem = this.props.subsystem;
       var id = this.props.id;
       var stepname = this.props.stepname;
       var procstep = this.props.procstep;
       var jobclass = this.props.class;
       var ddname = this.props.ddname;
       var recordcount = this.props.recordcount;
       var bytecount = this.props.bytecount;
       var recordsurl = this.props.recordsurl;
        
       if (this.state.isLoading) {
           return this.renderLoadingView();
       }
 
      return (
        <View style={styles.searchBar}>
          <SearchBar
            onChangeText={this._filterFiles.bind(this)}             
            value={this.state.text}
            placeholder='Filter by JOBNAME'/>
          <ListView style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={this.renderFile.bind(this)}/>
        </View>
      );
    }
    
    renderFile(file) {
        
      var fileImage = "view_file"
        
      return (
            <TouchableHighlight onPress={() => this.showFileContent(file)}  underlayColor='#dddddd'>
                <View>
                    <View style={styles.container}>
                      <Image
                          source={{uri: fileImage, scale: 1}}
                          style={styles.thumbnail} />
                        <View style={styles.rightContainer}>
                            <Text style={styles.title}>{file.stepname} - {file.ddname}</Text>
                            <Text style={styles.author}>Record Count - {file.recordcount}</Text>
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
                Loading files...
            </Text>
        </View>
        );
    }
    
    _filterFiles(text) {

    var filteredFiles = this.state.data.filter(
      function (value) {
        return (value.jobname.toLowerCase().indexOf(text.toLowerCase()) > -1);
      });
    
    this.setState ({
      dataSource: this.state.dataSource.cloneWithRows(filteredFiles)
    });

  }
  
     showFileContent(file) {
       this.props.navigator.push({
           title: file.ddname,
           component: RecordContents,
           passProps: {file}
       });
   }
   
}
 
module.exports = JobFileDetails;