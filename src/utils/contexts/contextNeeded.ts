import { createContext, useContext } from "react";
import { Action, CreateContextType, SpotifyDataList, NotificationAction, NotificationCreateContextType, NotificationData } from "../../type";

// Spotify Data

const storedData = sessionStorage.getItem("spotifyData");

export const emptyState: SpotifyDataList = {
    tracks: []
}

export const initialState = storedData ? JSON.parse(storedData) : emptyState;

export const SpotifyContext = createContext<CreateContextType>({
    state: initialState,
    dispatch: () => null
});

export const spotifyReducer = (state: SpotifyDataList, action: Action) => {
    switch (action.type) {
        case 'ADD_DATA':
            return action.payload;
        default:
            return state;
    }
}

export const useSpotifyValue = () => {
    const contextValue = useContext(SpotifyContext);
    return contextValue.state;
}

export const useSpotifyDispatch = () => {
    const contextValue = useContext(SpotifyContext);
    return contextValue.dispatch;
}

// Notification Data

export const notificationIntialState: NotificationData = {
    notificationMessage: ""
}

export const NotificationContext = createContext<NotificationCreateContextType>({
    state: notificationIntialState,
    dispatch: () => null
});

export const NotificationReducer = (state: NotificationData, action: NotificationAction) => {
    switch (action.type) {
        case 'ADD_DATA':
            return action.payload;
        default:
            return state;
    }
}

export const useNotificationValue = () => {
    const contextValue = useContext(NotificationContext);
    return contextValue.state;
}

export const useNotificationDispatch = () => {
    const contextValue = useContext(NotificationContext);
    return contextValue.dispatch;
}