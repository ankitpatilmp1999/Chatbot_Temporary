import React, { useState } from 'react';
import { Button, Drawer, Input } from 'antd';
import { WechatFilled, CheckOutlined, CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const Draw = ({ openDrawer, setopenDrawer, handleAddTitle, title, setTitle, botId }) => {
    
    const [fields, setFields] = useState([""]);

    const onCloseDrawer = () => {
        setopenDrawer(false);
    };

    const handleFieldChange = (index, value) => {
        const updatedFields = [...fields];
        if (index === updatedFields.length - 1 && value !== "") {
            updatedFields.push("");
        }
        updatedFields[index] = value;
        setFields(updatedFields);
    };
    
    return (
        <>
            <Drawer
                closable={false}
                openDrawer={openDrawer}
                width={530}
                height={520}
                visible={openDrawer}
            >
                <div>
                    <div className="flex items-end justify-between">
                        <div className="flex items-end ">
                            <WechatFilled className="text-[black] mt-[15px] text-[20px] ml-[5px]" />
                            <p className="text-[black] ml-[10px] text-[#919ead] font-semibold uppercase]">USER INPUT</p>
                        </div>
                        <div className="flex items-end gap-2.5">
                            <Button onClick={onCloseDrawer} className="flex items-center justify-center bg-[white] text-[#47607c] h-[25px] w-[25px]"><CloseOutlined /></Button>
                            <Button onClick={()=>handleAddTitle(botId)} className="flex items-center justify-center bg-[white] text-[#47607c] h-[25px] w-[25px]"><CheckOutlined /></Button>
                        </div>
                    </div>
                    <Input
                        type="text"
                        className="h-[50px] w-[420px] ml-1.5 mt-4"
                        placeholder="Enter title "
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        hidden
                        value={botId}
                    />
                </div>
                <div className="mt-[30px]">
                    <div className="flex items-end gap-[10px]">
                        <QuestionCircleOutlined className="text-[black] mt-[15px] text-[20px] ml-[5px]" />
                        <p className="text-[black] text-[#919ead] text-[16px] font-semibold uppercase]">User says</p>
                    </div>
                    <div>
                        {fields.map((field, index) => (
                            <div key={index}>
                                <Input
                                    type="text"
                                    value={field}
                                    onChange={(e) => handleFieldChange(index, e.target.value)}
                                    className="h-[50px] w-[420px] ml-1.5 mt-4"
                                    placeholder="Enter user message"

                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Drawer>
        </>
    );
};
export default Draw;