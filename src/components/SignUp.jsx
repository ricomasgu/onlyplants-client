import React, { useState } from 'react';
import { 
  FormControl, 
  Input,
  Avatar,
  Button
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';

import service from '../services/service';

const SignUp = ( props ) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');

  const navigate = useNavigate();

  const onSubmit = async ( event ) => {
    event.preventDefault();

    try {
      const resFromApi = await service.signup({
        firstName,
        lastName,
        email,
        username,
        password,
        avatar
      });

      console.log( resFromApi );

      props.setUserState( resFromApi.data );

      navigate('/feed');
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={ onSubmit } >
      <FormControl isRequired>
        <Input 
          id='first-name'
          placeholder='First Name'
          onChange={ (e) => setFirstName(e.target.value) }
          value={ firstName }
        />
      </FormControl>

      <FormControl isRequired>
        <Input
          id='last-name'
          placeholder='Last Name'
          onChange={ (e) => setLastName(e.target.value) }
          value={ lastName }
        />
      </FormControl>

      <FormControl isRequired>
        <Input 
          id='email' 
          type='email' 
          placeholder='Email' 
          onChange={ (e) => setEmail(e.target.value) } 
          value={ email }
        />
      </FormControl>

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

      <Avatar 
        src={ avatar !== '' ? URL.createObjectURL( avatar ) : avatar }
        name={ firstName === '' || lastName === '' ? null :  `${firstName} ${lastName}` }
      />

      <Input
        id='avatar'
        type='file'
        onChange={ (e) => setAvatar(e.target.files[0]) }
      />

      <Button variant='outline' type='submit' >
        Create Account
      </Button>

      <NavLink to='/login' >
        Already have an account?
      </NavLink>
    </form>
  );
}

export default SignUp