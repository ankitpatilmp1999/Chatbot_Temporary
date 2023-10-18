import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "./header/Header";
import Chatting from "./chat/Chatting";
const Chart = dynamic(() => import("./Chart"), { ssr: false, });

const Chat_Bot = () => {
    //zoom in or out and dragging
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [id, setId] = useState('');
    useEffect(() => {
        const storedUserId = localStorage.getItem('id');
        if (storedUserId) {
            setId(storedUserId);
        }
    }, []);
    useEffect(() => {
        const handleScroll = (event) => {
            if (event.deltaY > 0) {
                // Scroll down to zoom out
                setZoomLevel((prevZoom) => Math.max(0.5, prevZoom - 0.1));
            } else {
                // Scroll up to zoom in
                setZoomLevel((prevZoom) => Math.min(2, prevZoom + 0.1));
            }
        };

        const handleMouseMove = (event) => {
            if (isDragging) {
                setDragPosition({
                    x: event.clientX - dragStart.x,
                    y: event.clientY - dragStart.y,
                });
            }
        };

        const handleMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
            }
        };

        window.addEventListener("wheel", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("wheel", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, dragStart]);

    const handleMouseDown = (event) => {
        setIsDragging(true);
        setDragStart({
            x: event.clientX - dragPosition.x,
            y: event.clientY - dragPosition.y,
        });
    };
    //zoom in or out and dragging
    return (
        <>
            <Header />
            <div
                style={{
                    transform: `scale(${zoomLevel}) translate(${dragPosition.x}px, ${dragPosition.y}px)`,
                    cursor: isDragging ? "grabbing" : "grab",
                }}
                onMouseDown={handleMouseDown}
            >

                <Chart id={id} />
            </div >
            <Chatting />
        </>
    )
}

export default Chat_Bot;