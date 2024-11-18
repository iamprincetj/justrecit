import { useReducer } from "react";
import { NotificationAction, NotificationData, NotificationReducerData, SpotifyProviderProp } from "../../type";
import { NotificationContext, notificationIntialState, NotificationReducer } from "./contextNeeded";

const initializer = (initialValue: NotificationData) => {
    return initialValue;
}

export const NotificationContextProvider: React.FC<SpotifyProviderProp> = ({ children }) => {
    const [value, dispatch]: NotificationReducerData = useReducer<(state: NotificationData, action: NotificationAction) => NotificationData, NotificationData>(NotificationReducer, notificationIntialState, initializer);

    return (
        <NotificationContext.Provider value={{ state: value, dispatch }}>
            {children}
        </NotificationContext.Provider>
    )
}