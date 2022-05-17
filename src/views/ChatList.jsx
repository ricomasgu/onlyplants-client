import React, { useEffect, useState } from 'react';
import {
  Container,
} from '@chakra-ui/react';

import UserCard from '../components/UserCard';

import chatService from '../services/chatServices';
import Loading from '../components/Loading';

const ChatList = (props) => {
  const { userState } = props;
  const userId = userState._id;

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  //Need to retrieve the details of every user.
  const listOfChats = chats.map( (chat) => {
    const userParticipant = chat.participants.find( (user) => user._id !== userId )[0];
    return (
			<Container mt="25px" mb="25px" key={chat._id}>
				<UserCard foundUser={userParticipant} userState={props.userState} />
			</Container>
	  )
  } 
  );

  const getChats = async () => {
    try {
      const chatsPopulated = await chatService.getUserChats(userId);
      console.log(chatsPopulated);
      //setChats(chatsPopulated.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect( () => {
    getChats();
  },[]);

  return (
    <>
      { loading ? <Loading /> : listOfChats }
    </>
  )
}

export default ChatList;