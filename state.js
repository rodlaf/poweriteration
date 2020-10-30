import React, {createContext, useContext, useState } from 'react';

export const StateContext = createContext();

const storage = window.localStorage;

const initialState = {
    mats: storage.getItem('mats') === null ? {A: [[NaN, NaN], [NaN, NaN]], B: [[NaN, NaN], [NaN, NaN]]} : JSON.parse(storage.getItem('mats')),
    display: [],
};

export const StateProvider = ({children}) => {
	return (
		<StateContext.Provider value={useState(initialState)}>
	    	{children}
		</StateContext.Provider>
	)
};

export const useStateValue = () => useContext(StateContext);