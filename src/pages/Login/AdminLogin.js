import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/router'


const AdminLogin = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [usernameError, setusernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()

    const handlePasswordVisibilityToggle = () => {
        setPasswordVisible(!passwordVisible);
    };

    const inputLabelStyles = {
        fontFamily: 'monospace',
    };

    const validateusername = () => {
        const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!usernameRegex.test(username)) {
            setusernameError('Invalid username address');
        } else {
            setusernameError('');
        }
    };

    const validatePassword = () => {
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters');
        } else {
            setPasswordError('');
        }
    };

    const handleLogin = () => {
        validateusername();
        validatePassword();

        if (!usernameError && !passwordError) {
            console.log('Login clicked with valid credentials');
            handleSubmit();
        }
    };


    const handleSubmit = () => {

        const credentials = {
            username: username,
            password: password,
        };

        fetch("http://192.168.29.140:3005/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error logging in");
            }
        })
        .then((data) => {
            console.log("Login response:", data);
            localStorage.setItem('token', data.token);
            router.push("components/Chat_Bot");
            localStorage.setItem("id", data.id);
            localStorage.setItem('data', JSON.stringify(data));
        })
        .catch((error) => {
            console.error(error);
        });
    };


    return (
        <>
            <div>
                <div className='flex justify-center items-center'>
                    <p className='text-2xl text-[#676565] font-mono'>Welcome To ChatBot</p>
                </div>
                <div className='flex justify-center items-center mt-[40px] h-[485px]'>
                    <div className='bg-white text-2xl h-[380px] w-[440px] rounded-[10px]'>
                        <div className='flex justify-center'>
                            <p className='text-2xl text-[#676565] font-mono mt-6'>Admin Login</p>
                        </div>
                        <div className='flex justify-center mt-6'>
                            <TextField
                                className='w-[250px]'
                                id="standard-basic"
                                label="Email"
                                variant="standard"
                                value={username}
                                onChange={(e) => setusername(e.target.value)}
                                onBlur={validateusername}
                                error={!!usernameError}
                                helperText={usernameError}
                                InputLabelProps={{
                                    style: inputLabelStyles,
                                }}
                            />
                        </div>
                        <div className='flex justify-center mt-3'>
                            <TextField
                                className='w-[250px]'
                                id="standard-basic"
                                label="Password"
                                variant="standard"
                                type={passwordVisible ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={validatePassword}
                                error={!!passwordError}
                                helperText={passwordError}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handlePasswordVisibilityToggle}
                                                edge="end"
                                            >
                                                {passwordVisible ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                InputLabelProps={{
                                    style: inputLabelStyles,
                                }}
                            />
                        </div>
                        <div className='flex justify-center mt-5'>
                            <Button
                                variant="contained"
                                className='w-[250px] bg-[#1c6185]'
                                onClick={handleLogin}
                                disabled={!username || !password || !!usernameError || !!passwordError}
                            >
                                Login
                            </Button>
                        </div>
                        <div className='flex justify-center ml-[90px]'>
                            <Button variant="text">Forgot Password?</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;
