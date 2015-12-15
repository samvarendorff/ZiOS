'use strict';
 
var React = require('react-native');
 
var {
    StyleSheet,
    Text,
    View,
    Component
   } = React;
 
var styles = StyleSheet.create({
    container: {
        paddingTop: 74,
        alignItems: 'center'
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
        fontSize: 20,
        fontWeight: "400",
        color: '#000000'
    },
    description: {
        fontFamily: 'Helvetica Neue',
        fontWeight: "200",
        fontSize: 20,
        color: '#656565'
    }
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
}
 
module.exports = BookDetail;