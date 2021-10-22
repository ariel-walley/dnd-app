import React from 'react';

const PlayersContext = React.createContext({
    players: {},
    setPlayers: () => {}
});

export default PlayersContext;

