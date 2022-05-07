import { 
  Container, 
  Heading,
  Badge,
  Box,
  Avatar,
  Center,
  Button,
  Text, 
} from '@chakra-ui/react';
import React from 'react';

const UserProfile = ( props ) => {
  const {
    avatar,
    username,
    posts,
    followers,
    following
  } = props;
  return (
    <Container>
      <Center>
        <Box>
          <Box>
            <Avatar src={ avatar } />
            <Heading> { username } </Heading>
            <Button>Follow</Button>
          </Box>
          <Box>
            <Box>
              <Badge>
                { posts.length }
              </Badge>
              <Text>
                Posts
              </Text>
            </Box>
            <Box>
              <Badge>
                { followers.length }
              </Badge>
              <Text>
                Followers
              </Text>
            </Box>
            <Box>
              <Badge>
                { following.length }
              </Badge>
              <Text>
                Following
              </Text>
            </Box>
          </Box>
        </Box>
      </Center>
    </Container>
  )
}

export default UserProfile