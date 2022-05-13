import React, { useEffect, useParams, useState } from 'react';

import postService from '../api/postServices';
import Loading from '../components/Loading';
import UserProfile from '../components/UserProfile';

const UserDetails = () => {
  const userId = useParams();

  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(true); 

  const getUserInfo = async () => {
    try {
      const user = await postService.getUser(userId);
      setUserInfo(user);
    } catch (error) {
      console.log(error);
    } 
    setLoading(false);
  };
  
  useEffect( () => {
    getUserInfo();
  }, []);

  return (
    <>
      { loading ? 
        <Loading/>
        :
        <UserProfile userInfo={userInfo} itIsMe={false} />
      }
    </>
  );
}

export default UserDetails