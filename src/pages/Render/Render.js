
import React, { useState } from 'react';
import AdminLogin from '../Login/AdminLogin';
import UserLogin from '../Login/UserLogin';
import Chatting from '../components/chat/Chatting';

const Render = () => {
    const [selectedOption, setSelectedOption] = useState('user');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <>
            <div className='flex h-[100vh]'>
                {/* LEFT SIDE IMAGE */}
                <div className='w-[50%]'>
                    <img
                        className='h-full w-full object-coverh-full w-full object-cover'
                        src='images\uskd4x557wno7irs1q71.webp'
                        alt='Image'
                    />
                </div>
                {/* RIGHT SIDE CONTENT */}
                <div className='w-[50%]'>
                    <div className='w-full  h-[150px] flex justify-center items-center'>
                        <div
                            className={`w-[35%] h-10 rounded-[41px] flex justify-center items-center border-r-2 text-lg font-bold text-[#6a6a6a] cursor-pointer
                            ${selectedOption === 'admin' ? 'bg-[#1c6185] text-[white]' : 'bg-[white]'}`}
                            onClick={() => handleOptionClick('admin')}
                        >
                            Admin
                        </div>
                        <div
                            className={`w-[35%] h-10 rounded-[41px] flex justify-center items-center text-lg font-bold text-[#6a6a6a] cursor-pointer
                            ${selectedOption === 'user' ? 'bg-[#1c6185] text-[white]' : 'bg-[white]'}`}
                            onClick={() => handleOptionClick('user')}
                        >
                            User
                        </div>
                    </div>

                    {selectedOption === 'admin' && (
                        <AdminLogin />
                    )}
                    {selectedOption === 'user' && (
                        <UserLogin />
                    )}
                </div>
                <Chatting />
            </div>
        </>
    );
};

export default Render;
