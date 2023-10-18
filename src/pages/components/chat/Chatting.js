import React, { useState, useEffect } from 'react';
import { CloseOutlined, PieChartFilled, SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Chatting = () => {
  const [openchat, setOpenChat] = useState(false);
  const [parentData, setParentData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [showText, setShowText] = useState(false);

  const handleShowChat = () => {
    setOpenChat(!openchat)
    setShowImage(true);
    setTimeout(() => {
      setShowImage(false);
      // Show the text after 2 seconds
      setTimeout(() => {
        setShowText(true);
      },);
    }, 2000);
  }

  useEffect(() => {
    (async () => {
      await FetchParentData();
    })();
  }, []);

  const FetchParentData = async () => {
    const response = await fetch("http://192.168.29.140:3005/api/chatBot");
    const responseJson = await response.json();
    setParentData(responseJson);
  };

  const FetchChildData = async (itemId) => {
    const response = await fetch("http://192.168.29.140:3005/api/chatBot/parent/" + itemId);
    const responseJson = await response.json();
    setChildData((prevChildData) => [...prevChildData, responseJson]);
  };

  return (
    <>
      <div>
        <button onClick={() => handleShowChat()} className='fixed left-[1325px] top-[675px] bg-[#c9c2c2] w-[90px] h-[90px] flex items-center justify-center rounded-[46px]'>
          <img className='h-[65px] w-[75px] m-2 ' src='\images\chatbotlogo.png' />
        </button>

        {openchat && (
          <div className='bg-white h-[565px] w-[385px] rounded-[20px] shadow-[0px_0px_10px_0px_#959595] absolute top-[205px] left-[1032px]'>
            <div className='flex justify-between'>
              <div className='h-[80px] flex items-center'>
                <img className='h-[55px] w-[55px] m-5 ' src='\images\chatbotlogo.png' />
                <div>
                  <p className='text-lg font-mono'>ChatBot</p>
                  <p className='text-[12px] text-[#959595] font-bold'><PieChartFilled className='text-green-500' />Online</p>
                </div>
              </div>
              <div className='m-4'>
                <button onClick={() => setOpenChat(false)} ><CloseOutlined /></button>
              </div>
            </div>

            <div className="h-[430px] bg-[#eaeef3] overflow-auto">
              {showImage && (
                <div>
                  <img className='h-[40px] w-[50px] ' src="https://media.tenor.com/y29vJ0OqaQ4AAAAj/typing-texting.gif" />
                </div>
              )}
              {showText && <div><p className='font-mono text-[15px] ml-5 mt-[15px]'>Hello I am ChatBot How May i Assist you?</p></div>}
              <div className="custom-chat-content">

                <div className='flex items-center justify-center gap-[10px]'>

                  {parentData?.items?.map((item) => (
                    <Button key={item.id} onClick={() => FetchChildData(item.id)}>
                      {item.text}
                    </Button>
                  ))}

                </div>

                {childData.map((childSet, index) => (

                  <div key={index} className='flex items-center justify-center gap-[10px] mt-5'>
                    {childSet?.map((item) => (
                      <Button onClick={() => FetchChildData(item.id)} key={item.id}>{item.text}</Button>
                    ))}
                  </div>

                ))}
              </div>
            </div>
            
            <div className='h-[55px] bg-[#f9f9f9] rounded-[0px_0px_20px_20px]'>
              <form className='flex'>
                <input type='text' placeholder='Type Your Message Here' className='w-[90%] h-[35px] p-4 border-solid border-[black] outline-none' />
                <button type='submit' className='bg-white flex items-center justify-center w-[10%]'>
                  <SendOutlined className='text-[blue] text-[20px]' />
                </button>
              </form>
              <div className='flex items-center justify-center'>
                <p className='text-[10px] text-[#959595] font-bold'>Powered by <a href='#' className='text-[#1b62fb]'>ChatBot</a></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Chatting;
