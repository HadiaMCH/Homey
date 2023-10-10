import React, { useRef } from 'react';
import styled from 'styled-components';
import { IoIosSend } from 'react-icons/io'
import useChatActions from './hooks/useChatActions';
import { useChat } from './chatprovider';

const MessageForm = styled.form`
    padding: 0.5vw 0;
    display: flex;
    align-items: center;
    height: 15%;
    margin-bottom: 0px;

    border-top: 1px solid rgba(0, 0, 0, 0.08);

    & input {
        flex: 1;
        height: 100%;
        width: 100%;
        border: none;

    &:focus {
        border: none;
    }}
`;

const ChatForm = () => {
    const inputRef = useRef(null);
    const { sendMessage } = useChatActions();
    const { currentRoom, userName } = useChat();

    const onSubmit = (e) => {
        e.preventDefault();

        sendMessage(
            inputRef.current.value, 
            currentRoom.id, 
            userName
        );
        
        inputRef.current.value = '';
        inputRef.current.focus();
    }

    return (
        <MessageForm onSubmit={ onSubmit }>
            <input type="text" placeholder='Type a message here' ref={ inputRef }/>
            <button>
                <IoIosSend fill='#fff'/>
            </button>
        </MessageForm>
    );
};

export default ChatForm;