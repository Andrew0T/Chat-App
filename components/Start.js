import { useState } from 'react';
import {
         Alert, ImageBackground, StyleSheet, Text,
         TextInput, TouchableOpacity, View
       } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {

  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  const signInUser = () => {
    const auth = getAuth();
    signInAnonymously(auth)
    .then(_result => {
      const user = _result;
      navigation.navigate("Chat", {name: name, userID: user.id, color:color });
      Alert.alert("You have signed in!");
    })
    .catch((error) =>{
      Alert.alert(error + "Unable to sign in, please try again");
    })
  }

  const backGroundColors = {
    yellow: '#FFCC00',
    purple: '#A153F4',
    grey: '#808080',
    green: '#009922',
  };

  return (
    <View style={styles.container}>
        <ImageBackground
          source={require("../assets/backgroundimage.png")}
          style={styles.backGroundImage}
        >
        <Text style={styles.title}>Chat App2</Text>  
          <View style={styles.startbackGround}>
            <TextInput
              style={styles.textInput}
              onChangeText={setName}
              value={name}
              placeholder="Enter user name"
              accessibilityLabel="Enter user name"
            />
            <View style={styles.selectColor}>
              <Text style={styles.colorText}>Choose Background Color:</Text>
              <View style={styles.buttonColors}>
                <TouchableOpacity
                  style={[styles.colorButton,{ backgroundColor: backGroundColors.yellow }]}
                  onPress={() => setColor({ color: backGroundColors.yellow })}
                  accessibilityLabel='yellow background'
                />
                <TouchableOpacity
                  style={[styles.colorButton,{ backgroundColor: backGroundColors.purple }]}
                  onPress={() => setColor({ color: backGroundColors.purple })}
                  accessibilityLabel='purple background'
                />
                <TouchableOpacity
                  style={[styles.colorButton,{ backgroundColor: backGroundColors.grey }]}
                  onPress={() => setColor({ color: backGroundColors.grey })}
                  accessibilityLabel='grey background'
                />
                <TouchableOpacity
                  style={[styles.colorButton, { backgroundColor: backGroundColors.green }]}
                  onPress={() => setColor({ color: backGroundColors.green })}
                  accessibilityLabel='green background'
                />
              </View>
            </View>
            <TouchableOpacity 
              style={styles.startButton}
              onPress={() => signInUser()}
            >
              <Text style={styles.startButtonText}>
                Start Chat
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backGroundImage: {
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

  textInput: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 50,
    height: 60,
    width: '88%',
    borderColor: '#AABBCC',
    borderWidth: 2,
    borderRadius: 5,
    padding: '5%',
  },

  selectColor: {
    width: '88%',
    justifyContent: 'center',
  },

  colorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100,
  },

  buttonColors: {
    flexDirection: 'row',
  },

  colorButton: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginTop: 10,
    marginLeft: 25,
  },

  startButton: {
    height: 40,
    width: '88%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#757083',
    marginTop: 10,
  },

  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Start;
