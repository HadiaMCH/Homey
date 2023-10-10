import React, { useState,useEffect,useMemo } from 'react';
import styled from 'styled-components';
import ChatForm from './chatform';
import Conversation from './conversation';
import { useChat } from './chatprovider';
import { Description } from './styled/Description.jsx';
import useChatActions from './hooks/useChatActions';
import useDebounce from './hooks/useDebounce';
import axios from 'axios';

    const ChatAppContainer = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: linear-gradient(to right, #6372ff 0%, #5ca9fb 100%);
        height: 100%; 
        box-shadow: -10px 0px 20px rgba(0, 0, 0, 0.1);
    `;

    const CenterContainer = styled.div`
        background: white;
        display: flex;
        flex-direction: column;
        margin: auto 0;
        padding: 1vw 1vw;
        height: 50%;

        @media (max-width: 820px) {
            flex: 0.35;
        }
    `;

    const Chat = styled.div`
        display: flex;
        flex: 1;
        flex-direction: column;
        background: #fff;
        border-radius: 30px;
    `;

    const Header = styled.header`
        display: flex;
        align-items: center;
        gap: 1.1em;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        padding-bottom: 1em;
        height: 3.2em;
        
        & img {
            height: 100%;
            border-radius: 0.7em;
        }

        & h2 {
            font-size: 0.85em;
            font-weight: 600;
        }
    `;

    const WelcomeMessage = styled.p`
        margin: auto 0;
        font-size: 0.9em;
        text-align: center;
        color: rgba(0, 0, 0, 0.5);
    `;
    
    const SearchRoomsContainer = styled.div`
        display: flex;
        background: #fff;
        width: 75%;
        padding-left: 1.2em;
        margin-left : 10%;
        border-radius: 1.2em;
        margin-bottom : 3% ;

        & input {
            width: 85%;
            background: transparent;
            border: none;
        }

        @media (max-width: 820px) {
            display: none;
        }
    `;

    const RoomListContainer = styled.div`
    --space: 1em;
    --horizontal-space: 2vw;
    
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-top: ;
    overflow: auto;
    border-top-left-radius: 45px;
    border-bottom-left-radius: 45px;
    background: var( --blue-gradient);
    color: #fff;
    
    & h3 {
        font-size: 1.2em;
        font-weight: 500;
        padding: 0.9em var(--horizontal-space);
    }

    @media (max-width: 820px) {
        position: absolute;
        opacity: ${ props => props.open ? '1' : '0'};
        pointer-events: ${ props => props.open ? 'null' : 'none'};
        right: 0;
        width: 100%;
        border-radius: 0;
        z-index: 1;
    }
    `;

    const RoomItem = styled.li`
        display: flex;
        gap: 1vw;
        width: 100%;
        flex: 1;
        padding: var(--space) var(--horizontal-space);
        list-style: none;
        background: ${ props => props.active ?  'transparent' : 'linear-gradient(to right, #a6c5ff 0%, #96d7ff 100%)'};
        cursor: pointer;
        transition: all .05s;
        transition: background 0.2s;

        &:hover {
            background: linear-gradient(to right, #a6c5ff 0%, #96d7ff 100%); ;
        }

        & img {
            height: 3vw;
            width: 3vw;
            border-radius: 20px;
            object-fit: cover;
        }

        & div {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        & span {
            font-weight: 500;
            font-size: 0.8em;
        }
    `;

const ChatContainer = (token) => {
    const [query, setQuery] = useState('');
    const [isNavOpen, setIsNavOpen] = useState();
    const [userRooms, setUserRooms] = useState([]);
    const debouncedSearch = useDebounce(query, 350);
    const { joinRoom } = useChatActions();
    const { currentRoom, setCurrentRoom, userName } = useChat();

    // Static rooms in the chat
    const rooms  = useMemo(() => [
        {
            id: 1,
            name: 'Asma Mecheri',
            email: 'Asma@gmail.com'
        },
        {
            id: 2,
            name: 'Hadia mecheri',
            email: 'Hadia@gmail.com'
        },
        
        {
            id: 3,
            name: 'Khawla',
            email: 'Khawla@gmail.com'
        },

    ], []);

    useEffect(() => {
        setUserRooms(rooms);
    }, [token]);

    const filteredRooms = useMemo(() => {
        const filter = userRooms.filter(room => {
            const includesCaseInsensitive  = {
                name: room.name.toLowerCase(),
                email: room.email.toLowerCase()
            };
    
            const { name, email } = includesCaseInsensitive;
    
            return name.includes(debouncedSearch.toLowerCase()) || email.includes(debouncedSearch.toLowerCase());
        });
    
        return filter;
    }, [debouncedSearch, userRooms]);
    
    const handleRoomClick = (roomID) => {
        if(currentRoom?.id === roomID) {
            return;
        }

        const selectedRoom = userRooms.find(room => room.id === roomID);
        setCurrentRoom(selectedRoom);

        joinRoom({ roomID, userName });

        setIsNavOpen(false);
    }
    
    return (
        <ChatAppContainer>

            <RoomListContainer open={ isNavOpen }>
                <h3>Rooms</h3>

                <SearchRoomsContainer>
                    <input type="text" placeholder='Search' value={ query } onChange={(e) => setQuery(e.target.value) } style={{color: "black"}}/>
                </SearchRoomsContainer>
                
                <ul>
                    {   
                        
                        filteredRooms.map(room => {
                            const { id, name, email} = room;

                            return (
                                <RoomItem active={(currentRoom?.id === id).toString()} key={id} onClick={() => handleRoomClick(id)}>
                                    <div>
                                        <span>{name}</span>
                                        <Description color='rgba(254,254,254,0.5)' size='0.7em'>{email}</Description>
                                    </div>
                                </RoomItem>
                            );
                        })
                    }
                </ul>
            </RoomListContainer>

            <CenterContainer>
                <Chat>
                    {
                        ! currentRoom ? 
                        
                        <WelcomeMessage>
                            Welcome to Homey Chat!<br/>
                            Discuss on equipment insights, troubleshooting, and expertise sharing.<br/>
                            Let's connect and enhance our knowledge together! 🛠️🔧
                        </WelcomeMessage>                        :
                        <>
                            <Header>
                                <div>
                                    <h2 style={{margin :"0px"}}>{ currentRoom.name }</h2>
                                    <Description color='#000' size='0.75em'>{ currentRoom.email }</Description>
                                </div>
                            </Header>
                            
                            <Conversation/>
            
                            <ChatForm />
                        </>

                    }
                </Chat>
            </CenterContainer>
        </ChatAppContainer>
    );
};

export default ChatContainer;