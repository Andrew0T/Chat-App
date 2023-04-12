import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import avatar from '../assets/avatar.png';

const Chat = ({ db, route, navigation }) => {
  const { name, color } = route.params;
  const [messages, setMessages] = useState([]);

const addMessages = async (newMessages) => {
  const newMessagesRef = await addDoc(collection(db, "messages"), newMessages);
  if (newMessagesRef.id) {
      Alert.alert(`The list "${messagesName}" has been added.`);
  } else {
      Alert.alert("Unable to add. Please try later");
  }
}

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

// set navigation options
useEffect(() => {
  navigation.setOptions({ title: name, backgroundColor: color });
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  const unsubMessages = onSnapshot(q, (docs) => {
    let newMessages = [];
    docs.forEach(doc => {
      newMessages.push({
        id: doc.id,
        ...doc.data(),
        createdAt: new Date(doc.data().createdAt.toMillis())
      })
    })
    setMessages(newMessages);
  })
  return () => {
    if (unsubMessages) unsubMessages();
  }
 }, []);

 useEffect(() => {
 setMessages ([
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
]);
}, []);
  
  // function to handle sending new messages
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }
  
  
  return (
    <View style={[styles.container, {backgroundColor: color}]} >
      <Text>Welcome to Chat</Text>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
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