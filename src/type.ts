import { Dispatch, ReactNode } from "react";
import { recdata } from "./data";

export interface FlipCardProp {
  artistName: string;
  artistImg: string;
  artistQuote: string;
}

export interface SongProp {
  songName: string;
  songImage: string;
  songInfo: string;
  songId: string;
}

export interface SpotifyImageList {
  url: string;
}

export type SpotifyImage = SpotifyImageList[];

export interface SpotifyArtist {
  id: string;
  name: string;
}

export interface SpotifyDataAlbum {
  artists: SpotifyArtist[];
  images: SpotifyImage;
}

export interface SpotifyData {
  album: SpotifyDataAlbum;
  artists: SpotifyArtist[];
  id: string;
  name: string;
}

export type Spotify = SpotifyData[];

export interface neededData {
  songName: string;
  songArtist: string;
  songImage: string;
  songId: string;
  userId: string;
}

export type FavoriteSong = neededData[];

export interface SpotifyDataList {
  tracks: typeof recdata;
}

export interface Action {
  type: string;
  payload: SpotifyDataList;
}

export interface CreateContextType {
  state: SpotifyDataList;
  dispatch: Dispatch<Action>;
}

export interface SpotifyProviderProp {
  children: ReactNode;
}

export type ReducerData = [SpotifyDataList, React.Dispatch<Action>];

// Notification

export interface NotificationData {
  notificationMessage: string;
}

export interface NotificationAction {
  type: string;
  payload: NotificationData;
}

export interface NotificationCreateContextType {
  state: NotificationData;
  dispatch: Dispatch<NotificationAction>;
}

export type NotificationReducerData = [NotificationData, React.Dispatch<NotificationAction>];
