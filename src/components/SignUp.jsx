import React, { useState } from 'react'
import axios from 'axios'
import { 
  FormControl, 
  Input,
  Avatar,
  Button
} from '@chakra-ui/react'

const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('')

  const onSubmit = async ( event ) => {
    event.preventDefault();

    const resFromApi = await axios.post('http://localhost:5005/api/auth/signup', {
      firstName,
      lastName,
      email,
      username,
      password,
      avatar
    },
    { 
      withCredentials: true
    })

    console.log(resFromApi);

    //redirection with hook navigate
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
        src={ avatar }
        name={ firstName === '' || lastName === '' ? null :  `${firstName} ${lastName}` }
      />

      <Input
        id='avatar'
        type='file'
        onChange={ (e) => setAvatar(URL.createObjectURL(e.target.files[0])) }
      />
      <Button variant='outline' type='submit' >Create Account</Button>
    </form>
  )
}

export default SignUp