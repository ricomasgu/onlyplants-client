import { 
  Container, 
  Heading,
  Badge,
  Box,
  Avatar,
  Center,
  Button,
  Text,
  VStack,
  Flex,
  StackDivider,
  Grid,
  GridItem,
  Link
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import chatService from '../services/chatServices';

import PostCard from './PostCard';

const UserProfile = ( props ) => {
  const {
    _id: userSelectedId,
    avatar,
    username,
    posts,
    followers,
    following
  } = props.userInfo;

  const {
    _id: userId,
  } = props.userState;

  const navigate = useNavigate();

  const itIsMe = props.itIsMe;

  const handleClick = async () => {
    //create a chat involving the two users
    const chat = await chatService.createChat({ userId, userSelectedId });
    
    //Adding the id of the chat to the state
    console.log('chat',chat,'props.userState',props.userState);
    props.setUserState({ ...props.userState, chats: [ ...props.userState.chats, chat.data._id]});

    //navigating to the chat
    navigate(`/chats/${chat.data._id}`);
  }

  console.log(posts);
  const componentsPosts = posts.map( (post) => {
    return (
      <GridItem key={`userprofile-${post._id}`} >
        <PostCard postId={post._id} post={post}/>
      </GridItem>
    );
  });

  return (
    <Container w='100vw'>
      <VStack>
        <Center w='100%'>
          <Box w='100%'>
            <Flex w='100%' justify='space-around' align='center' mt='1rem'>
              <Flex align='flex-end'>
                <Avatar size='xl' src={ avatar } mr='1rem'/>
                <Heading> { username } </Heading>
              </Flex>
              { !itIsMe ? 
                <Flex direction='column'>
                  <Button colorScheme='green' >Follow</Button>
                  <Button colorScheme='red' onClick={handleClick} >Message</Button>
                </Flex>
                : 
                <Link to='/profile/settings'>
                  <Button colorScheme='blue'>Settings</Button>
                </Link>
              }
            </Flex>
            <Flex w='100%' justify='center' mt='1rem'>
              <VStack m='1rem'>
                <Badge ml='1' fontSize='1em' >
                  { posts.length }
                </Badge>
                <Text fontSize='xs'>
                  Posts
                </Text>
              </VStack>
              <VStack m='1rem'>
                <Badge ml='1' fontSize='1em' >
                  { followers.length }
                </Badge>
                <Text fontSize='xs'>
                  Followers
                </Text>
              </VStack>
              <VStack m='1rem'>
                <Badge ml='1' fontSize='1em'>
                  { following.length }
                </Badge>
                <Text fontSize='xs'>
                  Following
                </Text>
              </VStack>
            </Flex>
          </Box>
        </Center>
        <StackDivider color='green' />
        <Grid templateColumns='repeat(3, 1fr)' gap={1}>
          {componentsPosts}         
        </Grid>
      </VStack>
    </Container>
  )
}
  
export default UserProfile