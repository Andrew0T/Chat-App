import React, { Component } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Background colors defined
const backgroundColors = {
  black: '#090807',
  purple: '#7722FF',
  grey: '#808080',
  green: '#009922',
};

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', color: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/backgroundimage.png')}
          style={styles.image}
        >
        <Text style={styles.title}>Chat App</Text>
          <View style={styles.startbackGround}>
            <TextInput
              style={styles.input}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder="Your Name"
            />
            <View style={styles.changeColor}>
              <Text style={styles.colorText}>Choose Background Color:</Text>
              <View style={styles.colors}>
                <TouchableOpacity
                  style={[styles.color,{ backgroundColor: backgroundColors.black }]}
                  onPress={() => this.setState({ color: backgroundColors.black })}
                />
                <TouchableOpacity
                  style={[styles.color,{ backgroundColor: backgroundColors.purple }]}
                  onPress={() => this.setState({ color: backgroundColors.purple })}
                />
                <TouchableOpacity
                  style={[styles.color,{ backgroundColor: backgroundColors.grey }]}
                  onPress={() => this.setState({ color: backgroundColors.grey })}
                />
                <TouchableOpacity
                  style={[styles.color, { backgroundColor: backgroundColors.green }]}
                  onPress={() => this.setState({ color: backgroundColors.green })}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate(
              'Chat', {name: this.state.name, color: this.state.color})}
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  resizeMode: 'cover',
  paddingVertical: '6%',
},

  title: {
  fontSize: 45,
  fontWeight: '600',
  color: '#FFFFFF',
  paddingVertical: '15%',
},

  startbackGround: {
    backgroundColor: 'white',
    height: '44%',
    width: '88%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '6%',
  },

  input: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 50,
    height: 60,
    width: '88%',
    borderColor: 'lightgrey',
    borderWidth: 2,
    borderRadius: 5,
    padding: '5%',
  },

  changeColor: {
    width: '88%',
    justifyContent: 'center',
  },

  colorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100,
  },

  colors: {
    flexDirection: 'row',
  },

  color: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginTop: 10,
    marginLeft: 25,
  },

  button: {
    height: 40,
    width: '88%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#757083',
    marginTop: 10,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});