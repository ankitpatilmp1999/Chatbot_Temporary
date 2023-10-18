import React, { useState, useEffect } from "react";
import { Button, Popover } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'

const Header = () => {
    const [visible, setVisible] = useState(false);
    const router = useRouter()

    const [data, setData] = useState('');

    useEffect(() => {
        const storedUserId = localStorage.getItem('data');
        if (storedUserId) {
            setData(JSON.parse(storedUserId));
        }
    }, []);

    const togglePopover = () => {
        setVisible(!visible);
    };
    const LogOut = () => {
        localStorage.removeItem("id")
        localStorage.removeItem("token")
        localStorage.removeItem("data")
        router.push("/")
    }

    const content = (
        <div className="flex w-[300px] items-center gap-[8px] justify-between">
            <div>
                <img className='h-[50px] w-[50px] rounded-full' src='\images\userimage.png' />
            </div>
            <div>
                <p className='text-[16px] text-[#555555] font-mono font-semibold'>{data.name}</p>
                <p className='text-[12px] text-[#555555] font-mono '>{data.email}</p>
            </div>
            <div>
                <Button onClick={LogOut}>Log Out</Button>
            </div>
        </div>
    );
    return (
        <>
            <div className='flex items-center justify-between'>
                <div className='flex items-center '>
                    <img className='h-[65px] w-[75px] m-2' src='\images\chatbotlogo.png' />
                    <p className='text-[25px] text-[#555555] font-mono'>ChatBot</p>
                </div>
                <div className='flex items-center mr-[20px] gap-2.5'>
                    <img className='h-[35px] w-[35px] rounded-full' src='\images\userimage.png' />
                    <p className='text-[18px]  text-[#555555] font-mono font-semibold'>{data.name}</p>
                    <Popover
                        placement="bottomLeft"
                        title=""
                        content={content}
                        trigger="click"
                        visible={visible}
                        onVisibleChange={togglePopover}
                    >
                        <Button onClick={togglePopover} className='rounded-full w-[4px] flex items-center justify-center'><DownOutlined /></Button>
                    </Popover>
                </div>
            </div>
        </>
    )
}

export default Header