import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import "./FavoritePage.css";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { FavoriteSong } from "../../type";
import Song from "../song-page/Song";
import { getFavoriteSong } from "../../utils/helperFunc";

const FavoritePage = () => {
  const [user] = useAuthState(auth) as [
    User | null,
    boolean,
    Error | undefined
  ];
  const [userFavorite, setUserFavorite] = useState<FavoriteSong>([]);

  useEffect(() => {
    const getFavorite = async () => {
      const favorite = await getFavoriteSong(user);
      setUserFavorite(favorite);
    };

    getFavorite();
  }, [user]);

  console.log(userFavorite);
  return (
    <div className='favorite-container'>
      <h1>My Favorite</h1>
      {userFavorite.length > 0 ? (
        <div className='favorite-content'>
          {userFavorite.map((song) => (
            <Song
              songName={song.songName}
              songId={song.songId}
              songImage={song.songImage}
              songInfo={song.songArtist}
            />
          ))}
        </div>
      ) : (
        <p>There is no favorite song</p>
      )}
    </div>
  );
};

export default FavoritePage;
