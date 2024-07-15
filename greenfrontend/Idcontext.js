import React, { createContext, useState } from 'react';

export const IdContext = createContext();

export const IdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  return (
    <IdContext.Provider value={{ userId, setUserId }}>
      {children}
    </IdContext.Provider>
  );
};
