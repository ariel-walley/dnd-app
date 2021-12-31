import React, { useState, useContext } from 'react';
import { PlayersContext, MessageContext, ClearCheckboxesContext } from '../../context';

import GalleryContainer from './messengerChildren/galleryContainer';
import TextInput from './messengerChildren/textInput';
import ClearButtons from './messengerChildren/clearButtons';
import PlayerCheckboxes from './messengerChildren/playerCheckboxes';

import { io } from 'socket.io-client';

export default function Messenger() {
  const { players } = useContext(PlayersContext);
  const [message, updateMessage] = useState({
    clear: [],
    background: '',
    filter: '',
    textInput: '',
    checkedPlayers: players.map(() => false) 
  });
  const [clearCheckboxes, toggleClearCheckboxes] = useState({
    clearText: false,
    clearAll: false
  });

  const sendMessage = (event) => {
  
    if (message.checkedPlayers.includes(true) && (message.background || message.filter || message.textInput !== '' || message.clear.length > 0)) {

      // Build content object to send
      let localContent = {};
      
      let keys = Object.keys(message);
      keys.pop();
      keys.forEach((contentType) => {
        if (!message.clear.includes(contentType) && message[contentType] !== '' && JSON.stringify(message[contentType]) !== JSON.stringify([]) ) {
          localContent[contentType] = message[contentType]
        }
      });

      // Convert from array of booleans to array of checked player numbers
      const playerNumbers = message.checkedPlayers.reduce((acc, el, i) => (el ? [...acc, i] : acc), []);

      // Send message
      const socket = io.connect('http://localhost:3100/');
      
      socket.emit("sendContent", {
        content: localContent,
        playerNumbers: playerNumbers,
        playerNames: playerNumbers.map((playerNum) => players[playerNum]),
        timestamp: new Date()
      }, () => {
        socket.disconnect();
      })
      event.preventDefault();
      
      // Reset text input and checkboxes after submission
      updateMessage({
        clear: [],
        background: '',
        filter: '',
        textInput: '',
        checkedPlayers: players.map(() => false)
    });
    } 
  }

  return(
    <MessageContext.Provider value={{message, updateMessage}}>
      <GalleryContainer/>
      <ClearCheckboxesContext.Provider value={{clearCheckboxes, toggleClearCheckboxes}}>
        <ClearButtons/>
        <TextInput/>
      </ClearCheckboxesContext.Provider> 
      <PlayerCheckboxes/>
      <input id="submit-button" onClick={sendMessage} type="button" value="Send" />
    </MessageContext.Provider>
  )
}