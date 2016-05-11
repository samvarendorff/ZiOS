'use strict';
 
var React = require('react-native');
 
var {
    StyleSheet,
    Text,
    View,
    Component,
    TouchableHighlight,
    ActivityIndicatorIOS,
   } = React;
 
var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 74,
        alignItems: 'center',
        paddingBottom: 60 
    },
    item: {
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    title: {
        fontFamily: 'Helvetica Neue',
        fontSize: 18,
        fontWeight: "400",
        color: '#000000'
    },
    description: {
        fontFamily: 'Helvetica Neue',
        fontWeight: "200",
        fontSize: 18,
        color: '#656565'
    },
    button: {
        height: 40,
        backgroundColor: '#045FB4',
        borderRadius: 2,
        justifyContent: 'center',
        marginTop: 20
    },
    buttonText: {
        fontFamily: 'Helvetica Neue',
        fontSize: 18,
        fontWeight: "400",
        color: 'white',
        alignSelf: 'center',
        marginLeft: 50,
        marginRight: 50
    },
});
 
class BookDetail extends Component {
    render() {
        var job = this.props.job;
        var jobid = this.props.job.jobid;
        var jobname = this.props.job.jobname;
        var jobowner = this.props.job.owner;
        var jobstatus = this.props.job.status;
        var jobtype = this.props.job.type;
        var jobclass = this.props.job.class;
        var jobretcode = this.props.job.retcode;

        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.title}>ID</Text>
                    <Text style={styles.description}>{jobid}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Name</Text>
                    <Text style={styles.description}>{jobname}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Owner</Text>
                    <Text style={styles.description}>{jobowner}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Status</Text>
                    <Text style={styles.description}>{jobstatus}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Return Code</Text>
                    <Text style={styles.description}>{jobretcode}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Type</Text>
                    <Text style={styles.description}>{jobtype}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Class</Text>
                    <Text style={styles.description}>{jobclass}</Text>
                </View>
            </View>
        );
    }

    showFiles() {
        this.fetchData();
    }

    fetchData() {
 
        this.setState({ isLoading: true });
 
        var baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';
        if (this.state.bookAuthor !== '') {
            baseURL += encodeURIComponent('inauthor:' + this.state.bookAuthor);
        }
        if (this.state.bookAuthor !== '') {
            baseURL += encodeURIComponent('inauthor:' + this.state.bookAuthor);
        }
        if (this.state.bookAuthor !== '') {
            baseURL += encodeURIComponent('inauthor:' + this.state.bookAuthor);
        }
        if (this.state.bookAuthor !== '') {
            baseURL += encodeURIComponent('inauthor:' + this.state.bookAuthor);
        }
        if (this.state.bookTitle !== '') {
            baseURL += (this.state.bookAuthor === '') ? encodeURIComponent('intitle:' + this.state.bookTitle) : encodeURIComponent('+intitle:' + this.state.bookTitle);
        }
 
        console.log('URL: >>> ' + baseURL);
        fetch(baseURL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ isLoading: false});
                if (responseData.items) {
 
                    this.props.navigator.push({
                        title: 'Search Results',
                        component: SearchResults,
                        passProps: {books: responseData.items}
                    });
                } else {
                    this.setState({ errorMessage: 'No results found'});
                }
            })
            .catch(error =>
                this.setState({
                    isLoading: false,
                    errorMessage: error
                }))
            .done();
    }

}
 
module.exports = BookDetail;