import { useReducer } from "react";
import { Action, ReducerData, SpotifyDataList, SpotifyProviderProp } from "../../type";
import { initialState, SpotifyContext, spotifyReducer } from "./contextNeeded";

const initializer = (initialValue: SpotifyDataList) => {
    return initialValue;
}

export const SpotifyContextProvider: React.FC<SpotifyProviderProp> = ({ children }) => {
    const [value, dispatch]: ReducerData = useReducer<(state: SpotifyDataList, action: Action) => SpotifyDataList, SpotifyDataList>(spotifyReducer, initialState, initializer);

    return (
        <SpotifyContext.Provider value={{ state: value, dispatch }}>
            {children}
        </SpotifyContext.Provider>
    )
}