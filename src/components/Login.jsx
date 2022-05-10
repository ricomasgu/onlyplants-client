import React, { useState } from 'react';
import { 
  FormControl, 
  Input,
  Button,
  Container,
  Center,
  Box,
  Text,
  VStack
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import authService from '../api/authServices';

const Login = ( props ) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const onSubmit = async ( event ) => {
    event.preventDefault();

    try {
      const resFromApi = await authService.login({
        username,
        password
      });
      
      props.setUserState( resFromApi.data );
      props.setLoggedIn( true );

      navigate('/feed');
    } 
    catch ( error ) {
      console.log( error );
    }

  }

  return (
    <Container w='100vw' h='100vh'>
      <Center w='100%' h='100%'>
        <Box p={5} shadow='md' borderWidth='1px'>
          <form onSubmit={ onSubmit } >
            <VStack>
              <FormControl isRequired>
                <Input 
                  id='username'
                  placeholder='Username'
                  onChange={ (e) => setUsername(e.target.value) }
                  value={ username }
                />
              </FormControl>

              <FormControl isRequired>
                <Input 
                  id='password'
                  type='password'
                  placeholder='Password'
                  onChange={ (e) => setPassword(e.target.value) }
                  value={ password } />
              </FormControl>

              <Button type='submit' colorScheme='green' >
                Login
              </Button>

              <NavLink to='/signup' >
                <Text color='green.500'>Need to create an account?</Text>
              </NavLink>
            </VStack>
          </form>
        </Box>
      </Center>
    </Container>
  )
}

export default Login