import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button } from 'react-native-elements';
import { MapView } from 'expo';
// import Platform from ' '
import Swipe from '../components/Swipe';
import * as actions from '../actions';

class DeckScreen extends Component {

  renderCard = (job) => {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <Card
        title={job.jobtitle}
      >
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'} /* Helps with MapView performance */
            initialRegion={initialRegion}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>
          {job.snippet.replace(/<b>/g, '').replace(/<\/b/g, '')}
        </Text>
      </Card>
    );
  }

  renderNoMoreCards = () => (
      <Card title="No more jobs">
        <Text>Stuff</Text>
      </Card>
    )

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likeJob(job)}
          keyProp="jobkey"
        />
      </View>
    );
  }
}

function mapStateToProps({ jobs }) {
  return { jobs: jobs.results };
}

const styles = {
  detailsWrapper: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginBottom: 10
  }
};

export default connect(mapStateToProps, actions)(DeckScreen);
