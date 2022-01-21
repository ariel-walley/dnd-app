import React, { useContext, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
// import { PlayersContext, MessageContext, ClearCheckboxesContext } from '../../context';
import ClearButtons from './clearButtons';
import Gallery from './gallery';
import GalleryContainer from './galleryContainer';
import History from './history';
import Notes from './notes';
import PlayerCheckboxes from './playerCheckboxes';
import SelectBar from './selectBar';
import TextInput from './textInput';

import './messengerStyles.css';


export default function Messenger(){
return (
    <>
        <Switch>
            <Route path='/gallery'>
                Gallery
                <Gallery />
            </Route>
            <Route path='/history'>
                History
                <History />
            </Route>
            <Route path='player-checkboxes'>
                Player Checkboxes
                <PlayerCheckboxes />
            </Route>
            <Route path='/select-bar'>
                Select Bar
                <SelectBar />
            </Route>
            <Route path='/text-input'>
                Text
                <TextInput />
            </Route>
            {/* <Route path=''></Route>
            <Route path=''></Route>
            <Route path=''></Route> */}
        </Switch>
    </>
    );
}
// import { io } from 'socket.io-client';

// export default function Messenger() {
//     const { players } = useContext(PlayersContext);
//     const [message, updateMessage] = useState({
//         clear: [],
//         background: '',
//         filter: '',
//         textInput: '',
//         checkedPlayers: players.map(() => false)
//     });
//     const [clearCheckboxes, toggleClearCheckboxes] = useState({
//         clearText: false,
//         clearAll: false
//     });

//     const sendMessage = (event) => {

//         if (message.checkedPlayers.includes(true) && (message.background || message.filter || message.textInput !== '' || message.clear.length > 0)) {

//             // Build content object to send
//             let localContent = {};

//             let keys = Object.keys(message);
//             keys.pop();
//             keys.forEach((contentType) => {
//                 if (!message.clear.includes(contentType) && message[contentType] !== '' && JSON.stringify(message[contentType]) !== JSON.stringify([])) {
//                     localContent[contentType] = message[contentType];
//                 }
//             });

//             // Convert from array of booleans to array of checked player numbers
//             const playerNumbers = message.checkedPlayers.reduce((acc, el, i) => (el ? [...acc, i] : acc), []);

//             // Send message
//             const socket = io.connect('http://localhost:3100/');

//             socket.emit("sendContent", {
//                 content: localContent,
//                 playerNumbers: playerNumbers,
//                 playerNames: playerNumbers.map((playerNum) => players[playerNum]),
//                 timestamp: new Date()
//             }, () => {
//                 socket.disconnect();
//             });
//             event.preventDefault();

//             // Reset text input and checkboxes after submission
//             updateMessage({
//                 clear: [],
//                 background: '',
//                 filter: '',
//                 textInput: '',
//                 checkedPlayers: players.map(() => false)
//             });
//             toggleClearCheckboxes({ clearAll: false, clearText: false });
//         }
//     };
// }
