import { useNavigate } from "react-router-dom";
import { SongProp } from "../../type";
import "./css/Song.css";
import { useEffect, useState } from "react";

const Song = ({ songName, songImage, songInfo, songId }: SongProp) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = songImage;
    img.onload = () => {
      setLoading(false);
    };
  }, [songImage]);

  const handleSongClick = () => {
    navigate(`/song/${songId}`);
  };
  return (
    <div
      className='song'
      onClick={handleSongClick}
      style={{ display: loading ? "none" : "" }}
    >
      <div className='song-content'>
        <div
          className='song-img-container'
          style={{ backgroundImage: `url(${songImage})` }}
        >
          <div className='navigate-container'>
            <button type='button' className='spotify'>
              Spotify
            </button>
            <button type='button' className='youtube'>
              Youtube
            </button>
            <button type='button' className='favorite'>
              favorite
            </button>
          </div>
        </div>
        <div className='song-info'>
          <h3>{songName}</h3>
          <p>{songInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default Song;
