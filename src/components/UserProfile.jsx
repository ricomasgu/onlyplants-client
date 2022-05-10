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
  Image,
  Grid,
  GridItem
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import postService from '../api/postServices';
import Post from './Post';

const UserProfile = ( props ) => {
  const {
    avatar,
    username,
    posts,
    followers,
    following
  } = props.userState;

  const componentsPosts = posts.map( (postId) => {
    return (
      <GridItem key={`userprofile-${postId}`} >
        <Post postId={postId} userState={props.userState}/>
      </GridItem>
    );
  });

  return (
    <Container w='100vw' >
      <VStack>
        <Center w='100%' >
          <Box w='100%' >
            <Flex w='100%' justify='space-around' align='center' mt='1rem'>
              <Flex align='flex-end'>
                <Avatar size='xl' src={ avatar } mr='1rem'/>
                <Heading> { username } </Heading>
              </Flex>
              <Button colorScheme='green' >Follow</Button>
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