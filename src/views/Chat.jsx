import React, { useEffect } from 'react';
import {
  Container,
	Grid,
  GridItem,
	Textarea,
	Heading,
	Box,
	Avatar,
	Center,
  Flex,
} from '@chakra-ui/react';
import chatService from '../services/chatServices';
import { useParams } from 'react-router-dom';

const Chat = (props) => {
  const { username } = props.userState;
  const { chatId } = useParams();

  const getChat = async () => {
    try {
      const chatInfo = chatService.getChatInfo(chatId);
      console.log(chatInfo);
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect( () => {
    getChat();
  }, []);

  const sendMessage = () => {

  };

  return (
    <Container w='100vw' h='85vh'>
      <Center w='100%' h='100%'>
        <Box w='100%' h='100%'>
          <Grid w='100%' h='100%' templateRows='repeat(9, 1fr)' >
            <GridItem rowSpan={1}>
              <Flex h='100%' borderRadius='0.5rem'>
                <Avatar />
                <Heading>{username}</Heading>
              </Flex>
            </GridItem>
            <GridItem rowSpan={6} >
              <Box h='100%' borderRadius='0.5rem' borderWidth='1px'>

              </Box>
            </GridItem>
            <GridItem rowSpan={2}>
              <form onSubmit={sendMessage}>
                <Textarea placeholder='Send a message' />
              </form>
            </GridItem>
          </Grid>
        </Box>
      </Center>
    </Container>
  )
}

export default Chat;