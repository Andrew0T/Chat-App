import React from 'react';
import {Text,  View } from 'react-native';

export default class Chat extends React.Component {
  componentDidMount() {
// Set the name property to be included in the navigation bar
 let name = this.props.route.params.name;
 this.props.navigation.setOptions({ title: name });
}

 render() {
 // Sets the background color for the chat screen
 let color = this.props.route.params.color;
  return (
  // instead of using stylesheet.
    <View
      style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: color}}
    >
      <Text>This is the Chat screen!</Text>
    </View>
    );
  }
}