import React, { useState } from 'react';
import { 
  FormControl, 
  Input,
  Button
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import service from '../services/service';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const onSubmit = async ( event ) => {
    event.preventDefault();

    const resFromApi = await service.login({
      username,
      password
    })

    console.log(resFromApi);

    //redirection with hook navigate
    navigate('/');
  }

  return (
    <form onSubmit={ onSubmit } >
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

      <Button variant='outline' type='submit' >
        Login
      </Button>

      <NavLink to='/signup' >
        Need to create an account?
      </NavLink>
    </form>
  )
}

export default Login