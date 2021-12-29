import React, { useState, useContext } from 'react';
import { PlayersContext, MessageContext } from '../../context';

import GalleryContainer from './messengerChildren/galleryContainer';
import TextInput from './messengerChildren/textInput';
import PlayerCheckboxes from './messengerChildren/playerCheckboxes';

import { io } from 'socket.io-client';

export default function Messenger() {
  const { players } = useContext(PlayersContext);
  const [message, updateMessage] = useState({
    background: '',
    filter: '',
    textInput: '',
    checkedPlayers: players.map(() => false)
  });

  const sendMessage = (event) => {
  
    if (message.checkedPlayers.includes(true) && (message.background || message.filter || message.textInput !== '')) {

      // Build content object to send
      let localContent = {};
      
      let keys = Object.keys(message);
      keys.pop();
      keys.forEach((contentType) => {
        if (message[contentType] === 'clear') {
          localContent.clear === undefined ? localContent.clear = [contentType] : localContent.clear.push(contentType)
        }
      
        if (message[contentType] !== '' && message[contentType] !== 'clear') {
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
      <TextInput/>
      <PlayerCheckboxes/>
      <input id="submit-button" onClick={sendMessage} type="button" value="Send" />
    </MessageContext.Provider>
  )
}