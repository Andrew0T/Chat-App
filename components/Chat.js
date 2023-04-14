import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import avatar from '../assets/avatar.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ db, isConnected, navigation, route }) => {
  const { name, color, userID } = route.params;
  const [messages, setMessages] = useState([]);


// Sets the color and on screen placement of the chat bubble, user on right
const renderBubble = (props) => {
  return <Bubble
    {...props}
    wrapperStyle={{
      right: {backgroundColor: "#000"},
      left: {backgroundColor: "#FFF"}
    }}
  />
}

//Prevents Users from composing new messages
const renderInputToolbar = (props) => {
  if (isConnected)
  return <InputToolbar {...props} />;
  else return null;
 }


// set navigation options
let unsubMessages;
  useEffect(() => {
    if(isConnected === true){
      if (unsubMessages) unsubMessages();
      unsubMessages=null;
      navigation.setOptions({ title: name, backgroundColor: color });
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
    //Clean up code from memory
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);


// Load cached messages when offline
 const loadCachedMessages = async() =>{
  const cachedMessages = await AsyncStorage.getItem("messages") || [];
  setMessages(JSON.parse(cachedMessages));
 }

 // Storer messages in cache when online
 const cacheMessages = async(messagesToCache) => {
  try {
    await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
  }catch(error){
    console.log(error.message);
  }
 }
  
  // function to handle sending new messages
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }
  
  return (
    <View style={[styles.container, {backgroundColor: color}]} >
      <Text>Welcome to Chat</Text>
      <GiftedChat
        messages={messages}
        renderInputToolbar={renderInputToolbar}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
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