import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';

import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView from "react-native-maps";
import CustomActions from "./CustomActions";

import avatar from '../assets/avatar.png';

const Chat = ({ db, isConnected, navigation, route, storage }) => {
  const { name, color, userID } = route.params;
  const [messages, setMessages] = useState([]);

  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name, color: color });

    if (isConnected === true){
      if (unsubMessages) unsubMessages();
      unsubMessages=null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        })
        cacheMessages(newMessages);
        setMessages(newMessages);
      })
    }else loadCachedMessages();
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);

  const loadCachedMessages = async() =>{
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
  }

  const cacheMessages = async(messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    }catch(error){
      console.log(error.message);
    }
  }

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

  const renderInputToolbar = (props) => {
    if (isConnected)
    return <InputToolbar {...props} />;
    else return null;
  }

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  const renderCustomActions = (props) => {
    return <CustomActions
        userID={userID}
        storage={storage}
        {...props}
    />;
  };

  //renders Mapview location with message
  const renderCustomView = (props) => {
    const {currentMessage} = props;
    if (currentMessage.location){
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

  return (
    <View style={[styles.container, {backgroundColor: color }]} >
      <Text>
      Welcome Back
      </Text>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={messages => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name: name,
          avatar: avatar
        }}
      />
      { Platform.OS === 'android' ?
      <KeyboardAvoidingView behavior="height" /> : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Chat;
