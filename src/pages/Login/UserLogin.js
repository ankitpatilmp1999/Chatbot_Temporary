import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Register from './Register';
import { useRouter } from 'next/router'

const UserLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showCreate, setShowCreate] = useState('login');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter()


  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCreate = (option) => {
    setShowCreate(option);
  };

  const inputLabelStyles = {
    fontFamily: 'monospace',
  };

  const validateUsername = () => {
    const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!usernameRegex.test(username)) {
      setUsernameError('Invalid email address');
    } else {
      setUsernameError('');
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateUsername();
    validatePassword();

    if (!usernameError && !passwordError) {
      const credentials = { username, password };

      fetch('http://192.168.29.140:3005/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
        .then((response) => {
          if (response.ok) {
            router.push("components/chat/UserChatting")
            return response.json();
          } else {
            throw new Error('Error logging in');
          }
        })
        .then((data) => {
          localStorage.setItem("id", data.id)
          localStorage.setItem('data', JSON.stringify(data));
          console.log('Login response:', data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <div>
        <div className='flex justify-center items-center'>
          <p className='text-2xl text-[#676565] font-mono'>Welcome To ChatBot</p>
        </div>
        {showCreate === 'login' && (
          <div className='flex justify-center items-center mt-[40px] h-[485px]'>
            <div className='bg-white text-2xl h-[380px] w-[440px] rounded-[10px]'>
              <div className='flex justify-center'>
                <p className='text-2xl text-[#676565] font-mono mt-6'>User Login</p>
              </div>
              <div className='flex justify-center mt-6'>
                <TextField
                  className='w-[250px]'
                  id='standard-basic'
                  label='Email'
                  variant='standard'
                  InputLabelProps={{
                    style: inputLabelStyles,
                  }}
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  onBlur={validateUsername}
                  error={!!usernameError}
                  helperText={usernameError}
                />
              </div>
              <div className='flex justify-center mt-3'>
                <TextField
                  className='w-[250px]'
                  id='standard-basic'
                  label='Password'
                  variant='standard'
                  type={passwordVisible ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={handlePasswordVisibilityToggle} edge='end'>
                          {passwordVisible ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    style: inputLabelStyles,
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validatePassword}
                  error={!!passwordError}
                  helperText={passwordError}
                />
              </div>
              <div className='flex justify-center mt-5'>
                <Button
                  variant='contained'
                  className='w-[250px] bg-[#1c6185]'
                  onClick={handleSubmit}
                  disabled={!username || !password || !!usernameError || !!passwordError}
                >
                  Login
                </Button>
              </div>
              <div className='flex justify-center ml-[90px]'>
                <Button variant='text'>Forgot Password?</Button>
              </div>
              <div className='flex justify-center mt-5 text-[12px]'>
                <Button onClick={() => handleCreate('create')} variant='text' className='text-[12px]'>
                  Create New Account
                </Button>
              </div>
            </div>
          </div>
        )}

        {showCreate === 'create' && (
          <Register
            inputLabelStyles={inputLabelStyles}
            passwordVisible={passwordVisible}
            handlePasswordVisibilityToggle={handlePasswordVisibilityToggle}
            handleCreate={handleCreate}
          />
        )}
      </div>
    </>
  );
};

export default UserLogin;