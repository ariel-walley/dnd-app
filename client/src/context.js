import React from 'react';

export const PlayersContext = React.createContext({
    players: [],
    setPlayers: () => {}
});

export const MessageContext = React.createContext({
  message: {},
  updateMessage: () => {}
})

export const ClearCheckboxesContext = React.createContext({
  clearCheckboxes: {},
  toggleClearCheckboxes: () => {}
})

