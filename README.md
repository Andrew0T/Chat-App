Chat App Overview

Chat App is a native application for both Android and iOS mobile devices, and provides users with a chat interface and options to share images and their location.
The application was developed using Expo and written in React Native.
The Gifted Chat Library is used to create chat interface with customized message bubbles. 
Users can choose a theme color on the start screen before joining the chat, images as well as
their current location in a map view can be sent. 
Google firebase is used to authenticate users anonymously and data is stored using both the cloud and local storage.

Key features

  At the start screen, users can enter their name and choose a background color for the chat screen before joining the chat.
  Users can send images and their location, after permissions to use the device's hardware have been allowed.
   Data is stored both online and offline.

Technologies

  React Native
  Expo
  Gifted Chat
  Google firebase

Dependencies: 
    "@react-navigation/native": "^6.1.6",
    "@react-navigation/native-stack": "^6.9.12",
    "expo": "~48.0.9",
    "expo-status-bar": "~1.4.4",
    "firebase": "^9.13.0",
    "react": "18.2.0",
    "react-native": "0.71.6",
    "react-native-gifted-chat": "^2.0.1",
    "react-native-safe-area-context": "4.5.0",
    "react-native-screens": "~3.20.0",
    "@react-native-async-storage/async-storage": "1.17.11",
    "@react-native-community/netinfo": "9.3.7",
    "expo-location": "~15.1.1",
    "react-native-maps": "1.3.2",
    "expo-media-library": "~15.2.3",
    "expo-image-picker": "~14.1.1",


Setting up the development environment

  Clone the repository: git clone https://github.com/Andrew0T/Chat-App
  Install Expo CLI as a global npm package: npm install -g expo-cli
  Create an Expo account at https://expo.dev/, using the terminal, login to expo
  Follow expo CLI's instructions depending on your preferred simulator/emulator (XCode, Android Studio, Expo Go)
  To Start Chat-App: type npx expo start or expo start
  Should the simulator/emulater not load, stop it, then use the Cold or Re- Boot option.

Chat-App-Screenshot.png