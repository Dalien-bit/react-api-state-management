import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { addUsers, selectUsers } from './usersSlice';

const Users = () => {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  // There are two api calls and for respective calls we have different loading indicators

  // Below shows the loading information on the initial page load when we fetch users
  const [loading, setLoading] = useState(false);
  // This shows the loading status when fetching a particular user
  const [userLoading, setUserLoading] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Loads all the users on the initial page load and stores it in the redux store 
    fetchUsers().then((value) => {
      dispatch(addUsers(value));
    });
    setLoading(false);
  }, [dispatch]);


  // This is to handle the button click event on the buttos of different users. 
  const handleClick = (event) => {
    if (event.target.tagName === 'BUTTON') {
      const id = event.target.dataset.id;
      dispatch(fetchUser(id));
    }
  }


  // Self explanatory. (It does what you think it does.)
  const fetchUser = async (id) => {
    setUserLoading(true);
    const response = await axios.get(`https://reqres.in/api/users/${id}`);
    setUser({
      name: (response.data.data.first_name + " " + response.data.data.last_name),
      email: response.data.data.email,
      avatar: response.data.data.avatar,
    });
    setUserLoading(false);
  }




  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div>
        {userLoading ? <p>Loading user details...</p> :

          user ? (
            <div className='border-2 border-black p-5 text-left'>
              <div className='flex flex-row items-center gap-5'>
                <img src={user.avatar} alt="profile" className='w-12 rounded-full' />
                <p className='text-2xl font-semibold'>{user.name} </p>
              </div>
              <p className='font-normal text-xl pl-16'> {user.email}</p>
            </div>
          ) : <p> Select any button</p>}
      </div>
      <div>
        <div onClick={handleClick}>
          {users.map((value, index) => {
            return (
              <button key={value.id} data-id={value.id} className='border-2 m-5 border-black p-8'>
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </>
  )
}
// Self explanatory. (It does what you think it does.) Dont confuse with fetchUser
const fetchUsers = async () => {
  try {
    const response = await axios.get('https://reqres.in/api/users?page=1');
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}


export default Users