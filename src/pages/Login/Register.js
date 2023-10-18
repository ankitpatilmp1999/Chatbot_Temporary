import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/router'

const Register = ({ inputLabelStyles, passwordVisible, handlePasswordVisibilityToggle, handleCreate }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('2');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter()

  const validateName = () => {
    if (name.trim() === '') {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validateMobileNumber = () => {
    if (!/^\d{10}$/.test(mobileNumber)) {
      setMobileNumberError('Mobile number must be 10 digits');
    } else {
      setMobileNumberError('');
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

    validateName();
    validateEmail();
    validateMobileNumber();
    validatePassword();

    if (!nameError && !emailError && !mobileNumberError && !passwordError) {
      const credentials = { name, role, mobileNumber, email, password };

      fetch('http://192.168.29.140:3005/api/vendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
        .then((response) => {
          if (response.ok) {

            router.push("components/Chat_Bot")
            return response.json();

          } else {
            throw new Error('Error creating account');
          }
        })
        .then((data) => {
          localStorage.setItem("id", data.id)
          console.log('Account created:', data.id);
          localStorage.setItem('data', JSON.stringify(data));

        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className='flex justify-center items-center mt-[40px] h-[485px]'>
      <div className='bg-white text-2xl h-[450px] w-[440px] rounded-[10px]'>
        <div className='flex justify-center'>
          <p className='text-2xl text-[#676565] font-mono mt-6'>Create New Account</p>
        </div>
        <div className='flex justify-center mt-4'>
          <TextField
            InputLabelProps={{
              style: inputLabelStyles,
            }}
            className='w-[250px]'
            id='standard-basic'
            label='Name'
            variant='standard'
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={validateName}
            error={!!nameError}
            helperText={nameError}
          />
        </div>
        <div className='flex justify-center mt-1'>
          <TextField
            InputLabelProps={{
              style: inputLabelStyles,
            }}
            className='w-[250px]'
            id='standard-basic'
            label='Email'
            variant='standard'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            error={!!emailError}
            helperText={emailError}
          />
        </div>
        <div className='flex justify-center mt-1'>
          <TextField
            InputLabelProps={{
              style: inputLabelStyles,
            }}
            className='w-[250px]'
            type='number'
            id='standard-basic'
            label='Phone Number'
            variant='standard'
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            onBlur={validateMobileNumber}
            error={!!mobileNumberError}
            helperText={mobileNumberError}
          />
        </div>
        <div className='flex justify-center mt-1'>
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
        <div className='flex justify-center mt-3'>
          <Button
            variant='contained'
            className='w-[250px] bg-[#1c6185]'
            onClick={handleSubmit}
            disabled={
              !name || !email || !mobileNumber || !password || !!nameError || !!emailError || !!mobileNumberError || !!passwordError
            }
          >
            Create Account
          </Button>
        </div>
        <div className='flex justify-center mt-2 text-[12px]'>
          <Button onClick={() => handleCreate('login')} variant='text' className='text-[12px]'>
            Already Have An Account? Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
