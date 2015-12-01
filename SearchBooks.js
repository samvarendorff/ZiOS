'use strict';
 
var React = require('react-native');
var SearchResults = require('./SearchResults');
var List = require('./BookList');
var Search = require('./Search');


var {
    StyleSheet,
    View,
    Text,
    Component,
    TextInput,
    TouchableHighlight,
    ActivityIndicatorIOS
    } = React;
 
var styles = StyleSheet.create({
    container: {
        marginTop: 65,
        padding: 10
    },
    searchInput: {
        height: 36,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#E6E6E6',
        fontSize: 18,
        flex: 1,
        borderRadius: 0,
        padding: 5
    },
    button: {
        height: 40,
        backgroundColor: '#045FB4',
        borderRadius: 2,
        justifyContent: 'center',
        marginTop: 20
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    instructions: {
        fontSize: 18,
        alignSelf: 'center',
        marginBottom: 15
    },
    fieldLabel: {
        fontSize: 15,
        marginTop: 15
    },
    errorMessage: {
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 15,
        color: 'red'
    }
});
 
class SearchBooks extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            jobId: '',
            jobName: '',
            jobStatus: '',
            jobType: '',
            jobOwner: '',
            isLoading: false,
            errorMessage: ''
        };
    }
 
 
    render() {
        var spinner = this.state.isLoading ?
            ( <ActivityIndicatorIOS
                hidden='true'
                size='large'/> ) :
            ( <View/>);
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.fieldLabel}>Job ID</Text>
                    <TextInput style={styles.searchInput} onChange={this.jobIdInput.bind(this)}/>
                </View>
                <View>
                    <Text style={styles.fieldLabel}>Job Name</Text>
                    <TextInput style={styles.searchInput} onChange={this.jobNameInput.bind(this)}/>
                </View>
                <View>
                    <Text style={styles.fieldLabel}>Job Owner</Text>
                    <TextInput style={styles.searchInput} onChange={this.jobOwnerInput.bind(this)}/>
                </View>
                <View>
                    <Text style={styles.fieldLabel}>Job Status</Text>
                    <TextInput style={styles.searchInput} onChange={this.jobTypeInput.bind(this)}/>
                </View>
                <View>
                    <Text style={styles.fieldLabel}>Job Type</Text>
                    <TextInput style={styles.searchInput} onChange={this.jobStatusInput.bind(this)}/>
                </View>
                <TouchableHighlight style={styles.button}
                                    underlayColor='#f1c40f'
                                    onPress={this.searchBooks.bind(this)}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableHighlight>
                {spinner}
                <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
            </View>
        );
    }
 
    jobIdInput(event) {
        this.setState({ jobId: event.nativeEvent.text });
    }
 
    jobNameInput(event) {
        this.setState({ jobName: event.nativeEvent.text });
    }

    jobOwnerInput(event) {
        this.setState({ jobOwner: event.nativeEvent.text });
    }

    jobTypeInput(event) {
        this.setState({ jobType: event.nativeEvent.text });
    }

    jobStatusInput(event) {
        this.setState({ jobStatus: event.nativeEvent.text });
    }
 
    searchBooks() {
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
 
module.exports = SearchBooks;