import React, { createContext, useState } from 'react';

export const BeatsContext = createContext();

export const BeatsProvider = ({ children }) => {
    const [newBeat, setNewBeat] = useState(false);
    return (
        <BeatsContext.Provider value={{ newBeat, setNewBeat }}>
            {children}
        </BeatsContext.Provider>
    );
};
