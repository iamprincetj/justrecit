import { useParams } from "react-router-dom";
import "./DisplaySong.css";
import { lazy, useEffect, useState } from "react";
import { embedMusicSpotify } from "../../services/songServices";

const FavoriteIcon = lazy(() => import('@mui/icons-material/StarOutline'))
const StarIcon = lazy(() => import('@mui/icons-material/Star'))

import {
  useNotificationDispatch,
  useSpotifyValue,
} from "../../utils/contexts/contextNeeded";
import {
  addNotification,
  getFavoriteSong,
  nameSongArtist,
} from "../../utils/helperFunc";
import { collection, addDoc, deleteDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";
import { FavoriteSong } from "../../type";

const DisplaySong = () => {
  const [embedUrl, setEmbedUrl] = useState<string>("");
  const { songId } = useParams();
  const value = useSpotifyValue();
  const displayedSong = value.tracks.find((track) => track.id === songId);
  const [userFavorite, setUserFavorite] = useState<FavoriteSong>([]);
  const displayedSongName = displayedSong?.name;
  const displayedSongArtist = displayedSong?.artists
    ? displayedSong?.artists.length > 1
      ? nameSongArtist(displayedSong)
      : displayedSong?.artists[0].name
    : "";
  const displayedFaveSong = userFavorite.find((item) => item.songId === songId);
  const displayedSongImage = displayedSong?.album.images[1].url;
  const displayBgImage =
    displayedFaveSong && !displayedSong
      ? displayedFaveSong.songImage
      : displayedSong?.album.images[0].url;
  const [user] = useAuthState(auth) as [
    User | null,
    boolean,
    Error | undefined
  ];
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const notificationDispatch = useNotificationDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const removeFromFavorite = async () => {
      const favoriteSongRef = collection(db, "favoriteSongs");
      const querySnapshot = await getDocs(favoriteSongRef);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if ((data.songName === displayedSongName || data.songName === displayedFaveSong?.songName) && data.userId === user?.uid) {
          setIsFavorite(true);
        }
      });
    };
    if (user) removeFromFavorite();
  }, [displayedSongName, displayedFaveSong?.songName, user]);

  useEffect(() => {
    const getFavorite = async () => {
      const favorite = await getFavoriteSong(user);
      setUserFavorite(favorite);
    };

    getFavorite();
  }, [user]);

  const addToFavorite = async () => {
    if (user) {
      const favoriteSongRef = collection(db, "favoriteSongs");
      const favoriteSong = {
        songName: displayedSongName,
        songArtist: displayedSongArtist,
        songImage: displayedSongImage,
        userId: user.uid,
        songId,
      };
      await addDoc(favoriteSongRef, favoriteSong);
      addNotification("Added to Favorite!", notificationDispatch);
      setTimeout(() => addNotification("", notificationDispatch), 3000);
      setIsFavorite((prev) => !prev);
    } else {
      addNotification(
        "Please sign in to add to favorite",
        notificationDispatch
      );
      setTimeout(() => addNotification("", notificationDispatch), 3000);
    }
  };

  const removeFromFavorite = async () => {
    const favoriteSongRef = collection(db, "favoriteSongs");
    const querySnapshot = await getDocs(favoriteSongRef);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.songName === displayedSongName && data.userId === user?.uid) {
        deleteDoc(doc.ref);
        addNotification("Removed from Favorite!", notificationDispatch);
        setTimeout(() => addNotification("", notificationDispatch), 3000);
        setIsFavorite((prev) => !prev);
      }
    });
  };

  useEffect(() => {
    setEmbedUrl(embedMusicSpotify(songId!));
  }, [songId]);
  return (
    <div
      className='iframe-container'
      style={{ backgroundImage: `url(${displayBgImage})` }}
    >
      <button
        type='button'
        className='add-favorite'
        style={{ display: loading ? "none" : "" }}
        onClick={!isFavorite ? addToFavorite : removeFromFavorite}
      >
        {!isFavorite ? (
          <>
            <FavoriteIcon className='fave-icon icon' /> Add to Favorite
          </>
        ) : (
          <>
            <StarIcon className='remove-icon icon' /> Remove from Favorite
          </>
        )}
      </button>
      <div className='iframe-content'>
        {loading && (
          <div className='loading-state'>
            <h1>justrecit . . .</h1>
          </div>
        )}
        <iframe
          title='Embedded Spotify Song'
          src={embedUrl}
          width='300'
          height='355'
          onLoad={() => setLoading(false)}
          style={{ display: loading ? "none" : "" }}
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          allowTransparency
          id='iframe'
        ></iframe>
      </div>
    </div>
  );
};

export default DisplaySong;
