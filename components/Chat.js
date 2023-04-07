import React from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import avatar from "../assets/avatar.png";

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    // Set the name property to be included in the navigation bar
    let name = this.props.route.params.name;
// Set the welcome message and date of entering the chat or login
    this.setState({
      messages: [
        {
          _id: 1,
          text: `Hi ${name}, welcome back!`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: avatar,
          },
        },
        {
          _id: 2,
          text: `${name} is on Chat`,
          system: true,
        },
      ],
    });

    this.props.navigation.setOptions({ title: name });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
// Sets the color and on screen placement of the chat bubble, user on right
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: '#000'},
          left: { backgroundColor: '#FFF'},
        }}
      />
    );
  }

  render() {
    // Set the color property as background color for the chat screen
    let color = this.props.route.params.color;
    return (
      <View style={[styles.container, { backgroundColor: color }]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }

})