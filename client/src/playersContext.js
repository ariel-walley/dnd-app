import { createContext } from 'react';

export const PlayersContext = createContext({
  players: [],
  setPlayers: () => {}
});