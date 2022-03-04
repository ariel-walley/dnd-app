import { createContext } from 'react';

export const MessageContext = createContext({
  message: {},
  updateMessage: () => {}
})

export const ClearCheckboxesContext = createContext({
  clearCheckboxes: {},
  toggleClearCheckboxes: () => {}
})

