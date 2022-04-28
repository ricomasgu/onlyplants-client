import React from 'react'
import { 
  FormControl, 
  Input,
  Avatar,
  Button
} from '@chakra-ui/react'

const SignUp = () => {
  return (
    <form>
      <FormControl isRequired>
        <Input id='first-name' placeholder='First Name' />
      </FormControl>

      <FormControl isRequired>
        <Input id='last-name' placeholder='Last Name' />
      </FormControl>

      <FormControl isRequired>
        <Input id='email' type='email' placeholder='Email' />
      </FormControl>

      <FormControl isRequired>
        <Input id='username' placeholder='Username' />
      </FormControl>

      <FormControl isRequired>
        <Input id='password' type='password' placeholder='*********' />
      </FormControl>

      <Avatar src="" />

      <Button variant='outline'>Create Account</Button>

    </form>
  )
}

export default SignUp