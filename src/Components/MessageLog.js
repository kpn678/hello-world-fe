import './MessageLog.css';
import { useState, useEffect } from 'react';

const MessageLog = ({ socket }) => {
  const [messagesReceived, setMessagesReceived] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          createdTime: data.createdTime
        }
      ]);
    });
    return () => socket.off('receive_message');
  }, [socket]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  }
}

export default MessageLog;

