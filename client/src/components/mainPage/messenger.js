import React, { useState, useContext } from 'react';
import { PlayersContext, MessageContext } from '../../context';

import GalleryContainer from './messengerChildren/galleryContainer';
import TextInput from './messengerChildren/textInput';
import PlayerCheckboxes from './messengerChildren/playerCheckboxes';

import { io } from 'socket.io-client';

export default function Messenger() {
  const { players } = useContext(PlayersContext);
  const [message, updateMessage] = useState({
    background: null,
    filter: null,
    textInput: '',
    checkedPlayers: Object.keys(players).map(() => false)
  });

  const sendMessage = (event) => {
    const playerNumbers = message.checkedPlayers.reduce((acc, el, i) => (el ? [...acc, i + 1] : acc), []);

    if (playerNumbers.length > 0) {
      let localContent = {};
      if (message.background) { localContent.background = message.background }
      if (message.filter) { localContent.filter = message.filter }
      if (message.textInput !== '') { localContent.message = message.textInput }
  
      const socket = io.connect('http://localhost:3100/');
      
      socket.emit("displayBasicText", JSON.stringify({
        content: localContent,
        playerNumbers: playerNumbers,
        playerNames: playerNumbers.map((player) => players['Player' + player]),
        timestamp: new Date()
      }), () => {
        socket.disconnect();
      })
      event.preventDefault();
      
      // Reset text input and checkboxes after submission
      updateMessage({
        background: null,
        filter: null,
        textInput: '',
        checkedPlayers: Object.keys(players).map(() => false)
    });
    } 
  }

  return(
    <MessageContext.Provider value={{message, updateMessage}}>
      <GalleryContainer/>
      <TextInput/>
      <PlayerCheckboxes/>
      <input id="submit-button" onClick={sendMessage} type="button" value="Send" />
    </MessageContext.Provider>
  )
}