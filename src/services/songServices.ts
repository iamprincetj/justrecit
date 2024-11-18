import axios from "axios";
import { tokenUrl } from "../constants";
const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;

export const getToken = async () => {
  const data = new URLSearchParams();
  data.append("grant_type", "client_credentials");
  data.append("client_id", clientId!);
  data.append("client_secret", clientSecret!);
  const request = await axios.post(tokenUrl, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return request.data;
};

export const getGenre = async (seed_artist: string, token: string) => {
  const req = await axios.get(
    `https://api.spotify.com/v1/artists/${seed_artist}?type=track&access_token=${token}`
  );
  return req.data.genres[0];
};

export const getRec = async (
  seed_track: string,
  token: string,
  seedGenre: string,
  seed_artists: string
) => {
  const req = await axios.get(
    `https://api.spotify.com/v1/recommendations?type=track&seed_tracks=${seed_track}&seed_artists=${seed_artists}&seed_genres=${seedGenre}&access_token=${token}`
  );
  return req.data;
};

export const embedMusicSpotify = (musicId: string) => {
  const req = `https://open.spotify.com/embed/track/${musicId}`;
  return req;
};

// export const spotifyUrl =
//   "https://api.spotify.com/v1/search?access_token=${token}&query=${search_query}&type=track&limit=3";

// export const spotifyGenreUrl =
//   "https://api.spotify.com/v1/artists/${seed_artists}?type=track&access_token=${token}";

// export const spotifyRecUrl =
//   "https://api.spotify.com/v1/recommendations?type=track&seed_tracks=${seed_tracks}&seed_artists=${seed_artists}&seed_genres=${seed_genres}&access_token=${token}";
